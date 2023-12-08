export var __esModule: boolean;
export var sdkFetcher: _Fetcher.Fetcher;
export type APIGetProgramByIdParam = any;
export type APIPostEventParam = any;
export type RequestConfig = any;
export type InitializeParams = any;
export type ImageFormData = import('../lib/UploadFileAPI').ImageFormData;
import _Fetcher = require("./Fetcher");
/**
 * @param {APIGetProgramByIdParam} param
 * @param {RequestConfig=} requestConfig
 */
export function apiGetProgramById(param: any, requestConfig?: any): Promise<any>;
export function apiGetVisibilityById(visibilityId: any, requestConfig: any): Promise<any>;
export function apiPostEvent(param: any, requestConfig: any): Promise<any>;
export function apiUploadFileEvent(file: any, requestConfig: any): Promise<_UploadFileAPI.UploadFileResult>;
import _UploadFileAPI = require("./UploadFileAPI");
