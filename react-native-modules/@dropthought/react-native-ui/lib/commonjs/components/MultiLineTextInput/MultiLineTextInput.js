"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _MultiLineTextInput = _interopRequireDefault(require("./MultiLineTextInput.styles"));

var _data = require("../../utils/data");

var _translation = _interopRequireDefault(require("../../translation"));

var _styles = require("../../styles");

var _theme = require("../../contexts/theme");

var _theme2 = require("../../contexts/theme/theme.const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const metadataTypeKeyboard = metadataType => {
  switch (metadataType) {
    case _data.QuestionMetaDataType.Email:
      return 'email-address';

    case _data.QuestionMetaDataType.Phone:
      return 'phone-pad';

    case _data.QuestionMetaDataType.Number:
      return _reactNative.Platform.select({
        ios: 'numbers-and-punctuation',
        default: 'default'
      });

    case _data.QuestionMetaDataType.Date:
    default:
      return 'default';
  }
};

const metadataTypeAutoCapitalize = metadataType => {
  switch (metadataType) {
    case _data.QuestionMetaDataType.Name:
      return 'words';

    case _data.QuestionMetaDataType.Email:
    case _data.QuestionMetaDataType.Phone:
    case _data.QuestionMetaDataType.Date:
    case _data.QuestionMetaDataType.Number:
      return 'none';

    default:
      return 'sentences';
  }
};

const MultiLineTextInput = ({
  onEndEditingHandler,
  onChangeTextHandler,
  themeColor,
  feedback,
  question,
  anonymous,
  inputRef,
  showErrorHint = true,
  checked = true,
  ...props
}) => {
  const {
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const {
    metaDataType,
    questionBrand,
    scale = 64,
    type
  } = question;
  const MAX_CHARACTER = type === 'open' ? Number(scale) : 100;
  const appearanceTextColorStyle = {
    color: fontColor
  };

  const [hasEdited, setHasEdited] = _react.default.useState(false);

  const [text, setText] = _react.default.useState(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');

  const rtl = _translation.default.dir() === 'rtl';
  const showAnonymousWarning = anonymous && metaDataType && (metaDataType === 'Email' || metaDataType === 'Name' || metaDataType === 'Phone');

  const onEndEditing = () => {
    setHasEdited(true);
    onEndEditingHandler && onEndEditingHandler();
  };

  const onChangeText = t => {
    setText(t);
    onChangeTextHandler && onChangeTextHandler(t);
  };

  const characterLeft = MAX_CHARACTER - text.length;
  const AT_LEAST_CHARACTER = 3;
  const isInputInValid = hasEdited && text.length < AT_LEAST_CHARACTER;
  let bottomText = '';
  let bottomTextColor = _styles.Colors.warningRed;

  if (isInputInValid && showErrorHint) {
    bottomText = _translation.default.t('open-question-invalid-message:characters', {
      count: AT_LEAST_CHARACTER
    });
  } else if (showAnonymousWarning) {
    bottomText = _translation.default.t('survey:metadata-anonymous-warning');
    bottomTextColor = (0, _styles.addOpacityToColor)(_styles.Colors.black, 0.6);
  }

  const appearanceSubBackgroundColorStyle = {
    backgroundColor: (0, _styles.addOpacityToColor)(colorScheme === _theme2.COLOR_SCHEMES.dark ? _styles.Colors.appearanceSubBlack : themeColor, 0.08)
  };
  const inputValidStyle = {
    borderWidth: 1,
    borderColor: _styles.Colors.warningRed
  };
  const textInputStyle = [_MultiLineTextInput.default.inputContainer, appearanceTextColorStyle, appearanceSubBackgroundColorStyle, isInputInValid && showErrorHint ? inputValidStyle : null, rtl && _styles.GlobalStyle.textAlignRight];
  const rightDescTextStyle = [_MultiLineTextInput.default.descText, _MultiLineTextInput.default.descRight, appearanceTextColorStyle, {
    opacity: 0.8
  }];
  const leftDescTextStyle = [_MultiLineTextInput.default.descText, _MultiLineTextInput.default.descLeft, {
    color: bottomTextColor
  }];

  const inputView = /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, _extends({
    ref: inputRef,
    style: textInputStyle,
    multiline: true,
    onChangeText: onChangeText,
    placeholder: questionBrand,
    placeholderTextColor: _styles.Colors.inputPlaceholder,
    onEndEditing: onEndEditing,
    value: text,
    maxLength: MAX_CHARACTER,
    keyboardType: metadataTypeKeyboard(metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(metaDataType)
  }, props));

  const bottomView = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_MultiLineTextInput.default.subTextRow, rtl && _styles.GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: leftDescTextStyle,
    numberOfLines: 2
  }, bottomText), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: rightDescTextStyle
  }, characterLeft + ' / ' + MAX_CHARACTER));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, checked ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, inputView, bottomView) : null);
};

var _default = MultiLineTextInput;
exports.default = _default;
//# sourceMappingURL=MultiLineTextInput.js.map