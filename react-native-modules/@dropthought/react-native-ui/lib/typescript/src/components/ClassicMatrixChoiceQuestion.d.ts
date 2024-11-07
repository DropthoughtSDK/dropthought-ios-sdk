import React from 'react';
import type { Question } from '../data';
import type { MatrixChoiceFeedback } from '../hooks/useMatrixChoice';
type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    onFeedback: (feedback: MatrixChoiceFeedback) => void;
    feedback: MatrixChoiceFeedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, onFeedback, feedback, forgot, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=ClassicMatrixChoiceQuestion.d.ts.map