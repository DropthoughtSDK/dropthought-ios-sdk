import { Fetcher } from './Fetcher';
import {
  apiGetProgramById as _apiGetProgramById,
  apiGetProgramTokenById as _apiGetProgramTokenById,
} from './ProgramAPI';
import { apiGetVisibilityById as _apiGetVisibilityById } from './VisibilityAPI';
import { apiPostEvent as _apiPostEvent } from './EventAPI';
import { uploadFile as _apiUploadFileEvent } from './UploadFileAPI';
import { apiPostPollingChoice as _apiPostPollingChoice } from './PollAPI';
import { BASE_URL } from './APIClient';

export const sdkFetcher = new Fetcher({
  baseURL: BASE_URL,
});

/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */
export const apiGetProgramById = (param, requestConfig) =>
  _apiGetProgramById(param, requestConfig, sdkFetcher);

/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */
export const apiGetProgramTokenById = (param, requestConfig) =>
  _apiGetProgramTokenById(param, requestConfig, sdkFetcher);

/**
 * @param {string} visibilityId
 * @param {RequestConfig=} requestConfig
 */
export const apiGetVisibilityById = (visibilityId, requestConfig) =>
  _apiGetVisibilityById(visibilityId, requestConfig, sdkFetcher);

/**
 *
 * @param {APIPostEventParam} param
 * @param {RequestConfig=} requestConfig
 */
export const apiPostEvent = (param, requestConfig) =>
  _apiPostEvent(param, requestConfig, sdkFetcher);

/**
 *
 * @param {FormData} file
 * @param {QuestionType} questionType
 * @param {AxiosRequestConfig} requestConfig
 */
export const apiUploadFileEvent = (file, questionType, requestConfig) =>
  _apiUploadFileEvent(file, questionType, requestConfig, sdkFetcher);

/**
 * @param {PostPollingChoiceFnParams} param
 * @param {AxiosRequestConfig} requestConfig
 */
export const apiPostPollChoice = (param, requestConfig) =>
  _apiPostPollingChoice(param, requestConfig, sdkFetcher);

/**
 * @typedef {import('../data').APIGetProgramByIdParam} APIGetProgramByIdParam
 * @typedef {import('../data').APIGetProgramTokenByIdParam} APIGetProgramTokenByIdParam
 * @typedef {import('../data').PostPollingChoiceFnParams} PostPollingChoiceFnParams
 * @typedef {import('../data').APIPostEventParam} APIPostEventParam
 * @typedef {import('../data').RequestConfig} RequestConfig
 * @typedef {import('../data').InitializeParams} InitializeParams
 * @typedef {import('../lib/UploadFileAPI').FormData} FormData
 * @typedef {import('@dropthought/react-native-ui').QuestionType} QuestionType
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */
