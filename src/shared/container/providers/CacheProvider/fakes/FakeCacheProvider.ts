import CacheProviderInterface from '../models/CacheProviderInterface';

interface CacheData {
  [key: string]: string;
}

export default class RedisCacheProvider implements CacheProviderInterface {
  private cache: CacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<Type>(key: string): Promise<Type | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as Type;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
