"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sdkFetcher = exports.apiUploadFileEvent = exports.apiPostPollChoice = exports.apiPostEvent = exports.apiGetVisibilityById = exports.apiGetProgramTokenById = exports.apiGetProgramById = void 0;
var _Fetcher = require("./Fetcher");
var _ProgramAPI = require("./ProgramAPI");
var _VisibilityAPI = require("./VisibilityAPI");
var _EventAPI = require("./EventAPI");
var _UploadFileAPI = require("./UploadFileAPI");
var _PollAPI = require("./PollAPI");
var _APIClient = require("./APIClient");
const sdkFetcher = exports.sdkFetcher = new _Fetcher.Fetcher({
  baseURL: _APIClient.BASE_URL
});

/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */
const apiGetProgramById = (param, requestConfig) => (0, _ProgramAPI.apiGetProgramById)(param, requestConfig, sdkFetcher);

/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */
exports.apiGetProgramById = apiGetProgramById;
const apiGetProgramTokenById = (param, requestConfig) => (0, _ProgramAPI.apiGetProgramTokenById)(param, requestConfig, sdkFetcher);

/**
 * @param {string} visibilityId
 * @param {RequestConfig=} requestConfig
 */
exports.apiGetProgramTokenById = apiGetProgramTokenById;
const apiGetVisibilityById = (visibilityId, requestConfig) => (0, _VisibilityAPI.apiGetVisibilityById)(visibilityId, requestConfig, sdkFetcher);

/**
 *
 * @param {APIPostEventParam} param
 * @param {RequestConfig=} requestConfig
 */
exports.apiGetVisibilityById = apiGetVisibilityById;
const apiPostEvent = (param, requestConfig) => (0, _EventAPI.apiPostEvent)(param, requestConfig, sdkFetcher);

/**
 *
 * @param {FormData} file
 * @param {QuestionType} questionType
 * @param {AxiosRequestConfig} requestConfig
 */
exports.apiPostEvent = apiPostEvent;
const apiUploadFileEvent = (file, questionType, requestConfig) => (0, _UploadFileAPI.uploadFile)(file, questionType, requestConfig, sdkFetcher);

/**
 * @param {PostPollingChoiceFnParams} param
 * @param {AxiosRequestConfig} requestConfig
 */
exports.apiUploadFileEvent = apiUploadFileEvent;
const apiPostPollChoice = (param, requestConfig) => (0, _PollAPI.apiPostPollingChoice)(param, requestConfig, sdkFetcher);

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
exports.apiPostPollChoice = apiPostPollChoice;
//# sourceMappingURL=API.js.map