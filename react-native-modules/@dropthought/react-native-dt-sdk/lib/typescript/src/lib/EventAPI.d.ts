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
export function apiPostEvent({ programId, feedbacks, source, metadata, createdTime, timeZone, }: {
    programId: string;
    feedbacks: Feedback[];
    source?: EventAPISourceType;
    metadata: any;
    createdTime: string;
    timeZone: string;
}, axiosConfig?: any, fetcher?: Fetcher | undefined): Promise<any>;
export type RequestConfig = import('./Fetcher').RequestConfig;
export type Fetcher = import('./Fetcher').Fetcher;
export type Feedback = import('../data').Feedback;
export type SurveyFeedback = import('../data').SurveyFeedback;
export type EventAPISourceType = import('../data').EventAPISourceType;
