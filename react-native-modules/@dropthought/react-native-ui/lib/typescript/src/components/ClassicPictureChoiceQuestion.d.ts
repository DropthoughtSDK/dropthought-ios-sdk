import React from 'react';
import type { Question, Feedback } from '../data';
import type { onUploadType } from '../dt-common';
type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback?: Feedback;
    onUpload: onUploadType;
    isUploading: boolean;
    forgot: boolean;
    themeColor: string;
    preview: boolean;
};
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, feedback, onFeedback, forgot, themeColor, onUpload, preview, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=ClassicPictureChoiceQuestion.d.ts.map