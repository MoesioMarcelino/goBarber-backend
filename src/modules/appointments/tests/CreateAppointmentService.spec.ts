import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(new Date().getFullYear(), 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(new Date().getFullYear(), 4, 10, 12),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointments in the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(new Date().getFullYear(), 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(new Date().getFullYear(), 4, 10, 12);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(new Date().getFullYear(), 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(new Date().getFullYear() - 1, 4, 10, 10),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with user as provider', async () => {
    // jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    //   return new Date(new Date().getFullYear(), 4, 10, 12).getTime();
    // });

    const date = new Date();

    await expect(
      createAppointment.execute({
        date: new Date(date.getFullYear(), date.getMonth() + 1, 10, 10),
        user_id: 'provider-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should just be able to create an appointment from 8 a.m. to 5 p.m.', async () => {
    const date = new Date();

    await expect(
      createAppointment.execute({
        date: new Date(date.getFullYear(), date.getMonth() + 1, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(date.getFullYear(), date.getMonth() + 1, 11, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register an appointment in an invalid hour', async () => {
    await expect(
      createAppointment.execute({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(new Date().getFullYear(), 4, 11, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should only be able to register an appointment if an hour is available', async () => {
    const date = new Date();
    await createAppointment.execute({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(date.getFullYear(), date.getMonth() + 1, 10, 10),
    });

    expect(
      createAppointment.execute({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(new Date().getFullYear(), date.getMonth() + 1, 10, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
