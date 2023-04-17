export declare function pbkdf2(password: string, salt: string, iteration: number, length: number): Promise<string>;
export declare function randomKey(length?: number): Promise<string>;
export interface EncryptedData {
    cipher: string;
    iv: string;
}
export declare function encryptData(text: string, key: string): Promise<EncryptedData>;
export declare function decryptData(encryptedData: EncryptedData, key: string): Promise<string>;
