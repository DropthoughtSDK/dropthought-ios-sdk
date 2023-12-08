import React from 'react';
import type { Question, Feedback, ImageFileProps } from '../data';
declare type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback?: Feedback;
    onUpload: (file: ImageFileProps) => Promise<string | undefined>;
    isUploading: boolean;
    forgot: boolean;
    themeColor: string;
    preview: boolean;
};
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, feedback, onFeedback, forgot, themeColor, onUpload, preview, }: Props) => JSX.Element>;
export default _default;
