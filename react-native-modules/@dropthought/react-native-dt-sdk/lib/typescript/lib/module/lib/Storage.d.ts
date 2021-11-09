/**
 * @description only clear data that starts with '@bundle-id'
 */
export function clear(): Promise<void>;
/**
 * @description only clear data that starts with '@bundle-id/cache/'
 */
export function clearCache(): Promise<void>;
export function storageKey(key: string): string;
export function cacheKey(key: string): string;
export function loadData<T>(key: string, initValue?: T): Promise<T>;
export function saveData<T>(key: string, data: T): Promise<T>;
export function removeData(key: string): Promise<void>;
export function loadCache<T>(key: string, initValue?: T): Promise<T>;
export function saveCache<T>(key: string, data: T): Promise<T>;
export function initStorage(storage: any): void;
