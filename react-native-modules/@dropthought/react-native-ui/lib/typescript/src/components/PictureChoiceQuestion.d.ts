import React from 'react';
import type { Question, Feedback, ImageFileProps } from '../data';
declare type Props = {
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    onUpload: (file: ImageFileProps) => Promise<string | undefined>;
    isUploading: boolean;
    feedback?: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ question, feedback, onFeedback, forgot, themeColor, onUpload, isUploading, }: Props) => JSX.Element>;
export default _default;
