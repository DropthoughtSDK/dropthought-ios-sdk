import type { Feedback as OriginFeedback, Question as OriginQuestion, Survey } from '../data';
declare type Feedback = OriginFeedback & {
    answers: string[];
};
declare type Question = OriginQuestion & {
    options: string[];
    scale: string;
};
declare type Props = {
    survey: Survey;
    pageIndex: number;
    forgot: boolean;
    onClose: () => void;
    question: Question;
    onPrevPage: () => void;
    onNextPage: () => void;
    onFeedback: ({ questionId, answers, type, }: {
        questionId: string;
        answers: number[];
        type: string;
    }) => void;
    feedback: Feedback;
};
declare const SmileyRatingQuestionOption6: ({ survey, pageIndex, question, forgot, onClose, onPrevPage, onNextPage, onFeedback, feedback, }: Props) => JSX.Element;
export default SmileyRatingQuestionOption6;
