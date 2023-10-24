/**
 * @param {ImageFormData} file
 * @param {AxiosRequestConfig} axiosConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<UploadFileResult>}
 */
export function uploadFile(file: ImageFormData, axiosConfig?: any, fetcher?: any): Promise<UploadFileResult>;
export type ImageFormData = {
    uri: string;
    name: string;
    type: string;
};
export type UploadFileResult = {
    sizeInMB: number;
    success: boolean;
    url: string;
};
