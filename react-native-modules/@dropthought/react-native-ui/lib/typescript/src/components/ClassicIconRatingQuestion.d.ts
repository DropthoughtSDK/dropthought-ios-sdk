import React from 'react';
import type { Feedback as OriginFeedback, Question } from '../data';
declare type Feedback = OriginFeedback & {
    answers: string[];
};
declare type Props = {
    mandatoryErrorMessage: string;
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
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, feedback, forgot, onFeedback, }: Props) => JSX.Element>;
export default _default;
