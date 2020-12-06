import { container } from 'tsyringe';

import StorageProviderInterface from '@shared/container/providers/StorageProviders/models/StorageProvidersInterface';
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider,
);
