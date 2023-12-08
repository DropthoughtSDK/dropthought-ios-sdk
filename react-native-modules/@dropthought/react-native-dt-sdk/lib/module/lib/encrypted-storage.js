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
    var _encryptedStorageClie;
    return (_encryptedStorageClie = encryptedStorageClient) === null || _encryptedStorageClie === void 0 ? void 0 : _encryptedStorageClie.removeItem(key);
  },
  /** @param {string} key */
  getItem(key) {
    var _encryptedStorageClie2;
    return (_encryptedStorageClie2 = encryptedStorageClient) === null || _encryptedStorageClie2 === void 0 ? void 0 : _encryptedStorageClie2.getItem(key);
  },
  /**
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    var _encryptedStorageClie3;
    return (_encryptedStorageClie3 = encryptedStorageClient) === null || _encryptedStorageClie3 === void 0 ? void 0 : _encryptedStorageClie3.setItem(key, value);
  },
  /**
   * @template T
   * @param {string} key
   * @param {T} value
   */
  setItemT(key, value) {
    var _encryptedStorageClie4;
    return (_encryptedStorageClie4 = encryptedStorageClient) === null || _encryptedStorageClie4 === void 0 ? void 0 : _encryptedStorageClie4.setItemT(key, value);
  },
  /**
   * @template T
   * @param {string} key
   * @param {T=} defaultValue
   */
  getItemT(key, defaultValue) {
    var _encryptedStorageClie5;
    return (_encryptedStorageClie5 = encryptedStorageClient) === null || _encryptedStorageClie5 === void 0 ? void 0 : _encryptedStorageClie5.getItemT(key, defaultValue);
  }
};
export default EncryptStorage;
//# sourceMappingURL=encrypted-storage.js.map