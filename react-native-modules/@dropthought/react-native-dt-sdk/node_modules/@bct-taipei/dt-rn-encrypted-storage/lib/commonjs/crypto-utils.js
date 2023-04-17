"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pbkdf2 = pbkdf2;
exports.randomKey = randomKey;
exports.encryptData = encryptData;
exports.decryptData = decryptData;

var _reactNative = require("react-native");

var Aes = _reactNative.NativeModules.Aes;

async function pbkdf2(password, salt, iteration, length) {
  return Aes.pbkdf2(password, salt, iteration, length);
}

async function randomKey(length = 16) {
  return Aes.randomKey(length);
}

async function encryptData(text, key) {
  const iv = await randomKey(16);
  const cipher = await Aes.encrypt(text, key, iv);
  return {
    cipher,
    iv
  };
}

async function decryptData(encryptedData, key) {
  return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
}
//# sourceMappingURL=crypto-utils.js.map