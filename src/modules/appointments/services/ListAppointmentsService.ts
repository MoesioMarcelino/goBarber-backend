import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

interface Request {
  provider_id: string;
}

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: AppointmentsRepositoryInterface,
  ) {}

  public async execute({ provider_id }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAppointments(
      provider_id,
    );

    return appointments;
  }
}

export default ListAppointmentsService;
