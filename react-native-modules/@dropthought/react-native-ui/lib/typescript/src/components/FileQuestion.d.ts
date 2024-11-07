import React from 'react';
import type { Question, Survey, Feedback } from '../data';
import type { onUploadType } from '../dt-common';
type Props = {
    survey: Survey;
    onFeedback: (feedback: Feedback) => void;
    feedback?: Feedback;
    onUpload: onUploadType;
    mandatoryErrorMessage: string;
    question: Question;
    forgot: boolean;
    preview: boolean;
};
declare const _default: React.MemoExoticComponent<({ survey, onFeedback, feedback, onUpload, mandatoryErrorMessage, question, forgot, preview, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=FileQuestion.d.ts.map