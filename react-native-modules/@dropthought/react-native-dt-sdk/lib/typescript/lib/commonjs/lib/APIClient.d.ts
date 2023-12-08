export var __esModule: boolean;
export var BASE_URL: string;
export var DEFAULT_TIMEOUT: number;
export var fetcherInstance: _Fetcher.Fetcher;
export type APIInitializeParams = import('./Fetcher').InitializeParams;
export type RequestConfig = import('./Fetcher').RequestConfig;
export type AuthToken = import('./Fetcher').AuthToken;
/** @typedef {import('./Fetcher').InitializeParams} APIInitializeParams */
/** @typedef {import('./Fetcher').RequestConfig} RequestConfig */
/** @typedef {import('./Fetcher').AuthToken} AuthToken */
/**
 * @param {APIInitializeParams} param
 */
export function apiInitialize(param?: APIInitializeParams): void;
/**
 * @template T
 * @param {string} url
 * @param {RequestConfig} requestConfig
 * @returns {import('axios').AxiosPromise<T>}
 */
export function apiRequest<T>(url: string, requestConfig: RequestConfig): import("axios").AxiosPromise<T>;
import _Fetcher = require("./Fetcher");
