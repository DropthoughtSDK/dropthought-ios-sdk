import React from 'react';
import type { Question, Feedback, ImageFileProps, Survey } from '../data';
declare type Props = {
    survey: Survey;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    onUpload: (file: ImageFileProps) => Promise<string | undefined>;
    isUploading: boolean;
    feedback?: Feedback;
    forgot: boolean;
    themeColor: string;
    preview: boolean;
};
declare const _default: React.MemoExoticComponent<({ survey, question, feedback, onFeedback, forgot, themeColor, onUpload, preview, }: Props) => JSX.Element>;
export default _default;
