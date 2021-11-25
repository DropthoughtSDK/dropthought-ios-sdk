export function throwRequestError(mockAxiosResponse: import('axios').AxiosResponse<any>): never;
export function isRequestTimeoutError(error: Error): boolean;
export function isNoInternetError(error: Error): boolean;
/**
 * @typedef {object}  InitializeParams
 * @property {string=} baseURL optional, if want to overwrite the baseURL
 * @property {number=} timeout optional, if want to overwrite the default timeout
 * @property {()=>Promise<string>=} authToken - optional, a function that returns the auth token or api-key
 * @property {()=>Promise<string>=} refreshToken - optional, a function that returns the refresh token
 * @property {(authTokens: AuthToken)=>Promise<any>=} storeTokens - optional, a function that tells the engine how to store tokens
 * @property {(url: string)=>Promise<any>=} loadCache - optional, a function that tells the engine how to load cache from this url
 * @property {(url: string, response: {data: any, status: number, statusText: string, headers: object})=>Promise<any>=} saveCache - optional, a function that tells the engine how to save cache
 * @property {string=} apiKey - or simply given the apiKey, optional
 */
export class Fetcher {
    /**
     * @param {InitializeParams} param
     */
    constructor(param?: InitializeParams);
    defaultRequestConfig: {
        baseURL: string;
        timeout: number;
        headers: {
            Accept: string;
            'Content-Type': string;
        };
    };
    /** @type {() => Promise<string>} */
    authToken: () => Promise<string>;
    /** @type {string | undefined} this is for api key version2 */
    apiKey: string | undefined;
    /** @type {() => Promise<string>} */
    refreshToken: () => Promise<string>;
    /** @type {(authTokens: AuthToken) => Promise<undefined>} */
    storeTokens: (authTokens: AuthToken) => Promise<undefined>;
    /**
     * @template T
     * @type {(url: string) => Promise<T>}
     */
    loadCache: (url: string) => Promise<T>;
    /** @type {(url: string, response: {data: any, status: number, statusText: string}) => Promise<undefined>} */
    saveCache: (url: string, response: {
        data: any;
        status: number;
        statusText: string;
    }) => Promise<undefined>;
    /**
     * @param {InitializeParams} param
     */
    init(param?: InitializeParams): void;
    /**
     * @template T
     * @param {string} url
     * @param {RequestConfig} requestConfig
     * @returns {import('axios').AxiosPromise<T>}
     */
    fetchWithTimeout<T_1>(url: string, requestConfig: RequestConfig): import("axios").AxiosPromise<T_1>;
    /**
     * set the auth token to config
     * @private
     * @param {RequestConfig} requestConfig
     * @returns {Promise<RequestConfig>}
     */
    private authorizeConfig;
    /** @returns {Promise<any>} */
    tokenRenew(timeout?: number): Promise<any>;
    /**
     * it checks if the authToken(accessToken) is valid (check the expiration date)
     * if it is invalid, renew token
     * @private
     * @param {number=} timeout
     */
    private renewTokenIfNeeded;
    /**
     * @public
     * @template T
     * @param {string} url
     * @param {RequestConfig} requestConfig
     * @returns {import('axios').AxiosPromise<T>}
     */
    public request<T_2>(url: string, requestConfig: RequestConfig): import("axios").AxiosPromise<T_2>;
}
export type InitializeParams = {
    /**
     * optional, if want to overwrite the baseURL
     */
    baseURL?: string | undefined;
    /**
     * optional, if want to overwrite the default timeout
     */
    timeout?: number | undefined;
    /**
     * - optional, a function that returns the auth token or api-key
     */
    authToken?: (() => Promise<string>) | undefined;
    /**
     * - optional, a function that returns the refresh token
     */
    refreshToken?: (() => Promise<string>) | undefined;
    /**
     * - optional, a function that tells the engine how to store tokens
     */
    storeTokens?: (authTokens: AuthToken) => Promise<any>;
    /**
     * - optional, a function that tells the engine how to load cache from this url
     */
    loadCache?: (url: string) => Promise<any>;
    /**
     * - optional, a function that tells the engine how to save cache
     */
    saveCache?: (url: string, response: {
        data: any;
        status: number;
        statusText: string;
        headers: object;
    }) => Promise<any>;
    /**
     * - or simply given the apiKey, optional
     */
    apiKey?: string | undefined;
};
export type AuthToken = {
    accessToken: string;
    refreshToken: string;
};
export type CustomRequestConfig = {
    authRequired: boolean;
    cache: boolean;
};
export type RequestConfig = import('axios').AxiosRequestConfig & CustomRequestConfig;
