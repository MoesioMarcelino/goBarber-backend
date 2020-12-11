import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

interface Request {
  provider_id: string;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  day: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: AppointmentsRepositoryInterface,
  ) {}

  public async execute({
    provider_id,
    month,
    day,
    year,
  }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        day,
        year,
      },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
