"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheKey = void 0;
exports.clear = clear;
exports.clearCache = clearCache;
exports.storageKey = exports.saveData = exports.saveCache = exports.removeData = exports.loadData = exports.loadCache = exports.initStorage = void 0;
const keyPrefix = '@dropthought/dt-sdk/';
const cacheKeyPrefix = `${keyPrefix}cache/`;
let storage = {
  async getItem() {
    return null;
  },
  async setItem() {},
  async removeItem() {},
  async getAllKeys() {
    return [];
  },
  async multiRemove() {}
};

/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/program-report/pid/@favorite-filters'
 * @param {string} key
 * @returns {string}
 */
const storageKey = key => {
  return `${keyPrefix}${key}`;
};

/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/cache/program-report/pid/@favorite-filters'
 * purpose: we can clear the cache by checking the prefix
 * @param {string} key
 * @returns {string}
 */
exports.storageKey = storageKey;
const cacheKey = key => {
  return `${cacheKeyPrefix}${key}`;
};

/**
 * @description only clear data that starts with '@bundle-id'
 */
exports.cacheKey = cacheKey;
async function clear() {
  const keys = await storage.getAllKeys();
  const keysWithPrefix = keys.filter(key => key.startsWith(keyPrefix));
  await storage.multiRemove(keysWithPrefix);
}

/**
 * @description only clear data that starts with '@bundle-id/cache/'
 */
async function clearCache() {
  const keys = await storage.getAllKeys();
  const keysWithPrefix = keys.filter(key => key.startsWith(cacheKeyPrefix));
  await storage.multiRemove(keysWithPrefix);
}

/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
const load = async (key, initValue = undefined) => {
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
const save = async (key, data) => {
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
const loadData = async (key, initValue = undefined) => {
  return load(storageKey(key), initValue);
};

/**
 * @template T
 * @param {string} key
 * @param {T} data
 */
exports.loadData = loadData;
const saveData = async (key, data) => {
  return save(storageKey(key), data);
};

/**
 * @param {string} key
 */
exports.saveData = saveData;
const removeData = async key => {
  return storage.removeItem(storageKey(key));
};

/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
exports.removeData = removeData;
const loadCache = async (key, initValue = undefined) => {
  return load(cacheKey(key), initValue);
};

/**
 * @template T
 * @param {string} key
 * @param {T} data
 */
exports.loadCache = loadCache;
const saveCache = async (key, data) => {
  return save(cacheKey(key), data);
};
exports.saveCache = saveCache;
const initStorage = storage => {
  storage = storage;
};
exports.initStorage = initStorage;
//# sourceMappingURL=Storage.js.map