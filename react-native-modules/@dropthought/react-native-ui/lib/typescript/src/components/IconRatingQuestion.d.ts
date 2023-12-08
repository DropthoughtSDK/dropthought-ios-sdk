import React from 'react';
import type { Feedback as OriginFeedback, Question, Survey } from '../data';
declare type Feedback = OriginFeedback & {
    answers: string[];
};
declare type Props = {
    survey: Survey;
    question: Question;
    onFeedback: ({ questionId, answers, type, }: {
        questionId: string;
        answers: number[];
        type: string;
    }) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ survey, question, feedback, forgot, onFeedback, }: Props) => JSX.Element>;
export default _default;
