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

import MailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProviderInterface';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

import NotificationsRepositoryInterface from '@modules/notifications/repositories/NotificationsRepositoryInterface';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import CacheProviderInterface from './CacheProvider/models/CacheProviderInterface';
import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<AppointmentsRepositoryInterface>(
  'AppointmentsRepository',
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

container.registerSingleton<MailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);

container.registerSingleton<NotificationsRepositoryInterface>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<CacheProviderInterface>(
  'CacheProvider',
  RedisCacheProvider,
);
