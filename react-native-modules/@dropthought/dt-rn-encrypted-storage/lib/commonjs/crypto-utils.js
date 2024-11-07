"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptData = decryptData;
exports.encryptData = encryptData;
exports.pbkdf2 = pbkdf2;
exports.randomKey = randomKey;
var _reactNativeAesCrypto = _interopRequireDefault(require("react-native-aes-crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function pbkdf2(password, salt, cost, length, algorithm) {
  return _reactNativeAesCrypto.default.pbkdf2(password, salt, cost, length, algorithm);
}
async function randomKey() {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  return _reactNativeAesCrypto.default.randomKey(length);
}
async function encryptData(text, key) {
  const iv = await randomKey(16);
  const cipher = await _reactNativeAesCrypto.default.encrypt(text, key, iv, 'aes-256-cbc');
  return {
    cipher,
    iv
  };
}
async function decryptData(encryptedData, key) {
  return _reactNativeAesCrypto.default.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');
}
//# sourceMappingURL=crypto-utils.js.map