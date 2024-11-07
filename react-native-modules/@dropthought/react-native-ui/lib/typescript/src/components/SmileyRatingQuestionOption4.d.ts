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
    feedback: Feedback;
    isLastPage: boolean;
};
declare const SmileyRatingQuestionOption4: ({ survey, pageIndex, question, forgot, onClose, onPrevPage, onNextPage, onFeedback, feedback, isLastPage, }: Props) => React.JSX.Element;
export default SmileyRatingQuestionOption4;
//# sourceMappingURL=SmileyRatingQuestionOption4.d.ts.map