import Aes from 'react-native-aes-crypto';
export async function pbkdf2(password, salt, cost, length, algorithm) {
  return Aes.pbkdf2(password, salt, cost, length, algorithm);
}
export async function randomKey() {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  return Aes.randomKey(length);
}
export async function encryptData(text, key) {
  const iv = await randomKey(16);
  const cipher = await Aes.encrypt(text, key, iv, 'aes-256-cbc');
  return {
    cipher,
    iv
  };
}
export async function decryptData(encryptedData, key) {
  return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');
}
//# sourceMappingURL=crypto-utils.js.map