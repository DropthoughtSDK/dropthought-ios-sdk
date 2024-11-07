import { Animated } from 'react-native';
import type { onUploadType } from '../dt-common';
import type { UploadedFile, UploadFileResult } from './useFileQuestion';
export type UseFileQuestionItemType = {
    selectedFile: UploadedFile;
    onUpload: onUploadType;
    onError: (msg: string) => void;
    handleUploadFileSuccess: (file: UploadedFile, data: UploadFileResult) => void;
};
export declare const useFileQuestionItem: ({ selectedFile, onUpload, onError, handleUploadFileSuccess, }: UseFileQuestionItemType) => {
    isSuccessUpload: boolean;
    animatedWidth: Animated.AnimatedInterpolation<string | number>;
    progress: number;
};
export default useFileQuestionItem;
//# sourceMappingURL=useFileQuestionItem.d.ts.map