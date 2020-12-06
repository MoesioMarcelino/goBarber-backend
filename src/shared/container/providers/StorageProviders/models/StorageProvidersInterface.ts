export default interface StorageProvidersInterface {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
