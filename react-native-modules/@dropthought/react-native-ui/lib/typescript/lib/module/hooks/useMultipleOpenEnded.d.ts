export function multipleOpenEndedValidator(question: any, feedback: any): any;
export default useMultipleOpenEnded;
declare function useMultipleOpenEnded(question: any, feedback: any, onFeedback: any): {
    questionRows: any;
    selectedAnswerState: [any, import("react").Dispatch<any>];
    handleErrorHint: (forgot: any) => string | undefined;
    updateFeedback: (answers: any) => void;
};
