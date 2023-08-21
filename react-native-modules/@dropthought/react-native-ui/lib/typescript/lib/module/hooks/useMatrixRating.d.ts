export function matrixRatingValidator(question: any, feedback: any): any;
export default useMatrixRating;
declare function useMatrixRating(question: any, feedback: any, onFeedback: any): {
    collapseList: any[];
    selectedAnswer: any;
    handleMatrixRatingErrorHint: (forgot: any) => string | undefined;
    onRowPress: (rowIndex: any) => void;
    onColoumPress: (rowIndex: any, coloumIndex: any) => void;
};
