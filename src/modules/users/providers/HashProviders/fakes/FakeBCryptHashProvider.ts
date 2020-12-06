import HashProviderInterface from '@modules/users/providers/HashProviders/models/HashProviderInterface';

class FakeBCryptHashProvider implements HashProviderInterface {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeBCryptHashProvider;
