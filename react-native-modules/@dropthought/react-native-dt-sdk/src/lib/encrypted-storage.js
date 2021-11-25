import { EncryptedStorage } from '@bct-taipei/dt-rn-encrypted-storage';

const SDK_ACCOUNT = 'DT_ENC_V1';
let encryptedStorageClient;

export async function initialize(apiKey, AsyncStorage) {
  if (!encryptedStorageClient) {
    encryptedStorageClient = new EncryptedStorage(AsyncStorage);
  }
  return encryptedStorageClient.setAccount(SDK_ACCOUNT, apiKey);
}

const EncryptStorage = {
  /** @param {string} key */
  removeItem(key) {
    return encryptedStorageClient?.removeItem(key);
  },

  /** @param {string} key */
  getItem(key) {
    return encryptedStorageClient?.getItem(key);
  },

  /**
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    return encryptedStorageClient?.setItem(key, value);
  },

  /**
   * @template T
   * @param {string} key
   * @param {T} value
   */
  setItemT(key, value) {
    return encryptedStorageClient?.setItemT(key, value);
  },

  /**
   * @template T
   * @param {string} key
   * @param {T=} defaultValue
   */
  getItemT(key, defaultValue) {
    return encryptedStorageClient?.getItemT(key, defaultValue);
  },
};

export default EncryptStorage;
