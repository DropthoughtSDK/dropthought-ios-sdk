"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = void 0;
var _API = require("./API");
/**
 * @param {FormData} file
 * @param {QuestionType} questionType
 * @param {AxiosRequestConfig=} requestConfig
 */
const uploadFile = async (file, questionType, requestConfig) => {
  return (0, _API.apiUploadFileEvent)(file, questionType, {
    // use shorter timeout here, because the server is unstable, so we need to get the timer longer
    timeout: 100000,
    ...requestConfig
  }).catch(error => {
    // save result when there's error
    throw error;
  });
};

/**
 * @typedef {import('./UploadFileAPI').FormData} FormData
 * @typedef {import('@dropthought/react-native-ui').QuestionType} QuestionType
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */
exports.uploadFile = uploadFile;
//# sourceMappingURL=UploadFile.js.map