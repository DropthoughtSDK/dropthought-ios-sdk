import type { Question, Feedback } from '../data';
export declare const matrixRatingValidator: (question: Question, feedback: Feedback) => boolean;
declare const useMatrixRating: (question: Question, feedback: Feedback, onFeedback: (feedback: Feedback) => void) => {
    collapseList: boolean[];
    selectedAnswer: number[];
    handleMatrixRatingErrorHint: (forgot: boolean) => string | undefined;
    onRowPress: (rowIndex: number) => void;
    onColoumPress: (rowIndex: number, coloumIndex: number) => void;
};
export default useMatrixRating;
