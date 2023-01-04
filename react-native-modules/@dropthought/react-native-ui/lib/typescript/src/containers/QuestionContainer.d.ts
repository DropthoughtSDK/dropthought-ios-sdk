import type { Question, Feedback, Survey } from '../data';
declare type Props = {
    anonymous: boolean;
    question: Question;
    validationStarted: boolean;
    themeColor: string;
    onClose: () => void;
    onPrevPage: () => void;
    onNextPage: () => void;
    onFeedback?: (feedback: Feedback) => void;
    survey: Survey;
    pageIndex: number;
};
declare const QuestionContainer: (props: Props) => JSX.Element;
export default QuestionContainer;
