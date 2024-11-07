import React from 'react';
import type { Question, Feedback, Survey } from '../data';
import type { onUploadType } from '../dt-common';
type Props = {
    survey: Survey;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    onUpload: onUploadType;
    isUploading: boolean;
    feedback?: Feedback;
    forgot: boolean;
    themeColor: string;
    preview: boolean;
};
declare const _default: React.MemoExoticComponent<({ survey, question, feedback, onFeedback, forgot, themeColor, onUpload, preview, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=PictureChoiceQuestion.d.ts.map