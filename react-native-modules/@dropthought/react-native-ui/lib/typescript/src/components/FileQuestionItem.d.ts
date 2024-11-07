import React from 'react';
import type { UploadedFile, UploadFileResult } from '../hooks/useFileQuestion';
import type { onUploadType } from '../dt-common';
type Props = {
    selectedFile: UploadedFile;
    onRemoveFile: (name: string) => void;
    onError: (msg: string) => void;
    onUpload: onUploadType;
    handleUploadFileSuccess: (file: UploadedFile, data: UploadFileResult) => void;
};
declare const _default: React.MemoExoticComponent<({ selectedFile, onRemoveFile, onError, onUpload, handleUploadFileSuccess, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=FileQuestionItem.d.ts.map