export var __esModule: boolean;
export default EncryptStorage;
export function initialize(apiKey: any, AsyncStorage: any): Promise<any>;
declare namespace EncryptStorage {
    /** @param {string} key */
    function removeItem(key: string): any;
    /** @param {string} key */
    function removeItem(key: string): any;
    /** @param {string} key */
    function getItem(key: string): any;
    /** @param {string} key */
    function getItem(key: string): any;
    /**
     * @param {string} key
     * @param {string} value
     */
    function setItem(key: string, value: string): any;
    /**
     * @param {string} key
     * @param {string} value
     */
    function setItem(key: string, value: string): any;
    /**
     * @template T
     * @param {string} key
     * @param {T} value
     */
    function setItemT<T>(key: string, value: T): any;
    /**
     * @template T
     * @param {string} key
     * @param {T} value
     */
    function setItemT<T>(key: string, value: T): any;
    /**
     * @template T
     * @param {string} key
     * @param {T=} defaultValue
     */
    function getItemT<T>(key: string, defaultValue?: T): any;
    /**
     * @template T
     * @param {string} key
     * @param {T=} defaultValue
     */
    function getItemT<T>(key: string, defaultValue?: T): any;
}
