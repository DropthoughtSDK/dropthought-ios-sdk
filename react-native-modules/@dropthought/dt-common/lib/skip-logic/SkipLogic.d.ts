export function nextPage(pageIndex: number, feedbacks: Feedback[], survey: Survey): number;
export const getPageIdFromPageIndex: (pageIndex: number, survey: Survey) => (string | undefined);
export const getPageIndexFromPageId: (pageId: string, survey: Survey) => number;
export type Survey = import('../types/data').Survey;
export type Rule = import('../types/data').Rule;
export type Feedback = import('../types/data').Feedback;
export type IQAData = import('./IfcRule').IQAData;
