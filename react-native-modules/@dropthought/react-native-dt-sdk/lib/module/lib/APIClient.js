import { Fetcher } from './Fetcher';
const DEV_URL = 'https://stage-api.dropthought.com';
const PROD_URL = 'https://api.dropthought.com';
const HOST = __DEV__ ? DEV_URL : PROD_URL;
export const BASE_URL = `${HOST}/dtapp`;
export const DEFAULT_TIMEOUT = 30000; // default timeout: 30 seconds

export const fetcherInstance = new Fetcher({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT
});

/** @typedef {import('./Fetcher').InitializeParams} APIInitializeParams */
/** @typedef {import('./Fetcher').RequestConfig} RequestConfig */
/** @typedef {import('./Fetcher').AuthToken} AuthToken */

/**
 * @param {APIInitializeParams} param
 */
export function apiInitialize(param = {}) {
  fetcherInstance.init(param);
}

/**
 * @template T
 * @param {string} url
 * @param {RequestConfig} requestConfig
 * @returns {import('axios').AxiosPromise<T>}
 */
export async function apiRequest(url, requestConfig) {
  return fetcherInstance.request(url, requestConfig);
}
//# sourceMappingURL=APIClient.js.map