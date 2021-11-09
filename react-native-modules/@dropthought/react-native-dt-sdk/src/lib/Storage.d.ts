/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/program-report/pid/@favorite-filters'
 */
export declare const storageKey: (key: string) => string;
/**
 * given 'program-report/pid/@favorite-filters' -> '@com.abc.com/cache/program-report/pid/@favorite-filters'
 * purpose: we can clear the cache by checking the prefix
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

export declare function loadData<T>(key: string, initValue?: T): Promise<T>;

export declare function saveData<T>(key: string, data: T): Promise<T>;

export declare function removeData(key: string): Promise<any>;

export declare function loadCache<T>(key: string, initValue?: T): Promise<T>;

export declare function saveCache<T>(key: string, data: T): Promise<T>;
