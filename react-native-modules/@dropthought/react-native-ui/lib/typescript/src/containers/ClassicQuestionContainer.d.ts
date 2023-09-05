import type { Question, Feedback } from '../data';
declare type Props = {
    anonymous: boolean;
    question: Question;
    validationStarted: boolean;
    themeColor: string;
    onFeedback?: (feedback: Feedback) => void;
    onDragGrant: () => void;
    onDragEnd: () => void;
};
declare const ClassicQuestionContainer: (props: Props) => JSX.Element;
export default ClassicQuestionContainer;
