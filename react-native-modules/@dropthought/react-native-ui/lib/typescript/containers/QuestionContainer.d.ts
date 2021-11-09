import type { Question, Feedback } from '../data';
declare type Props = {
    anonymous: boolean;
    question: Question;
    validationStarted: boolean;
    themeColor: string;
    onFeedback?: (feedback: Feedback) => void;
};
declare const QuestionContainer: (props: Props) => JSX.Element;
export default QuestionContainer;
