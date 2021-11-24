/// <reference types="ts-toolbelt" />
export var __esModule: boolean;
export type QuestionBrandType = 'Date' | 'Name' | 'Email' | 'Phone' | 'Number' | 'String';
export type IQAData = import('./dt-common-lib/IfcRule').IQAData;
export function nextPage(pageIndex: any, pageId: any, feedbacksMap: any, survey: any): any;
export type QuestionBrandType = 'other';
export namespace QuestionBrandType {
    const Other: string;
}
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
export const getPageIndexFromPageId: import("Function/Curry").Curry<(pageId: any, survey: any) => number>;
