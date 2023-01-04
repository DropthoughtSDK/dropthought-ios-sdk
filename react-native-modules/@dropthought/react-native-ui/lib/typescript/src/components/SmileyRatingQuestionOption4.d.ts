import type { Question as OriginQuestion, Survey } from '../data';
declare type Question = OriginQuestion & {
    options: string[];
    scale: string;
};
declare type Props = {
    survey: Survey;
    pageIndex: number;
    question: Question;
    forgot: boolean;
    onClose: () => void;
    onPrevPage: () => void;
    onNextPage: () => void;
    onFeedback: ({ questionId, answers, type, }: {
        questionId: string;
        answers: number[];
        type: string;
    }) => void;
};
declare const SmileyRatingQuestionOption4: ({ survey, pageIndex, question, forgot, onClose, onPrevPage, onNextPage, onFeedback, }: Props) => JSX.Element;
export default SmileyRatingQuestionOption4;
