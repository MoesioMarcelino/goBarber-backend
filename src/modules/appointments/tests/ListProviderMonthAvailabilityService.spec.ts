import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '../services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the providers without user logged', async () => {
    const date = new Date();
    // eslint-disable-next-line no-plusplus
    for (let i = 8; i <= 17; i++) {
      fakeAppointmentsRepository.create({
        provider_id: 'any-user',
        user_id: '123123',
        date: new Date(date.getFullYear(), 11, 5, i, 0, 0),
      });
    }

    await fakeAppointmentsRepository.create({
      provider_id: 'any-user',
      user_id: '123123',
      date: new Date(date.getFullYear(), 11, 12, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'any-user',
      year: date.getFullYear(),
      month: 12,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 12, available: true },
        { day: 5, available: false },
      ]),
    );
  });
});
