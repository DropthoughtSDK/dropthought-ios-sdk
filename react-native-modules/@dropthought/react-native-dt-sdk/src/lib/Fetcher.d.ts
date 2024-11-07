import type { AxiosRequestConfig } from 'axios';

export interface CustomRequestConfig {
  authRequired: boolean;
  cache: boolean;
}

export declare const isRequestTimeoutError: (error: Error) => boolean;
export declare const isNoInternetError: (error: Error) => boolean;
export declare const RequestConfig: import('axios').AxiosRequestConfig &
  CustomRequestConfig;
