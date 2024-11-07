import { useState, useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
// @ts-ignore
import type { onUploadType } from '../dt-common';
import type { UploadedFile, UploadFileResult } from './useFileQuestion';

export type UseFileQuestionItemType = {
  selectedFile: UploadedFile;
  onUpload: onUploadType;
  onError: (msg: string) => void;
  handleUploadFileSuccess: (file: UploadedFile, data: UploadFileResult) => void;
};

export const useFileQuestionItem = ({
  selectedFile,
  onUpload,
  onError,
  handleUploadFileSuccess,
}: UseFileQuestionItemType) => {
  const { name = '', size, uri, type, file, base64 } = selectedFile || {};
  const isSuccessUpload = file.length > 0;
  const [progress, setProgress] = useState(0);
  const handleUploadFile = useCallback(async () => {
    if (uri && name && type && !isSuccessUpload && selectedFile) {
      const uploadedFile = base64
        ? { uri, name, type, base64 }
        : { uri, name, type };
      try {
        const url = await onUpload(uploadedFile, 'file', {
          //@ts-ignore
          onUploadProgress: (ev) => {
            if (ev.total) {
              setProgress(Math.round((ev.loaded * 100) / ev.total));
            } else {
              setProgress(0);
            }
          },
        });
        if (url && size) {
          const uploadFileResult = {
            sizeInMB: size / (1024 * 1024),
            success: true,
            url: url,
          };
          handleUploadFileSuccess(selectedFile, uploadFileResult);
        }
      } catch (err) {
        console.error(err);
        //@ts-ignore
        onError('The file upload failed', err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  useEffect(() => {
    handleUploadFile();
  }, [handleUploadFile, selectedFile]);

  // bar animation
  const widthAnim = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];
  const animatedWidth = widthAnim.interpolate({ inputRange, outputRange });
  Animated.timing(widthAnim, {
    toValue: progress,
    useNativeDriver: false,
  }).start();
  return {
    isSuccessUpload,
    animatedWidth,
    progress,
  };
};

export default useFileQuestionItem;
