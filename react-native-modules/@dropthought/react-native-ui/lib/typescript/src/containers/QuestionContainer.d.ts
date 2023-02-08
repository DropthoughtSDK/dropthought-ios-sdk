import type { Question, Feedback, Survey } from '../data';
import type { THEME_OPTION } from '../contexts/theme';
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
    themeOption: THEME_OPTION;
};
declare const QuestionContainer: (props: Props) => JSX.Element;
export default QuestionContainer;
