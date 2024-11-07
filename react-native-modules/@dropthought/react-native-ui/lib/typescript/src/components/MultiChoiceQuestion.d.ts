import React from 'react';
import type { Question as OriginQuestion, Feedback, Survey } from '../data';
type Question = OriginQuestion & {
    options: string[];
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
//# sourceMappingURL=MultiChoiceQuestion.d.ts.map