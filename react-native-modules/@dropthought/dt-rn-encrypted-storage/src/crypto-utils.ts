import Aes from 'react-native-aes-crypto'

export async function pbkdf2(
  password: string,
  salt: string,
  cost: number,
  length: number,
  algorithm: Aes.Algorithms_pbkdf2
): Promise<string> {
  return Aes.pbkdf2(password, salt, cost, length, algorithm)
}

export async function randomKey(length: number = 16): Promise<string> {
  return Aes.randomKey(length)
}

export interface EncryptedData {
  cipher: string
  iv: string
}

export async function encryptData(
  text: string,
  key: string
): Promise<EncryptedData> {
  const iv = await randomKey(16)
  const cipher = await Aes.encrypt(text, key, iv, 'aes-256-cbc')
  return {
    cipher,
    iv,
  }
}

export async function decryptData(
  encryptedData: EncryptedData,
  key: string
): Promise<string> {
  return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc')
}
