import { fetcherInstance } from './APIClient';

const VISIBILITY_PATH = visibilityId => `/api/sdk/visibility/${visibilityId}`;
/**
 * get single visibility data
 * @param {string} visibilityId
 * @param {RequestConfig} requestConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<Visibility>}
 */


export async function apiGetVisibilityById(visibilityId, requestConfig = {}, fetcher = fetcherInstance) {
  /** @type {RequestConfig} */
  const params = {
    method: 'GET',
    authRequired: true,
    ...requestConfig
  };
  return fetcher.request(VISIBILITY_PATH(visibilityId), params).then(response => {
    return response.data.result;
  });
}
/**
 * @typedef {import('./Fetcher').RequestConfig} RequestConfig
 * @typedef {import('./Fetcher').Fetcher} Fetcher
 * @typedef {import('../data').Visibility} Visibility
 */
//# sourceMappingURL=VisibilityAPI.js.map