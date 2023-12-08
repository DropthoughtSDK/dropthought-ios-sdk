import React from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion, Survey } from '../data';
declare type Question = OriginQuestion & {
    options: string[];
    otherText: string;
};
declare type Feedback = OriginFeedback & {
    answers: (string | number)[];
};
declare type Props = {
    survey: Survey;
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    feedback: Feedback;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ survey, anonymous, question, onFeedback, forgot, feedback, themeColor, }: Props) => JSX.Element>;
export default _default;
