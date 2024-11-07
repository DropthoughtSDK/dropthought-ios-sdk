import React from 'react';
import type { Question, Feedback, Survey } from '../data';
export interface UploadFileResult {
    sizeInMB: number;
    success: boolean;
    url: string;
}
export interface UploadedFile {
    file: string;
    uri: string;
    type: string;
    size: number;
    sizeFixed: string;
    timestamp: string;
    name: string;
    fileType: string;
    base64?: string;
}
export declare const useFileQuestion: (question: Question, onFeedback: (feedback: Feedback) => void, survey: Survey, feedback?: Feedback) => {
    showChooseAlert: () => void;
    onRemoveFile: (name: string) => void;
    handleUploadFileSuccess: (file: UploadedFile, data: UploadFileResult) => void;
    selectedFilesRef: React.MutableRefObject<UploadedFile[] | undefined>;
    invalidMessage: string | undefined;
    setInvalidMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
    openFilePicker: () => Promise<void>;
    openPhotoLibrary: () => Promise<void>;
    actionSheetVisible: boolean;
    setActionSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
//# sourceMappingURL=useFileQuestion.d.ts.map