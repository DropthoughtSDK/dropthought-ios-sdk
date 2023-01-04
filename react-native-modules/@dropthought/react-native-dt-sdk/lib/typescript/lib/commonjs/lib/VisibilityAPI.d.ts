export var __esModule: boolean;
export type RequestConfig = import('./Fetcher').RequestConfig;
export type Fetcher = import('./Fetcher').Fetcher;
export type Visibility = any;
/**
 * get single visibility data
 * @param {string} visibilityId
 * @param {RequestConfig} requestConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<Visibility>}
 */
export function apiGetVisibilityById(visibilityId: string, requestConfig?: RequestConfig, fetcher?: Fetcher | undefined): Promise<Visibility>;
