import { Fetcher } from './Fetcher';
import { apiGetProgramById as _apiGetProgramById } from './ProgramAPI';
import { apiGetVisibilityById as _apiGetVisibilityById } from './VisibilityAPI';
import { apiPostEvent as _apiPostEvent } from './EventAPI';
import { uploadFile as _apiUploadFileEvent } from './UploadFileAPI';
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
 *
 * @param {ImageFormData} file
 * @param {RequestConfig=} requestConfig
 */

export const apiUploadFileEvent = (file, requestConfig) => _apiUploadFileEvent(file, requestConfig, sdkFetcher);
/**
 * @typedef {import('../data').APIGetProgramByIdParam} APIGetProgramByIdParam
 * @typedef {import('../data').APIPostEventParam} APIPostEventParam
 * @typedef {import('../data').RequestConfig} RequestConfig
 * @typedef {import('../data').InitializeParams} InitializeParams
 * @typedef {import('../lib/UploadFileAPI').ImageFormData} ImageFormData
 */
//# sourceMappingURL=API.js.map