import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import NotificationsRepositoryInterface from '@modules/notifications/repositories/NotificationsRepositoryInterface';
import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepositoryInterface,

    @inject('NotificationsRepository')
    private notificationsRepository: NotificationsRepositoryInterface,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(`You can't create an appointment with past date`);
    }

    if (user_id === provider_id) {
      throw new AppError(`You can't create an appointment with yourself`);
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        `You can only create appointments to 8 a.m. to 5 p.m.`,
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This hour is unvailable');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para ${dateFormatted}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
