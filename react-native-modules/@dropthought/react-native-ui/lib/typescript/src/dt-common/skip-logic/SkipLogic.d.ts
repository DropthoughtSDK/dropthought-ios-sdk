/**
 * @param {number} pageIndex
 * @param {Feedback[]} feedbacks
 * @param {Survey} survey
 * @return {number} return -1 means jump to end
 */
export function nextPage(pageIndex: number, feedbacks: Feedback[], survey: Survey): number;
/**
 * return undefined if not existed
 * @type {(pageIndex: number, survey: Survey) => (string|undefined)}
 */
export const getPageIdFromPageIndex: (pageIndex: number, survey: Survey) => (string | undefined);
/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */
export const getPageIndexFromPageId: (pageId: string, survey: Survey) => number;
export type Survey = import('../types/data').Survey;
export type Rule = import('../types/data').Rule;
export type Feedback = import('../types/data').Feedback;
export type IQAData = import('./IfcRule').IQAData;
