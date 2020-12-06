import StorageProvider from '@shared/container/providers/StorageProviders/models/StorageProvidersInterface';

class FakeDiskStorageProvider implements StorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    if (findIndex) {
      this.storage.splice(findIndex, 1);
    }
  }
}

export default FakeDiskStorageProvider;
