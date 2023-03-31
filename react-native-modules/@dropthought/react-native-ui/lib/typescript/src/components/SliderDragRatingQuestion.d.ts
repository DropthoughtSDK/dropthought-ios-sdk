import React from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion } from '../data';
declare type Feedback = OriginFeedback & {
    answers: string[];
};
declare type Question = OriginQuestion & {
    options: string[];
    scale: string;
    minScale: string;
    includeCenterLabel: boolean;
    includeCustomLabel: boolean;
};
declare type Props = {
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
declare const _default: React.MemoExoticComponent<({ question, onFeedback, feedback, forgot, themeColor, }: Props) => JSX.Element>;
export default _default;
