const keyPrefix = '@dropthought/dt-sdk/';
const cacheKeyPrefix = `${keyPrefix}cache/`;

export interface Storage {
  getItem(
    key: string,
    callback?: (error?: Error, result?: string) => void
  ): Promise<string | null>;

  setItem(
    key: string,
    value: string,
    callback?: (error?: Error) => void
  ): Promise<void>;

  removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;

  getAllKeys(
    callback?: (error?: Error, keys?: string[]) => void
  ): Promise<string[]>;

  multiRemove(
    keys: string[],
    callback?: (errors?: Error[]) => void
  ): Promise<void>;
}

let storage: Storage = {
  async getItem() {
    return null;
  },
  async setItem() {},
  async removeItem() {},
  async getAllKeys() {
    return [];
  },
  async multiRemove() {},
};

/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/program-report/pid/@favorite-filters'
 * @param {string} key
 * @returns {string}
 */
export const storageKey = (key: string) => {
  return `${keyPrefix}${key}`;
};

/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/cache/program-report/pid/@favorite-filters'
 * purpose: we can clear the cache by checking the prefix
 * @param {string} key
 * @returns {string}
 */
export const cacheKey = (key: string) => {
  return `${cacheKeyPrefix}${key}`;
};

/**
 * @description only clear data that starts with '@bundle-id'
 */
export async function clear() {
  const keys = await storage.getAllKeys();
  const keysWithPrefix = keys.filter((key) => key.startsWith(keyPrefix));

  await storage.multiRemove(keysWithPrefix);
}

/**
 * @description only clear data that starts with '@bundle-id/cache/'
 */
export async function clearCache() {
  const keys = await storage.getAllKeys();
  const keysWithPrefix = keys.filter((key) => key.startsWith(cacheKeyPrefix));

  await storage.multiRemove(keysWithPrefix);
}

/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
const load = async (key: string, initValue = undefined) => {
  let result = initValue;
  try {
    const value = await storage.getItem(key);
    if (value !== null) {
      result = JSON.parse(value);
    }
  } catch (e) {}
  return result;
};

/**
 * @template T
 * @param {string} key
 * @param {T} data
 */
const save = async (key: string, data: any) => {
  try {
    await storage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log('failed at save to storage', key, data);
  }
  return data;
};

/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
export const loadData = async (key: string, initValue = undefined) => {
  return load(storageKey(key), initValue);
};

/**
 * @template T
 * @param {string} key
 * @param {T} data
 */
export const saveData = async (key: string, data: any) => {
  return save(storageKey(key), data);
};

/**
 * @param {string} key
 */
export const removeData = async (key: string) => {
  return storage.removeItem(storageKey(key));
};

/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
export const loadCache = async (key: string, initValue = undefined) => {
  return load(cacheKey(key), initValue);
};

/**
 * @template T
 * @param {string} key
 * @param {T} data
 */
export const saveCache = async (key: string, data: any) => {
  return save(cacheKey(key), data);
};

export const initStorage = (storage: Storage) => {
  storage = storage;
};
