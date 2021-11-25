export var __esModule: boolean;
export type APIInitializeParams = import('./Fetcher').InitializeParams;
export type RequestConfig = import('./Fetcher').RequestConfig;
export type AuthToken = import('./Fetcher').AuthToken;
export function apiInitialize(param?: {}): void;
/**
 * @template T
 * @param {string} url
 * @param {RequestConfig} requestConfig
 * @returns {import('axios').AxiosPromise<T>}
 */
export function apiRequest<T>(url: string, requestConfig: RequestConfig): import("axios").AxiosPromise<T>;
export const BASE_URL: string;
export const DEFAULT_TIMEOUT: 30000;
export const fetcherInstance: _Fetcher.Fetcher;
import _Fetcher = require("./Fetcher");
