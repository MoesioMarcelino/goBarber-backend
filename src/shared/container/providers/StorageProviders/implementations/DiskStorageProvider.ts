import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import StorageProvider from '@shared/container/providers/StorageProviders/models/StorageProvidersInterface';

class DiskStorageProvider implements StorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
