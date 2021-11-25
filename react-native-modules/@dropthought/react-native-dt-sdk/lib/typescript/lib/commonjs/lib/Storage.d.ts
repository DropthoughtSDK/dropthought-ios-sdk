export var __esModule: boolean;
export function clear(): Promise<void>;
/**
 * @description only clear data that starts with '@bundle-id/cache/'
 */
export function clearCache(): Promise<void>;
/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/program-report/pid/@favorite-filters'
 * @param {string} key
 * @returns {string}
 */
export function storageKey(key: string): string;
export function cacheKey(key: any): string;
/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
export function loadData<T_1>(key: string, initValue?: T_2 | undefined): Promise<T_2>;
export function saveData(key: any, data: any): Promise<T>;
export function removeData(key: any): Promise<void>;
export function loadCache(key: any, initValue?: any): Promise<T>;
export function saveCache(key: any, data: any): Promise<T>;
export function initStorage(storage: any): void;
