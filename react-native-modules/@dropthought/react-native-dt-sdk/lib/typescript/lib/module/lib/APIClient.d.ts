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
export const BASE_URL: string;
export const DEFAULT_TIMEOUT: 30000;
export const fetcherInstance: Fetcher;
export type APIInitializeParams = import('./Fetcher').InitializeParams;
export type RequestConfig = import('./Fetcher').RequestConfig;
export type AuthToken = import('./Fetcher').AuthToken;
import { Fetcher } from "./Fetcher";
