export function matrixChoiceValidator(question: any, feedback: any): any;
export default useMatrixChoice;
declare function useMatrixChoice(question: any, feedback: any, onFeedback: any): {
    collapseList: any[];
    selectedAnswer: any;
    handleMatrixChoiceErrorHint: (forgot: any) => string | undefined;
    onRowPress: (rowIndex: any) => void;
    onColoumPress: (rowIndex: any, coloumIndex: any) => void;
};
