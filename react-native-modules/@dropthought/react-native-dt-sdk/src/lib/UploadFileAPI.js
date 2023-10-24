import { isNil, isEmpty } from 'ramda';

import { fetcherInstance } from './APIClient';
import { throwRequestError } from './Fetcher';

const UPLOAD_PATH = '/api/event/storage/file';

/**
 * @param {ImageFormData} file
 * @param {AxiosRequestConfig} axiosConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<UploadFileResult>}
 */
export async function uploadFile(
  file,
  axiosConfig = {},
  fetcher = fetcherInstance
) {
  let formData = new FormData();
  // @ts-ignore
  formData.append('file', file);

  /** @type {AxiosRequestConfig} */
  const params = {
    method: 'POST',
    authRequired: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      questionType: 'pictureChoice',
    },
    body: formData,
    ...axiosConfig,
  };

  return fetcher.request(UPLOAD_PATH, params).then((response) => {
    if (response.data.success === false) {
      throwRequestError(response);
      return;
    }
    return response.data;
  });
}

/**
 * @typedef {Object} ImageFormData
 * @property {string} uri
 * @property {string} name
 * @property {string} type
 */

/**
 * @typedef {Object} UploadFileResult
 * @property {number} sizeInMB
 * @property {boolean} success
 * @property {string} url
 */
