import React from 'react';
import type { Question, Feedback } from '../data';
declare type Props = {
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ question, onFeedback, feedback, forgot, themeColor, }: Props) => JSX.Element>;
export default _default;
