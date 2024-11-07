import { fetcherInstance } from './APIClient';
import { throwRequestError } from './Fetcher';

/**
 * @param {string} programToken
 * @param {string} questionId
 */
const POLL_PATH = (programToken, questionId) => `/api/usertoken/${programToken}/question/${questionId}/percentage`;

/**
 * post poll choice
 * @param {PostPollingChoiceFnParams} param0
 * @param {AxiosRequestConfig} axiosConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<PostPollingChoiceResponse>}
 */
export async function apiPostPollingChoice({
  programToken,
  questionId,
  choice,
  isOther
}, axiosConfig = {}, fetcher = fetcherInstance) {
  /** @type {AxiosRequestConfig} */
  const params = {
    method: 'POST',
    authRequired: true,
    data: {
      choice: choice ?? '',
      isOther
    },
    ...axiosConfig
  };
  return fetcher.request(POLL_PATH(programToken, questionId), params).then(response => {
    if (response.data.success === false) {
      throwRequestError(response);
      return;
    }
    return response.data;
  });
}

/**
 * @typedef {import('./Fetcher').RequestConfig} RequestConfig
 * @typedef {import('./Fetcher').Fetcher} Fetcher
 * @typedef {import('../data').Feedback} Feedback
 * @typedef {import('../data').SurveyFeedback} SurveyFeedback
 * @typedef {import('../data').EventAPISourceType} EventAPISourceType
 * @typedef {import('../data').PostPollingChoiceFnParams} PostPollingChoiceFnParams
 * @typedef {import('../data').PostPollingChoiceResponse} PostPollingChoiceResponse
 */
//# sourceMappingURL=PollAPI.js.map