import type { Question, Feedback } from '../data';
declare type Props = {
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const OpenQuestion: ({ anonymous, question, onFeedback, feedback, forgot, themeColor, }: Props) => JSX.Element;
export default OpenQuestion;
