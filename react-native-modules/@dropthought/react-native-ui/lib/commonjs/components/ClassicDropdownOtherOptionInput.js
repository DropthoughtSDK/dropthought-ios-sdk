"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = _interopRequireWildcard(require("../styles"));

var _translation = _interopRequireDefault(require("../translation"));

var _ClassicOpenQuestion = require("./ClassicOpenQuestion");

var _MetadataDesc = _interopRequireDefault(require("./MetadataDesc"));

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useFocus = (onBlur, onFocus) => {
  const [isFocused, setIsFocused] = _react.default.useState(false);

  const onFocusHandler = _react.default.useCallback(() => {
    onFocus && onFocus();
    setIsFocused(true);
  }, [onFocus]);

  const onBlurHandler = _react.default.useCallback(() => {
    onBlur && onBlur();
    setIsFocused(false);
  }, [onBlur]);

  return {
    isFocused,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler
  };
};

const ClassicDropdownOtherOptionInput = ({
  visible,
  question,
  placeholder,
  value,
  onChangeText,
  themeColor
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const inputRef = (0, _react.useRef)(null);
  const {
    fontColor
  } = (0, _theme.useTheme)();

  const onFocusHandler = () => {};

  const onBlurHandler = () => {};

  const {
    isFocused,
    ...focusProps
  } = useFocus(onBlurHandler, onFocusHandler);
  const inputTextBorderStyle = isFocused ? {
    borderColor: themeColor
  } : undefined;
  const inputTextColorStyle = {
    color: fontColor
  };
  if (!visible) return null;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MetadataDesc.default, {
    question: question,
    rtl: rtl
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.textInputContainer, rtl && _styles.default.flexRowReverse]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    ref: inputRef,
    style: [styles.textInput, rtl && _styles.default.textAlignRight, inputTextBorderStyle, inputTextColorStyle],
    placeholder: placeholder,
    placeholderTextColor: _styles.Colors.inputPlaceholder,
    multiline: true,
    onChangeText: onChangeText,
    underlineColorAndroid: _styles.Colors.transparent,
    selectionColor: themeColor,
    value: value,
    maxLength: 100,
    keyboardType: (0, _ClassicOpenQuestion.metadataTypeKeyboard)(question.metaDataType),
    autoCapitalize: (0, _ClassicOpenQuestion.metadataTypeAutoCapitalize)(question.metaDataType)
  }, focusProps))), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.descText, rtl && _styles.default.textAlignLeft]
  }, value.length, "/100"));
};

const styles = _reactNative.StyleSheet.create({
  textInputContainer: {
    height: 80,
    marginTop: 10
  },
  textInput: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: _styles.Colors.rankingContainerBorder,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 12
  },
  descText: {
    color: _styles.Colors.openQuestionSubTitle,
    textAlign: 'right',
    width: '100%',
    marginTop: 6
  }
});

var _default = ClassicDropdownOtherOptionInput;
exports.default = _default;
//# sourceMappingURL=ClassicDropdownOtherOptionInput.js.map