"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireWildcard(require("../styles"));
var _theme = require("../contexts/theme");
var _FileIcon = _interopRequireDefault(require("../components/FileIcon"));
var _useFileQuestionItem = _interopRequireDefault(require("../hooks/useFileQuestionItem"));
var _translation = _interopRequireDefault(require("../translation"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore

const FileQuestionItem = ({
  selectedFile,
  onRemoveFile,
  onError,
  onUpload,
  handleUploadFileSuccess
}) => {
  const {
    hexCode,
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const rtl = _translation.default.dir() === 'rtl';
  const {
    name = '',
    size
  } = selectedFile || {};
  const isLightMode = colorScheme === _theme.COLOR_SCHEMES.light;
  const {
    isSuccessUpload,
    animatedWidth,
    progress
  } = (0, _useFileQuestionItem.default)({
    selectedFile,
    onError,
    onUpload,
    handleUploadFileSuccess
  });
  const fileItemStyle = [styles.fileItem, {
    borderColor: isLightMode ? (0, _styles.addOpacityToHex)(hexCode, 0.3) : '#39393a',
    backgroundColor: isLightMode ? (0, _styles.addOpacityToHex)(hexCode, 0.03) : '#39393a'
  }];
  const progressBarStyle = [styles.progressBar, {
    width: isSuccessUpload ? '100%' : animatedWidth,
    backgroundColor: (0, _styles.addOpacityToHex)(hexCode, isLightMode ? 0.1 : 1),
    right: rtl ? 0 : undefined
  }];
  const fileNameTextStyle = [styles.fileNameText, rtl && _styles.default.textAlignRight, {
    color: fontColor
  }];
  const fileSizeTextStyle = [styles.fileSizeText, {
    color: fontColor
  }];
  const formatSize = size >= 1 ? `${parseFloat(size.toFixed(1))}MB` : `${parseFloat(size.toFixed(3)) * 1000}KB`;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: fileItemStyle
  }, isSuccessUpload ? null : /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    // @ts-ignore
    style: progressBarStyle
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.fileItemContent, rtl && _styles.default.flexRowReverse]
  }, /*#__PURE__*/_react.default.createElement(_FileIcon.default, {
    fileName: name
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/file_upload_file_name",
    style: fileNameTextStyle,
    numberOfLines: 1
  }, name), isSuccessUpload ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/file_upload_file_size",
    style: fileSizeTextStyle
  }, typeof size === 'number' ? formatSize : 'null') : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: fileSizeTextStyle
  }, `${progress}%`), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: "test:id/icon_remove_uploaded_file",
    style: styles.closeButton,
    onPress: () => onRemoveFile(name)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.closeIcon
    // @ts-ignore
    ,
    source: require('../assets/icClose24Px.png')
  }))));
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(FileQuestionItem);
const styles = _reactNative.StyleSheet.create({
  fileItem: {
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1
  },
  fileItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingLeft: 4,
    paddingRight: 8
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  fileNameText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    marginRight: 5
  },
  fileSizeText: {
    fontSize: 15,
    fontWeight: '700'
  },
  closeButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIcon: {
    tintColor: _styles.Colors.sliderLabel,
    width: 12,
    height: 12
  }
});
//# sourceMappingURL=FileQuestionItem.js.map