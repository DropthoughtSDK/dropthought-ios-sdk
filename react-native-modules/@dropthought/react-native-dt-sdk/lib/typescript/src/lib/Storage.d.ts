export interface Storage {
    getItem(key: string, callback?: (error?: Error, result?: string) => void): Promise<string | null>;
    setItem(key: string, value: string, callback?: (error?: Error) => void): Promise<void>;
    removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;
    getAllKeys(callback?: (error?: Error, keys?: string[]) => void): Promise<string[]>;
    multiRemove(keys: string[], callback?: (errors?: Error[]) => void): Promise<void>;
}
/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/program-report/pid/@favorite-filters'
 * @param {string} key
 * @returns {string}
 */
export declare const storageKey: (key: string) => string;
/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/cache/program-report/pid/@favorite-filters'
 * purpose: we can clear the cache by checking the prefix
 * @param {string} key
 * @returns {string}
 */
export declare const cacheKey: (key: string) => string;
/**
 * @description only clear data that starts with '@bundle-id'
 */
export declare function clear(): Promise<void>;
/**
 * @description only clear data that starts with '@bundle-id/cache/'
 */
export declare function clearCache(): Promise<void>;
/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
export declare const loadData: (key: string, initValue?: any) => Promise<any>;
/**
 * @template T
 * @param {string} key
 * @param {T} data
 */
export declare const saveData: (key: string, data: any) => Promise<any>;
/**
 * @param {string} key
 */
export declare const removeData: (key: string) => Promise<void>;
/**
 * @template T
 * @param {string} key
 * @param {T=} initValue
 * @returns {Promise<T>}
 */
export declare const loadCache: (key: string, initValue?: any) => Promise<any>;
/**
 * @template T
 * @param {string} key
 * @param {T} data
 */
export declare const saveCache: (key: string, data: any) => Promise<any>;
export declare const initStorage: (storage: Storage) => void;
