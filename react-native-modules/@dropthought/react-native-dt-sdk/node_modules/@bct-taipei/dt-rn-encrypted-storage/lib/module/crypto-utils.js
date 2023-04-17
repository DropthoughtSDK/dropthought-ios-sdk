import { NativeModules } from 'react-native';
var Aes = NativeModules.Aes;
export async function pbkdf2(password, salt, iteration, length) {
  return Aes.pbkdf2(password, salt, iteration, length);
}
export async function randomKey(length = 16) {
  return Aes.randomKey(length);
}
export async function encryptData(text, key) {
  const iv = await randomKey(16);
  const cipher = await Aes.encrypt(text, key, iv);
  return {
    cipher,
    iv
  };
}
export async function decryptData(encryptedData, key) {
  return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
}
//# sourceMappingURL=crypto-utils.js.map