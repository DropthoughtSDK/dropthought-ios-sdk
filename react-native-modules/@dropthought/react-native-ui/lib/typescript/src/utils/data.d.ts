import type { Feedback, Question, RequiredType, QuestionMetaDataType as DataQuestionMetaDataType } from '../data';
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
export declare type TransformOptionType = {
    isOther: boolean;
    title: string;
    placeholder: string;
    index: number;
};
/**
 * given a Question type, return ['option label1', 'option label2', 'option label3', true]
 * if the type is boolean at the last, it means it is an "other" option
 */
export declare const getOptionsFromQuestion: (question: Question) => TransformOptionType[];
/**
 * validate if value match metaDataType question' rule
 */
export declare const metaDataFormatValidator: (value: string, metaDataType?: DataQuestionMetaDataType | undefined) => boolean;
/**
 * if mandatory question has feedback
 */
export declare const mandatoryQuestionValidator: (question: Question, feedback?: Feedback | {}) => boolean;
export declare const getRequiredType: (question: Question) => RequiredType;
/**
 * validate if question's feedback is valid:
 * metadata type value check, mandatory check
 */
export declare const questionFeedbackValidator: (question: Question, feedback: Feedback) => boolean;
export declare const scaleLogic: {
    [name in string]: number[];
};
export declare const option4FaceTable: string[];
export declare const option3LoopFaceTable: Map<string, any>;
export declare const option4LoopFaceTable: Map<string, any>;
export declare const option4TransformTable: Map<string, any>;
