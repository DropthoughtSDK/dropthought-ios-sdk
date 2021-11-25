import {fetcherInstance} from './APIClient'

const PROGRAM_PATH = '/api/program'

/**
 * get single language version of a program by id
 * @param {{
 *   programId: string,
 *   language?: string,
 *   timezone?: string,
 * }} param0
 * @param {RequestConfig} requestConfig
 * @param {Fetcher=} fetcher
 * @returns {Promise<Survey>}
 */
export async function apiGetProgramById(
    {programId, language = 'en', timezone},
    requestConfig = {},
    fetcher = fetcherInstance,
) {
    /** @type {RequestConfig} */
    const params = {
        method: 'GET',
        authRequired: true,
        params: {
            language,
            timezone,
        },
        ...requestConfig,
    }

    const url = `${PROGRAM_PATH}/${programId}`
    return fetcher.request(url, params).then((response) => {
        return response.data.result
    })
}

/**
 * @typedef {import('./Fetcher').RequestConfig} RequestConfig
 * @typedef {import('./Fetcher').Fetcher} Fetcher
 * @typedef {import('../data').Survey} Survey
 * @typedef {import('../data').SurveyLangMaps} SurveyLangMaps
 */