import type { Question, QuestionType } from '../data';
export interface MatrixChoiceFeedback {
    questionId: string;
    answers: number[][];
    type: QuestionType;
    otherFlag?: boolean;
}
export declare const matrixChoiceValidator: (question: Question, feedback: MatrixChoiceFeedback) => boolean;
declare const useMatrixChoice: (question: Question, feedback: MatrixChoiceFeedback, onFeedback: (feedback: MatrixChoiceFeedback) => void) => {
    collapseList: boolean[];
    selectedAnswer: number[][];
    handleMatrixChoiceErrorHint: (forgot: boolean) => string | undefined;
    onRowPress: (rowIndex: number) => void;
    onColoumPress: (rowIndex: number, coloumIndex: number) => void;
};
export default useMatrixChoice;
//# sourceMappingURL=useMatrixChoice.d.ts.map