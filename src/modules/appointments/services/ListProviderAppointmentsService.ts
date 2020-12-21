import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';
import Appointment from '../infra/typeorm/entities/Appointment';

import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

interface Request {
  provider_id: string;
  month: number;
  day: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: AppointmentsRepositoryInterface,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface,
  ) {}

  public async execute({
    provider_id,
    month,
    day,
    year,
  }: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id,
        month,
        day,
        year,
      });

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
