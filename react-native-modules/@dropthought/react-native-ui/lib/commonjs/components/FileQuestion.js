"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireWildcard(require("../styles"));
var _FileQuestionItem = _interopRequireDefault(require("./FileQuestionItem"));
var _theme = require("../contexts/theme");
var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));
var _useFileQuestion = require("../hooks/useFileQuestion");
var _translation = _interopRequireDefault(require("../translation"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore

const FileQuestion = ({
  survey,
  onFeedback,
  feedback,
  onUpload,
  mandatoryErrorMessage,
  question,
  forgot,
  preview
}) => {
  const {
    hexCode,
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const {
    supportedFileTypes
  } = question;
  const {
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
  } = (0, _useFileQuestion.useFileQuestion)(question, onFeedback, survey, feedback);
  let selectedFileComponent = null;
  if (Array.isArray(selectedFilesRef.current)) {
    selectedFileComponent = selectedFilesRef.current.map(selectedFile => {
      return /*#__PURE__*/_react.default.createElement(_FileQuestionItem.default, {
        selectedFile: selectedFile,
        onRemoveFile: onRemoveFile,
        onError: msg => {
          setInvalidMessage(msg);
        },
        onUpload: onUpload,
        handleUploadFileSuccess: handleUploadFileSuccess,
        key: selectedFile.uri
      });
    });
  }
  const upoloadIconStyle = [styles.fileIcon, {
    tintColor: colorScheme === _theme.COLOR_SCHEMES.light ? hexCode : _styles.Colors.white
  }];
  const buttonContainerStyle = [styles.buttonContainer, {
    backgroundColor: (0, _styles.addOpacityToHex)(hexCode, 0.1),
    borderColor: hexCode
  }];
  const upperActionStyle = [styles.upperAction, {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.light ? _styles.Colors.lightActionBackground : _styles.Colors.rankingContainerBgDark,
    borderRadius: _reactNative.Platform.OS === 'android' ? 14 : 0
  }];
  const bottomActionStyle = [styles.bottomAction, {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.light ? _styles.Colors.lightActionBackground : _styles.Colors.rankingContainerBgDark
  }];
  const cancelActionStyle = [styles.cancelAction, {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.light ? _styles.Colors.white : _styles.Colors.rankingContainerBgDark
  }];
  const textStyle = [styles.actionText, {
    color: colorScheme === _theme.COLOR_SCHEMES.light ? _styles.Colors.lightActionText : _styles.Colors.darkActionText
  }];
  const actionSheet = /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    animationType: "fade",
    transparent: true,
    visible: actionSheetVisible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionModalContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actions
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: upperActionStyle,
    onPress: openFilePicker
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: textStyle
  }, _translation.default.t('file-upload:files'))), _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: bottomActionStyle,
    onPress: openPhotoLibrary
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: textStyle
  }, _translation.default.t('file-upload:photo'))) : null), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: cancelActionStyle,
    onPress: () => setActionSheetVisible(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.actionCancelText
  }, _translation.default.t('file-upload:cancel'))))));
  const fileUploadTextStyle = [styles.fileUploadText, {
    color: fontColor
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.mandatoryTitle,
    invalidMessage: invalidMessage
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, selectedFileComponent), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: _styles.default.flex1,
    disabled: preview,
    onPress: showChooseAlert
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: buttonContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: upoloadIconStyle
    // @ts-ignore
    ,
    source: require('../assets/ic-upload-file.png')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: fileUploadTextStyle
  }, `Click to choose file\n${survey.fileFormatErrorText} ${supportedFileTypes.join(', ')}`))), actionSheet);
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(FileQuestion);
const styles = _reactNative.StyleSheet.create({
  mandatoryTitle: {
    marginBottom: 24
  },
  container: {
    paddingHorizontal: 30,
    ..._styles.default.flex1
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12
  },
  fileIcon: {
    marginBottom: 8
  },
  fileUploadText: {
    textAlign: 'center',
    marginBottom: 8
  },
  actionModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 29,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  actionContainer: {
    width: '100%'
  },
  actionText: {
    fontSize: 20,
    fontWeight: '500',
    color: _styles.Colors.lightActionText
  },
  actionCancelText: {
    fontSize: 20,
    fontWeight: '600',
    color: _styles.Colors.defaultThemeColor
  },
  actions: {
    marginBottom: 16
  },
  upperAction: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17, 17, 17, 0.5)'
  },
  bottomAction: {
    height: 58,
    backgroundColor: _styles.Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14
  },
  cancelAction: {
    height: 58,
    backgroundColor: _styles.Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  }
});
//# sourceMappingURL=FileQuestion.js.map