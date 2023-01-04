/// <reference types="ts-toolbelt" />
import type { Feedback, Question, Option, Survey } from '../data';
/** @enum {'other'} */
export declare const QuestionBrandType: {
    Other: string;
};
/** @enum {'Date'|'Name'|'Email'|'Phone'|'Number'|'String'} */
export declare const QuestionMetaDataType: {
    Name: string;
    Email: string;
    Phone: string;
    Number: string;
    Date: string;
    String: string;
};
/**
 * given a Question type, return ['option label1', 'option label2', 'option label3', true]
 * if the type is boolean at the last, it means it is an "other" option
 */
export declare const getOptionsFromQuestion: (question: Question) => Option[];
/**
 * validate if value match metaDataType question' rule
 */
export declare const metaDataTypeQuestionValidator: (question: Question, value: string) => boolean;
/**
 * if mandatory question has feedback
 */
export declare const mandatoryQuestionValidator: (question: Question, feedback?: Feedback | {}) => boolean;
/**
 * validate if question's feedback is valid:
 * metadata type value check, mandatory check
 */
export declare const questionFeedbackValidator: (question?: Question | {}, feedback?: Feedback | {}) => boolean;
/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */
export declare const getPageIndexFromPageId: import("Function/Curry").Curry<(pageId: string, survey: Survey) => number>;
export declare function nextPage(pageIndex: number, pageId: string, feedbacksMap: {
    [questionId: string]: Feedback;
}, survey: Survey): number;
export declare const scaleLogic: {
    [name in string]: number[];
};
export declare const option3LoopFaceTable: Map<string, any>;
export declare const option3TransformTable: Map<string, any>;
export declare const option4LoopFaceTable: Map<string, any>;
export declare const option4TransformTable: Map<string, any>;
/** @typedef {import('./dt-common-lib/IfcRule').IQAData} IQAData */
