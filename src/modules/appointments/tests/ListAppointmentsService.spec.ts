import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListAppointmentsService from '../services/ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointments: ListAppointmentsService;

describe('ListAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listAppointments = new ListAppointmentsService(fakeAppointmentsRepository);
  });

  it('should be able to list all appointments', async () => {
    const currentYear = new Date().getFullYear();

    await fakeAppointmentsRepository.create({
      provider_id: 'any-provider',
      user_id: 'first-user',
      date: new Date(currentYear, 5, 10, 10),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any-provider',
      user_id: 'second-user',
      date: new Date(currentYear, 5, 10, 11),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any-provider',
      user_id: 'third-user',
      date: new Date(currentYear, 5, 10, 12),
    });

    const appointments = await listAppointments.execute({
      provider_id: 'any-provider',
    });

    const appointmentFormatted: Array<{
      provider_id: string;
      user_id: string;
      date: Date;
    }> = appointments.map(appointment => {
      return {
        provider_id: appointment.provider_id,
        user_id: appointment.user_id,
        date: appointment.date,
      };
    });

    expect(appointmentFormatted).toHaveLength(3);
    expect(appointmentFormatted).toEqual(
      expect.arrayContaining([
        {
          provider_id: 'any-provider',
          user_id: 'first-user',
          date: new Date(currentYear, 5, 10, 10),
        },
        {
          provider_id: 'any-provider',
          user_id: 'second-user',
          date: new Date(currentYear, 5, 10, 11),
        },
        {
          provider_id: 'any-provider',
          user_id: 'third-user',
          date: new Date(currentYear, 5, 10, 12),
        },
      ]),
    );
  });
});
