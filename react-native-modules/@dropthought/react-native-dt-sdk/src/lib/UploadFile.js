import { apiUploadFileEvent } from './API';

/**
 * @param {FormData} file
 * @param {QuestionType} questionType
 * @param {AxiosRequestConfig=} requestConfig
 */
export const uploadFile = async (file, questionType, requestConfig) => {
  return apiUploadFileEvent(file, questionType, {
    // use shorter timeout here, because the server is unstable, so we need to get the timer longer
    timeout: 100000,
    ...requestConfig,
  }).catch((error) => {
    // save result when there's error
    throw error;
  });
};

/**
 * @typedef {import('./UploadFileAPI').FormData} FormData
 * @typedef {import('@dropthought/react-native-ui').QuestionType} QuestionType
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */
