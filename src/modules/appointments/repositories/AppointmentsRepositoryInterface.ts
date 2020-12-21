import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';
import FindAllInMonthFromProviderDTO from '../dtos/FindAllInMonthFromProviderDTO';
import FindAllInDayFromProviderDTO from '../dtos/FindAllInDayFromProviderDTO';
import ListAppoinemtnsDTO from '../dtos/ListAppointmentsDTO';

export default interface AppointmentsRepositoryInterface {
  findAppointments(data: ListAppoinemtnsDTO): Promise<Appointment[]>;
  findAllInMonthFromProvider(
    data: FindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: FindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
}
