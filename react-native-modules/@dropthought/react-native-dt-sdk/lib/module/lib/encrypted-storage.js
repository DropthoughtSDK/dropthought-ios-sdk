import { EncryptedStorage } from '@bct-taipei/dt-rn-encrypted-storage';
const SDK_ACCOUNT = 'DT_ENC_V1';
let encryptedStorageClient = new EncryptedStorage();
export async function initialize(apiKey, AsyncStorage) {
  encryptedStorageClient = new EncryptedStorage(AsyncStorage);
  return encryptedStorageClient.setAccount(SDK_ACCOUNT, apiKey);
}
export default encryptedStorageClient;
//# sourceMappingURL=encrypted-storage.js.map