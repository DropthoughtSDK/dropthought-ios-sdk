import React from 'react';
import type { Question, Feedback, Survey } from '../data';
type Props = {
    survey: Survey;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ survey, question, onFeedback, feedback, forgot, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=MultipleOpenEndedQuestion.d.ts.map