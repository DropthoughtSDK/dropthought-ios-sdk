import React from 'react';
import type { Question, Feedback } from '../data';
type Props = {
    mandatoryErrorMessage: string;
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, onFeedback, feedback, forgot, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=ClassicDropdownQuestion.d.ts.map