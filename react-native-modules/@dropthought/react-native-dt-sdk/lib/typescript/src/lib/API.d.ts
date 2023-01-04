export const sdkFetcher: Fetcher;
export function apiGetProgramById(param: any, requestConfig?: any): Promise<import("../data").Survey>;
export function apiGetVisibilityById(visibilityId: string, requestConfig?: any): Promise<import("../data").Visibility>;
export function apiPostEvent(param: any, requestConfig?: any): Promise<any>;
export type APIGetProgramByIdParam = import('../data').APIGetProgramByIdParam;
export type APIPostEventParam = import('../data').APIPostEventParam;
export type RequestConfig = import('../data').RequestConfig;
export type InitializeParams = import('../data').InitializeParams;
import { Fetcher } from "./Fetcher";
