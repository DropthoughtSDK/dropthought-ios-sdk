import { isNil, isEmpty } from 'ramda';
import { fetcherInstance } from './APIClient';
import { throwRequestError } from './Fetcher';
const UPLOAD_PATH = '/api/event/storage/file';

/**
 * @param {FormData} file
 * @param {Fetcher=} fetcher
 * @param {QuestionType} questionType
 * @param {AxiosRequestConfig=} axiosConfig
 * @returns {Promise<UploadFileResult>}
 */
export async function uploadFile(file, questionType, axiosConfig, fetcher = fetcherInstance) {
  let formData = new FormData();
  // @ts-ignore
  formData.append('file', file);

  /** @type {AxiosRequestConfig} */
  const params = {
    method: 'POST',
    authRequired: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      questionType: questionType
    },
    body: formData,
    ...axiosConfig
  };
  return fetcher.request(UPLOAD_PATH, params).then(response => {
    if (response.data.success === false) {
      throwRequestError(response);
      return;
    }
    return response.data;
  });
}

/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 * @typedef {import('@dropthought/react-native-ui').QuestionType} QuestionType
 */

/**
 * @typedef {Object} FormData
 * @property {string} uri
 * @property {string} name
 * @property {string} type
 * @property {string=} base64
 */

/**
 * @typedef {Object} UploadFileResult
 * @property {number} sizeInMB
 * @property {boolean} success
 * @property {string} url
 */
//# sourceMappingURL=UploadFileAPI.js.map