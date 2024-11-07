import React from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion, Survey } from '../data';
type Question = OriginQuestion & {
    options: string[];
    otherText: string;
};
type Feedback = OriginFeedback & {
    answers: (string | number)[];
};
type Props = {
    survey: Survey;
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    feedback: Feedback;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ survey, anonymous, question, onFeedback, forgot, feedback, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=SingleChoiceQuestion.d.ts.map