import type { Question as OriginQuestion, Survey } from '../data';
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
};
declare const SmileyRatingQuestionOption6: ({ survey, pageIndex, question, forgot, onClose, onPrevPage, onNextPage, onFeedback, }: Props) => JSX.Element;
export default SmileyRatingQuestionOption6;
