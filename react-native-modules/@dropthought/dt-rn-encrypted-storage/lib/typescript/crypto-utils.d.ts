import Aes from 'react-native-aes-crypto';
export declare function pbkdf2(password: string, salt: string, cost: number, length: number, algorithm: Aes.Algorithms_pbkdf2): Promise<string>;
export declare function randomKey(length?: number): Promise<string>;
export interface EncryptedData {
    cipher: string;
    iv: string;
}
export declare function encryptData(text: string, key: string): Promise<EncryptedData>;
export declare function decryptData(encryptedData: EncryptedData, key: string): Promise<string>;
//# sourceMappingURL=crypto-utils.d.ts.map