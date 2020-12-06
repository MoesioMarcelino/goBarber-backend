import { container } from 'tsyringe';

import '@modules/users/providers';

import AppointmentsRepositoryInterface from '@modules/appointments/repositories/AppointmentsRepositoryInterface';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import StorageProviderInterface from '@shared/container/providers/StorageProviders/models/StorageProvidersInterface';
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

import UserTokensRepositoryInterface from '@modules/users/repositories/UserTokensRepositoryInterface';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import MailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

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

container.registerSingleton<UserTokensRepositoryInterface>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  new EtherealMailProvider(),
);
