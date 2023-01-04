import { Fetcher } from './Fetcher';
import { apiGetProgramById as _apiGetProgramById } from './ProgramAPI';
import { apiGetVisibilityById as _apiGetVisibilityById } from './VisibilityAPI';
import { apiPostEvent as _apiPostEvent } from './EventAPI';
import { BASE_URL } from './APIClient';
export const sdkFetcher = new Fetcher({
  baseURL: BASE_URL
});
/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */

export const apiGetProgramById = (param, requestConfig) => _apiGetProgramById(param, requestConfig, sdkFetcher);
/**
 * @param {string} visibilityId
 * @param {RequestConfig=} requestConfig
 */

export const apiGetVisibilityById = (visibilityId, requestConfig) => _apiGetVisibilityById(visibilityId, requestConfig, sdkFetcher);
/**
 *
 * @param {APIPostEventParam} param
 * @param {RequestConfig=} requestConfig
 */

export const apiPostEvent = (param, requestConfig) => _apiPostEvent(param, requestConfig, sdkFetcher);
/**
 * @typedef {import('../data').APIGetProgramByIdParam} APIGetProgramByIdParam
 * @typedef {import('../data').APIPostEventParam} APIPostEventParam
 * @typedef {import('../data').RequestConfig} RequestConfig
 * @typedef {import('../data').InitializeParams} InitializeParams
 */
//# sourceMappingURL=API.js.map