"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.default = void 0;

var _dtRnEncryptedStorage = require("@bct-taipei/dt-rn-encrypted-storage");

const SDK_ACCOUNT = 'DT_ENC_V1';
let encryptedStorageClient = new _dtRnEncryptedStorage.EncryptedStorage();

async function initialize(apiKey, AsyncStorage) {
  encryptedStorageClient = new _dtRnEncryptedStorage.EncryptedStorage(AsyncStorage);
  return encryptedStorageClient.setAccount(SDK_ACCOUNT, apiKey);
}

var _default = encryptedStorageClient;
exports.default = _default;
//# sourceMappingURL=encrypted-storage.js.map