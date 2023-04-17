"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncryptedStorage = void 0;

var _cryptoUtils = require("./crypto-utils");

var SecureKeyStore = _interopRequireWildcard(require("./secure-keystore"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ACCOUNT_KEY_PREFIX = '@rn-encrypted-storage:key';

const ACCOUNT_KEY = account => `${ACCOUNT_KEY_PREFIX}:${account}`;

class EncryptedStorage {
  constructor(storage) {
    _defineProperty(this, "account", void 0);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "storage", void 0);

    this.account = '';
    this.key = '';
    this.storage = storage;
  }

  dataKey(key) {
    return `${ACCOUNT_KEY(this.account)}/${key}`;
  }

  async setAccount(account, passphrase) {
    this.account = account; // get key from store

    let key;

    try {
      key = await SecureKeyStore.get(ACCOUNT_KEY(account));
    } catch (err) {
      // ignore this error
      key = undefined;
    }

    if (!key) {
      const salt = await (0, _cryptoUtils.randomKey)(32);
      key = await (0, _cryptoUtils.pbkdf2)(passphrase, salt, 5000, 256); // store key

      await SecureKeyStore.set(ACCOUNT_KEY(account), key);
    }

    this.key = key;
    return key;
  }

  async setItem(key, value) {
    var _this$storage;

    // encrypt data
    const encryptedData = await (0, _cryptoUtils.encryptData)(value, this.key); // save data to storage

    await ((_this$storage = this.storage) === null || _this$storage === void 0 ? void 0 : _this$storage.setItem(this.dataKey(key), JSON.stringify(encryptedData)));
  }

  async setItemT(key, value) {
    return this.setItem(key, JSON.stringify(value));
  }

  async getItem(key) {
    try {
      var _this$storage2;

      const encryptedDataStr = await ((_this$storage2 = this.storage) === null || _this$storage2 === void 0 ? void 0 : _this$storage2.getItem(this.dataKey(key)));
      if (!encryptedDataStr) return null;
      const encryptedData = JSON.parse(encryptedDataStr);
      const cypher = await (0, _cryptoUtils.decryptData)(encryptedData, this.key);
      return cypher;
    } catch (err) {
      return null;
    }
  }

  async getItemT(key, defaultValue) {
    const itemStr = await this.getItem(key);
    if (!itemStr) return defaultValue !== null && defaultValue !== void 0 ? defaultValue : null;
    return JSON.parse(itemStr);
  }

  async removeItem(key) {
    try {
      var _this$storage3;

      await ((_this$storage3 = this.storage) === null || _this$storage3 === void 0 ? void 0 : _this$storage3.removeItem(this.dataKey(key)));
    } catch (err) {}

    return;
  }

}

exports.EncryptedStorage = EncryptedStorage;
//# sourceMappingURL=EncryptedStorage.js.map