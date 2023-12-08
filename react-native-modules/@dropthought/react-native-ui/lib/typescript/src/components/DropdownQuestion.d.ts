import React from 'react';
import type { Question, Feedback, Survey } from '../data';
declare type Props = {
    survey: Survey;
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ survey, question, onFeedback, feedback, forgot, themeColor, }: Props) => JSX.Element>;
export default _default;
