import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all appointments from a provider', async () => {
    const currentYear = new Date().getFullYear();

    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: 'any-provider',
      user_id: 'first-user',
      date: new Date(currentYear, 4, 10, 10),
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: 'any-provider',
      user_id: 'second-user',
      date: new Date(currentYear, 4, 10, 11),
    });

    const appointmentThree = await fakeAppointmentsRepository.create({
      provider_id: 'any-provider',
      user_id: 'third-user',
      date: new Date(currentYear, 4, 10, 12),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'any-provider',
      year: currentYear,
      day: 10,
      month: 5,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([
        appointmentOne,
        appointmentTwo,
        appointmentThree,
      ]),
    );
  });
});
