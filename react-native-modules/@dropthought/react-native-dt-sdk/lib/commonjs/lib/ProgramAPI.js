"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiGetProgramById = apiGetProgramById;
exports.apiGetProgramTokenById = apiGetProgramTokenById;
var _APIClient = require("./APIClient");
const PROGRAM_PATH = '/api/program';
/**
 * @param {string} programId
 */
const PROGRAM_TOKEN_PATH = programId => `/api/dtsurvey/generateToken/surveyuuid/${programId}`;

/**
 * get single language version of a program by id
 * @param {APIGetProgramByIdParam} param0
 * @param {RequestConfig} requestConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<Survey>}
 */
async function apiGetProgramById({
  programId,
  language = 'en',
  timezone
}, requestConfig = {}, fetcher = _APIClient.fetcherInstance) {
  /** @type {RequestConfig} */
  const params = {
    method: 'GET',
    authRequired: true,
    params: {
      language,
      timezone
    },
    ...requestConfig
  };
  const url = `${PROGRAM_PATH}/${programId}`;
  return fetcher.request(url, params).then(response => {
    return response.data.result;
  });
}

/**
 * get program token by id
 * @param {APIGetProgramTokenByIdParam} param0
 * @param {RequestConfig} requestConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<string>}
 */
async function apiGetProgramTokenById({
  programId
}, requestConfig = {}, fetcher = _APIClient.fetcherInstance) {
  /** @type {RequestConfig} */
  const params = {
    method: 'GET',
    authRequired: true,
    params: {
      language: 'en',
      cc: 'DT'
    },
    ...requestConfig
  };
  const url = PROGRAM_TOKEN_PATH(programId);
  return fetcher.request(url, params).then(response => {
    return response.data.result[0].token.split('$RFQ1')[0]; // need to remove original token's suffix $RFQ1;
  });
}

/**
 * @typedef {import('./Fetcher').RequestConfig} RequestConfig
 * @typedef {import('./Fetcher').Fetcher} Fetcher
 * @typedef {import('@dropthought/react-native-ui').Survey} Survey
 * @typedef {import('../data').APIGetProgramByIdParam} APIGetProgramByIdParam
 * @typedef {import('../data').APIGetProgramTokenByIdParam} APIGetProgramTokenByIdParam
 */
//# sourceMappingURL=ProgramAPI.js.map