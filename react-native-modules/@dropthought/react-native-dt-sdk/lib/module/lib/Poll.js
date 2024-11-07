import { apiPostPollChoice } from './API';

/**
 * @param {PostPollingChoiceFnParams} param
 * @param {AxiosRequestConfig=} requestConfig
 */
export const postPollChoice = async (param, requestConfig) => {
  return apiPostPollChoice(param, {
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
//# sourceMappingURL=Poll.js.map