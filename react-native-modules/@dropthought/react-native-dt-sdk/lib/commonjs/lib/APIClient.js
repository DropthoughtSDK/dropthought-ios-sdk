"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TIMEOUT = exports.BASE_URL = void 0;
exports.apiInitialize = apiInitialize;
exports.apiRequest = apiRequest;
exports.fetcherInstance = void 0;
var _Fetcher = require("./Fetcher");
const DEV_URL = 'https://stage-api.dropthought.com';
const PROD_URL = 'https://api.dropthought.com';
const HOST = __DEV__ ? DEV_URL : PROD_URL;
const BASE_URL = exports.BASE_URL = `${HOST}/dtapp`;
const DEFAULT_TIMEOUT = exports.DEFAULT_TIMEOUT = 30000; // default timeout: 30 seconds

const fetcherInstance = exports.fetcherInstance = new _Fetcher.Fetcher({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT
});

/** @typedef {import('./Fetcher').InitializeParams} APIInitializeParams */
/** @typedef {import('./Fetcher').RequestConfig} RequestConfig */
/** @typedef {import('./Fetcher').AuthToken} AuthToken */

/**
 * @param {APIInitializeParams} param
 */
function apiInitialize(param = {}) {
  fetcherInstance.init(param);
}

/**
 * @template T
 * @param {string} url
 * @param {RequestConfig} requestConfig
 * @returns {import('axios').AxiosPromise<T>}
 */
async function apiRequest(url, requestConfig) {
  return fetcherInstance.request(url, requestConfig);
}
//# sourceMappingURL=APIClient.js.map