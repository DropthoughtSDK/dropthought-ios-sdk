export function nextPage(pageIndex: any, pageId: any, feedbacksMap: any, survey: any): any;
export type QuestionBrandType = 'other';
export namespace QuestionBrandType {
    const Other: string;
}
export type QuestionMetaDataType = 'Date' | 'Name' | 'Email' | 'Phone' | 'Number' | 'String';
export namespace QuestionMetaDataType {
    const Name: string;
    const Email: string;
    const Phone: string;
    const Number: string;
    const Date: string;
    const String: string;
}
export function getOptionsFromQuestion(question: any): any;
export function metaDataTypeQuestionValidator(question: any, value: any): boolean;
export function mandatoryQuestionValidator(question: any, feedback?: {}): any;
export function questionFeedbackValidator(question?: {}, feedback?: {}): any;
/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */
export const getPageIndexFromPageId: (pageId: string, survey: any) => number;
export type IQAData = import('./dt-common-lib/IfcRule').IQAData;
