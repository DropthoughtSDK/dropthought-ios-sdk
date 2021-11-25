export var __esModule: boolean;
export type RequestConfig = import('./Fetcher').RequestConfig;
export type Fetcher = import('./Fetcher').Fetcher;
export type Survey = any;
export type SurveyLangMaps = any;
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
export function apiGetProgramById({ programId, language, timezone }: {
    programId: string;
    language?: string;
    timezone?: string;
}, requestConfig?: RequestConfig, fetcher?: Fetcher | undefined): Promise<Survey>;
