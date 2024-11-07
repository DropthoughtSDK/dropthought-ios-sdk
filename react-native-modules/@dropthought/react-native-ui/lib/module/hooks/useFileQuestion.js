import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { useTheme } from '../contexts/theme';
const MAX_SIZE_MB = 16;
const MAX_FILE_COUNT = 10;
const getCurrentTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return timestamp;
};
const mergeArrays = (previous, current, uniqueProperty) => {
  const uniqueValues = new Map();

  // Add values from previous to the map
  previous.forEach(obj => {
    const key = obj[uniqueProperty];
    uniqueValues.set(key, obj);
  });

  // Add values from current to the map (skip if the key already exists)
  current.forEach(obj => {
    const key = obj[uniqueProperty];
    if (!uniqueValues.has(key)) {
      uniqueValues.set(key, obj);
    }
  });

  // Convert the map values back to an array
  const mergedArray = Array.from(uniqueValues.values());
  return mergedArray;
};
export const useFileQuestion = (question, onFeedback, survey, feedback) => {
  const {
    uploadSizeErrorMessage,
    uploadMaxFilesErrorMessage,
    pleaseUploadText,
    fileFormatsOnlyText
  } = survey;
  const {
    questionId,
    allowMultipleFiles,
    supportedFileTypes
  } = question;
  const [invalidMessage, setInvalidMessage] = useState();
  const [selectedFiles, setSelectedFiles] = React.useState();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const selectedFilesRef = useRef();
  const {
    colorScheme
  } = useTheme();
  useEffect(() => {
    const answers = selectedFiles === null || selectedFiles === void 0 ? void 0 : selectedFiles.map(file => {
      return {
        ...file,
        base64: undefined
      };
    });
    const result = {
      questionId,
      answers,
      type: 'file'
    };
    // @ts-ignore
    onFeedback(result);
  }, [onFeedback, questionId, selectedFiles]);
  useEffect(() => {
    if (!selectedFiles && feedback) {
      // @ts-ignore
      selectedFilesRef.current = feedback.answers;
      // @ts-ignore
      setSelectedFiles(feedback.answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleUploadFileSuccess = (file, data) => {
    const uploadedFile = {
      ...file,
      file: data.url,
      sizeFixed: `${data.sizeInMB}`
    };
    if (Array.isArray(selectedFilesRef.current)) {
      // @ts-ignore
      selectedFilesRef.current = selectedFilesRef.current.map(preSelectedFile => {
        if (preSelectedFile.name === file.name) {
          return uploadedFile;
        } else {
          return preSelectedFile;
        }
      });
    }
    setSelectedFiles(preSelectedFiles => {
      if (Array.isArray(preSelectedFiles)) {
        return preSelectedFiles.map(preSelectedFile => {
          if (preSelectedFile.name === file.name) {
            return uploadedFile;
          } else {
            return preSelectedFile;
          }
        });
      }
      return preSelectedFiles;
    });
  };
  const onRemoveFile = name => {
    if (Array.isArray(selectedFilesRef.current)) {
      // @ts-ignore
      selectedFilesRef.current = selectedFilesRef.current.filter(({
        name: preName
      }) => name !== preName);
    }
    setSelectedFiles(preSelectedFiles => {
      if (Array.isArray(preSelectedFiles)) {
        return preSelectedFiles.filter(({
          name: preName
        }) => name !== preName);
      }
      return preSelectedFiles;
    });
  };
  const uploadConditionValidator = uploadedFiles => {
    const files = Array.isArray(selectedFilesRef.current) && allowMultipleFiles ? mergeArrays(selectedFilesRef.current, uploadedFiles, 'uri') : uploadedFiles;
    const isOverSize = uploadedFiles.some(file => (file.size || 0) > MAX_SIZE_MB);
    const isOvercount = files.length > MAX_FILE_COUNT;
    const isSupportType = files.every(file => {
      var _name$split$pop;
      const {
        name
      } = file;
      const extension = '.' + ((_name$split$pop = name.split('.').pop()) === null || _name$split$pop === void 0 ? void 0 : _name$split$pop.toLowerCase());
      return supportedFileTypes.includes(extension);
    });
    const popupAlert = msg => {
      Alert.alert('', msg, [{
        text: 'Okay',
        style: 'cancel'
      }], {
        userInterfaceStyle: colorScheme
      });
    };
    if (!isSupportType) {
      popupAlert(`${pleaseUploadText} ${supportedFileTypes} ${fileFormatsOnlyText}`);
      return;
    } else if (isOverSize) {
      popupAlert(uploadSizeErrorMessage);
      return;
    } else if (isOvercount) {
      popupAlert(uploadMaxFilesErrorMessage);
      return;
    }
    const supportedFiles = files.filter(file => {
      var _name$split$pop2;
      const {
        name
      } = file;
      const extension = '.' + ((_name$split$pop2 = name.split('.').pop()) === null || _name$split$pop2 === void 0 ? void 0 : _name$split$pop2.toLowerCase());
      return supportedFileTypes.includes(extension);
    });
    selectedFilesRef.current = supportedFiles;
    setSelectedFiles(supportedFiles);
  };
  const uploadFile = pickerResult => {
    const formatResult = pickerResult.map(file => ({
      uri: file.uri,
      type: file.type || '',
      //feeback answer payload
      file: '',
      fileType: file.type || '',
      name: file.name || '',
      size: (file.size || 0) / (1024 * 1024),
      sizeFixed: '0',
      timestamp: getCurrentTimestamp()
    }));
    uploadConditionValidator(formatResult);
  };
  const openFilePicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        allowMultiSelection: allowMultipleFiles,
        type: [types.allFiles],
        presentationStyle: undefined
      });
      setActionSheetVisible(false);
      uploadFile(result);
    } catch {
      setActionSheetVisible(false);
    }
  };
  const uploadPicture = images => {
    if (images.length > 0) {
      const formatResult = images.map(image => ({
        uri: image.sourceURL || 'uri',
        type: image.mime || 'type',
        //feeback answer payload
        file: '',
        fileType: image.mime || 'fileType',
        name: image.filename || 'name',
        size: (image.size || 0) / (1024 * 1024),
        sizeFixed: '0',
        timestamp: getCurrentTimestamp(),
        base64: image.data ?? ''
      }));
      uploadConditionValidator(formatResult);
    }
  };
  const openPhotoLibrary = async () => {
    try {
      const result = await ImagePicker.openPicker({
        maxFiles: allowMultipleFiles ? 10 : 1,
        multiple: true,
        mediaType: 'any',
        includeBase64: true
      });
      setActionSheetVisible(false);
      uploadPicture(result);
    } catch {
      setActionSheetVisible(false);
    }
  };
  const showChooseAlert = () => {
    setActionSheetVisible(true);
  };
  return {
    showChooseAlert,
    onRemoveFile,
    handleUploadFileSuccess,
    selectedFilesRef,
    invalidMessage,
    setInvalidMessage,
    openFilePicker,
    openPhotoLibrary,
    actionSheetVisible,
    setActionSheetVisible
  };
};
//# sourceMappingURL=useFileQuestion.js.map