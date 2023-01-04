import React from 'react';
import type { Question as OriginQuestion, Feedback } from '../data';
declare type Question = OriginQuestion & {
    options: string[];
    otherText: string;
};
declare type Props = {
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    feedback: Feedback;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ anonymous, question, onFeedback, forgot, feedback, themeColor, }: Props) => JSX.Element>;
export default _default;
