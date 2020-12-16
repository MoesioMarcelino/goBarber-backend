import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import CacheProviderInterface from '../models/CacheProviderInterface';

export default class RedisCacheProvider implements CacheProviderInterface {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<Type>(key: string): Promise<Type | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as Type;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
