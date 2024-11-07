import React from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion, Survey } from '../data';
type Feedback = OriginFeedback & {
    answers: string[];
};
type Question = OriginQuestion & {
    options: string[];
    scale: string;
};
type Props = {
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
    isLastPage: boolean;
};
declare const SmileyRatingQuestionOption6: ({ survey, pageIndex, question, forgot, onClose, onPrevPage, onNextPage, onFeedback, feedback, isLastPage, }: Props) => React.JSX.Element;
export default SmileyRatingQuestionOption6;
//# sourceMappingURL=SmileyRatingQuestionOption6.d.ts.map