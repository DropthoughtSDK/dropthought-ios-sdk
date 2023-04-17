import {
  randomKey,
  pbkdf2,
  encryptData,
  decryptData,
  EncryptedData,
} from './crypto-utils'
import * as SecureKeyStore from './secure-keystore'

const ACCOUNT_KEY_PREFIX = '@rn-encrypted-storage:key'
const ACCOUNT_KEY = (account: string) => `${ACCOUNT_KEY_PREFIX}:${account}`

export class EncryptedStorage implements StorageInterface {
  private account: string
  private key: string
  private storage: StorageInterface | null

  constructor(storage: StorageInterface) {
    this.account = ''
    this.key = ''
    this.storage = storage
  }

  private dataKey(key: string) {
    return `${ACCOUNT_KEY(this.account)}/${key}`
  }

  async setAccount(account: string, passphrase: string): Promise<string> {
    this.account = account

    // get key from store
    let key
    try {
      key = await SecureKeyStore.get(ACCOUNT_KEY(account))
    } catch (err) {
      // ignore this error
      key = undefined
    }

    if (!key) {
      const salt = await randomKey(32)
      key = await pbkdf2(passphrase, salt, 5000, 256)
      // store key
      await SecureKeyStore.set(ACCOUNT_KEY(account), key)
    }
    this.key = key
    return key
  }

  async setItem(key: string, value: string): Promise<void> {
    // encrypt data
    const encryptedData = await encryptData(value, this.key)

    // save data to storage
    await this.storage?.setItem(
      this.dataKey(key),
      JSON.stringify(encryptedData)
    )
  }

  async setItemT<T>(key: string, value: T): Promise<void> {
    return this.setItem(key, JSON.stringify(value))
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const encryptedDataStr = await this.storage?.getItem(this.dataKey(key))
      if (!encryptedDataStr) return null

      const encryptedData: EncryptedData = JSON.parse(encryptedDataStr)
      const cypher = await decryptData(encryptedData, this.key)
      return cypher
    } catch (err) {
      return null
    }
  }

  async getItemT<T>(key: string, defaultValue?: T): Promise<T | null> {
    const itemStr = await this.getItem(key)
    if (!itemStr) return defaultValue ?? null
    return JSON.parse(itemStr) as T
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage?.removeItem(this.dataKey(key))
    } catch (err) {}
    return
  }
}

export interface StorageInterface {
  setItem(
    key: string,
    value: string,
    callback?: (error?: Error) => void
  ): Promise<void>

  getItem(
    key: string,
    callback?: (error?: Error) => void
  ): Promise<string | null>

  removeItem(key: string, callback?: (error?: Error) => void): Promise<void>
}
