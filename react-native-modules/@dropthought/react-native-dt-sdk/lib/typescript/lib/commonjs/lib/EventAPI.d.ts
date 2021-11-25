export var __esModule: boolean;
export type RequestConfig = import('./Fetcher').RequestConfig;
export type Fetcher = import('./Fetcher').Fetcher;
export type Feedback = any;
export type SurveyFeedback = any;
export type EventAPISourceType = any;
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
export function apiPostEvent({ programId, feedbacks, source, metadata, createdTime, timeZone }: {
    programId: string;
    feedbacks: Feedback[];
    source?: EventAPISourceType;
    metadata: any;
    createdTime: string;
    timeZone: string;
}, axiosConfig?: any, fetcher?: Fetcher | undefined): Promise<any>;
