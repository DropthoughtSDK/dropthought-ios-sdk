export declare class EncryptedStorage implements StorageInterface {
    private account;
    private key;
    private storage;
    constructor(storage: StorageInterface);
    private dataKey;
    setAccount(account: string, passphrase: string): Promise<string>;
    setItem(key: string, value: string): Promise<void>;
    setItemT<T>(key: string, value: T): Promise<void>;
    getItem(key: string): Promise<string | null>;
    getItemT<T>(key: string, defaultValue?: T): Promise<T | null>;
    removeItem(key: string): Promise<void>;
}
export interface StorageInterface {
    setItem(key: string, value: string, callback?: (error?: Error) => void): Promise<void>;
    getItem(key: string, callback?: (error?: Error) => void): Promise<string | null>;
    removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;
}
