import {NativeModules} from 'react-native'
var Aes = NativeModules.Aes

export async function pbkdf2(
  password: string,
  salt: string,
  iteration: number,
  length: number
): Promise<string> {
  return Aes.pbkdf2(password, salt, iteration, length)
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
  const cipher = await Aes.encrypt(text, key, iv)
  return {
    cipher,
    iv,
  }
}

export async function decryptData(
  encryptedData: EncryptedData,
  key: string
): Promise<string> {
  return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)
}
