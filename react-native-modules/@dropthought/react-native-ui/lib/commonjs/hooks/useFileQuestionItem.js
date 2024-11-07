"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFileQuestionItem = exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
// @ts-ignore

const useFileQuestionItem = ({
  selectedFile,
  onUpload,
  onError,
  handleUploadFileSuccess
}) => {
  const {
    name = '',
    size,
    uri,
    type,
    file,
    base64
  } = selectedFile || {};
  const isSuccessUpload = file.length > 0;
  const [progress, setProgress] = (0, _react.useState)(0);
  const handleUploadFile = (0, _react.useCallback)(async () => {
    if (uri && name && type && !isSuccessUpload && selectedFile) {
      const uploadedFile = base64 ? {
        uri,
        name,
        type,
        base64
      } : {
        uri,
        name,
        type
      };
      try {
        const url = await onUpload(uploadedFile, 'file', {
          //@ts-ignore
          onUploadProgress: ev => {
            if (ev.total) {
              setProgress(Math.round(ev.loaded * 100 / ev.total));
            } else {
              setProgress(0);
            }
          }
        });
        if (url && size) {
          const uploadFileResult = {
            sizeInMB: size / (1024 * 1024),
            success: true,
            url: url
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
  (0, _react.useEffect)(() => {
    handleUploadFile();
  }, [handleUploadFile, selectedFile]);

  // bar animation
  const widthAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];
  const animatedWidth = widthAnim.interpolate({
    inputRange,
    outputRange
  });
  _reactNative.Animated.timing(widthAnim, {
    toValue: progress,
    useNativeDriver: false
  }).start();
  return {
    isSuccessUpload,
    animatedWidth,
    progress
  };
};
exports.useFileQuestionItem = useFileQuestionItem;
var _default = exports.default = useFileQuestionItem;
//# sourceMappingURL=useFileQuestionItem.js.map