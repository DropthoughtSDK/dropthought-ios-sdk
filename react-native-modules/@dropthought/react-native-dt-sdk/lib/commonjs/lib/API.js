"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiUploadFileEvent = exports.apiPostEvent = exports.apiGetVisibilityById = exports.apiGetProgramById = exports.sdkFetcher = void 0;

var _Fetcher = require("./Fetcher");

var _ProgramAPI = require("./ProgramAPI");

var _VisibilityAPI = require("./VisibilityAPI");

var _EventAPI = require("./EventAPI");

var _UploadFileAPI = require("./UploadFileAPI");

var _APIClient = require("./APIClient");

const sdkFetcher = new _Fetcher.Fetcher({
  baseURL: _APIClient.BASE_URL
});
/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */

exports.sdkFetcher = sdkFetcher;

const apiGetProgramById = (param, requestConfig) => (0, _ProgramAPI.apiGetProgramById)(param, requestConfig, sdkFetcher);
/**
 * @param {string} visibilityId
 * @param {RequestConfig=} requestConfig
 */


exports.apiGetProgramById = apiGetProgramById;

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
 * @param {ImageFormData} file
 * @param {RequestConfig=} requestConfig
 */


exports.apiPostEvent = apiPostEvent;

const apiUploadFileEvent = (file, requestConfig) => (0, _UploadFileAPI.uploadFile)(file, requestConfig, sdkFetcher);
/**
 * @typedef {import('../data').APIGetProgramByIdParam} APIGetProgramByIdParam
 * @typedef {import('../data').APIPostEventParam} APIPostEventParam
 * @typedef {import('../data').RequestConfig} RequestConfig
 * @typedef {import('../data').InitializeParams} InitializeParams
 * @typedef {import('../lib/UploadFileAPI').ImageFormData} ImageFormData
 */


exports.apiUploadFileEvent = apiUploadFileEvent;
//# sourceMappingURL=API.js.map