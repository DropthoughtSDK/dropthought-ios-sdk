/**
 * @param {number} pageIndex
 * @param {Feedback[]} feedbacks
 * @param {Survey} survey
 * @return {number} return -1 means jump to end
 */
export function nextPage(pageIndex: number, feedbacks: Feedback[], survey: any): number;
/**
 * return undefined if not existed
 * @type {(pageIndex: number, survey: Survey) => (string|undefined)}
 */
export const getPageIdFromPageIndex: (pageIndex: number, survey: any) => (string | undefined);
/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */
export const getPageIndexFromPageId: (pageId: string, survey: any) => number;
export type Survey = any;
export type Rule = any;
export type Feedback = any;
export type IQAData = import('./IfcRule').IQAData;
