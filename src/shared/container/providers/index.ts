import { container } from 'tsyringe';

import '@modules/users/providers';

import AppointmentsRepositoryInterface from '@modules/appointments/repositories/AppointmentsRepositoryInterface';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import StorageProviderInterface from '@shared/container/providers/StorageProviders/models/StorageProvidersInterface';
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

// import UserTokensInterface from '@modules/users/repositories/UserTokenRepositoryInterface';
// import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

container.registerSingleton<AppointmentsRepositoryInterface>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider,
);
