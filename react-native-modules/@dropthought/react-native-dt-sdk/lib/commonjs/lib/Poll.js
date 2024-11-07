"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPollChoice = void 0;
var _API = require("./API");
/**
 * @param {PostPollingChoiceFnParams} param
 * @param {AxiosRequestConfig=} requestConfig
 */
const postPollChoice = async (param, requestConfig) => {
  return (0, _API.apiPostPollChoice)(param, {
    ...requestConfig
  }).catch(error => {
    // save result when there's error
    throw error;
  });
};

/**
 * @typedef {import('../data').PostPollingChoiceFnParams} PostPollingChoiceFnParams
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */
exports.postPollChoice = postPollChoice;
//# sourceMappingURL=Poll.js.map