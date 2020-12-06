import { container } from 'tsyringe';

import HashProviderInterface from '@modules/users/providers/HashProviders/models/HashProviderInterface';
import BCryptHashProvider from '@modules/users/providers/HashProviders/implementations/BCryptHashProvider';

container.registerSingleton<HashProviderInterface>(
  'HashProvider',
  BCryptHashProvider,
);
