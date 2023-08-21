/// <reference types="react" />
import type { Question, Feedback, QuestionMetaDataType } from '../data';
export declare type QuestionRowItem = {
    questionId: string;
    questionTitle?: string;
    responseErrorText?: string;
    metaDataType?: QuestionMetaDataType;
    exampleMetadataText?: string;
    scale: number;
    phiData: boolean;
};
export declare const multipleOpenEndedValidator: (question: Question, feedback: Feedback) => boolean;
declare const useMultipleOpenEnded: (question: Question, feedback: Feedback, onFeedback: (feedback: Feedback) => void) => {
    questionRows: QuestionRowItem[];
    selectedAnswerState: [string[], import("react").Dispatch<import("react").SetStateAction<string[]>>];
    handleErrorHint: (forgot: boolean) => string | undefined;
    updateFeedback: (answers: string[]) => void;
};
export default useMultipleOpenEnded;
