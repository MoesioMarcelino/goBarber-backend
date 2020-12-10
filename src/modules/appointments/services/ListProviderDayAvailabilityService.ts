import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import FindAllInDayFromProviderDTO from '../dtos/FindAllInDayFromProviderDTO';
import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

type Response = Array<{
  available: boolean;
  hour: number;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepositoryInterface,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: FindAllInDayFromProviderDTO): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availabitily = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availabitily;
  }
}

export default ListProviderDayAvailabilityService;
