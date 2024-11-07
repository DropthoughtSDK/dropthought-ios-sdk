import React from 'react';
import type { Question, Survey } from '../data';
import type { MatrixChoiceFeedback } from '../hooks/useMatrixChoice';
type Props = {
    survey: Survey;
    question: Question;
    onFeedback: (feedback: MatrixChoiceFeedback) => void;
    feedback: MatrixChoiceFeedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ survey, question, onFeedback, feedback, forgot, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=MatrixChoiceQuestion.d.ts.map