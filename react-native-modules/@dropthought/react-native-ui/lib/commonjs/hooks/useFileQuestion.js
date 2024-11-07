"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFileQuestion = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeDocumentPicker = _interopRequireWildcard(require("react-native-document-picker"));
var _reactNativeImageCropPicker = _interopRequireDefault(require("react-native-image-crop-picker"));
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
const useFileQuestion = (question, onFeedback, survey, feedback) => {
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
  const [invalidMessage, setInvalidMessage] = (0, _react.useState)();
  const [selectedFiles, setSelectedFiles] = _react.default.useState();
  const [actionSheetVisible, setActionSheetVisible] = (0, _react.useState)(false);
  const selectedFilesRef = (0, _react.useRef)();
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
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
      _reactNative.Alert.alert('', msg, [{
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
      const result = await _reactNativeDocumentPicker.default.pick({
        allowMultiSelection: allowMultipleFiles,
        type: [_reactNativeDocumentPicker.types.allFiles],
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
      const result = await _reactNativeImageCropPicker.default.openPicker({
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
exports.useFileQuestion = useFileQuestion;
//# sourceMappingURL=useFileQuestion.js.map