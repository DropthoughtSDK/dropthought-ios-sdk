"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiPostEvent = apiPostEvent;

var _ramda = require("ramda");

var _APIClient = require("./APIClient");

var _Fetcher = require("./Fetcher");

/**
 * @description
 * https://docs.dropthought.com/docs/2_0/api.html#event
 * submit feedback
 */
const EVENT_PATH = '/api/event';
/**
 * post event (feedback)
 * @param {{
 *   programId: string,
 *   feedbacks: Feedback[],
 *   source?: EventAPISourceType,
 *   metadata: any,
 *   createdTime: string,
 *   timeZone: string
 * }} param0
 * @param {AxiosRequestConfig} axiosConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<Survey>}
 */

async function apiPostEvent({
  programId,
  feedbacks = [],
  source = 'api',
  metadata = {},
  createdTime,
  timeZone
}, axiosConfig = {}, fetcher = _APIClient.fetcherInstance) {
  /** @type {AxiosRequestConfig} */
  const params = {
    method: 'POST',
    authRequired: true,
    data: {
      refId: programId,
      data: feedbacks.map(feedback => ({
        dataId: feedback.questionId,
        dataValue: // for not answered question, server doesn't allow empty array for dataValue
        // it accept [''] for not answered question
        (0, _ramda.isNil)(feedback.answers) || (0, _ramda.isEmpty)(feedback.answers) ? [''] : feedback.answers,
        dataType: feedback.type,
        otherFlag: feedback.otherFlag
      })),
      metaData: {
        source,
        ...metadata
      },
      createdTime,
      timeZone
    },
    ...axiosConfig
  };
  return fetcher.request(EVENT_PATH, params).then(response => {
    console.log('[RN] Upload feedback response: ', response);

    if (response.data.success === false) {
      (0, _Fetcher.throwRequestError)(response);
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
 */
//# sourceMappingURL=EventAPI.js.map