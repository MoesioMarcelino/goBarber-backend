import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '../services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the available hours to provider', async () => {
    const currentYear = new Date().getFullYear();

    await fakeAppointmentsRepository.create({
      provider_id: 'any-user',
      user_id: '123123',
      date: new Date(currentYear, 9, 5, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'any-user',
      user_id: '123123',
      date: new Date(currentYear, 9, 5, 16, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(currentYear, 9, 5, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'any-user',
      year: currentYear,
      month: 10,
      day: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
      ]),
    );
  });
});
