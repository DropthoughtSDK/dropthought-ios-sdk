"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadataTypeKeyboard = exports.metadataTypeAutoCapitalize = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MultiLineTextInput = _interopRequireDefault(require("./MultiLineTextInput.styles"));
var _data = require("../../utils/data");
var _translation = _interopRequireDefault(require("../../translation"));
var _styles = require("../../styles");
var _theme = require("../../contexts/theme");
var _theme2 = require("../../contexts/theme/theme.const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const metadataTypeKeyboard = metadataType => {
  switch (metadataType === null || metadataType === void 0 ? void 0 : metadataType.toLocaleLowerCase()) {
    case _data.QuestionMetaDataType.Email:
      return 'default';
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
exports.metadataTypeKeyboard = metadataTypeKeyboard;
const metadataTypeAutoCapitalize = metadataType => {
  switch (metadataType === null || metadataType === void 0 ? void 0 : metadataType.toLocaleLowerCase()) {
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
exports.metadataTypeAutoCapitalize = metadataTypeAutoCapitalize;
const MultiLineTextInput = ({
  onEndEditingHandler,
  onChangeTextHandler,
  themeColor,
  feedback,
  question,
  anonymous,
  inputRef,
  showErrorHint = false,
  checked = true,
  onBlurHandler = () => {},
  onFocusHandler = () => {}
}) => {
  const {
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const {
    metaDataType,
    otherText = '',
    questionBrand = '',
    scale = 64,
    type
  } = question;
  const MAX_CHARACTER = type === 'open' ? Number(scale) : 100;
  const appearanceTextColorStyle = {
    color: fontColor
  };
  // to keep answer always select the last one
  const answersIndex = (feedback === null || feedback === void 0 ? void 0 : feedback.answers.length) - 1;
  const [text, setText] = _react.default.useState(typeof (feedback === null || feedback === void 0 ? void 0 : feedback.answers[answersIndex]) === 'string' ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[answersIndex]}` : '');
  const [focus, setFocus] = _react.default.useState(false);
  const rtl = _translation.default.dir() === 'rtl';
  const showAnonymousWarning = anonymous && metaDataType && (metaDataType === 'Email' || metaDataType === 'Name' || metaDataType === 'Phone');
  (0, _react.useEffect)(() => {
    const hideSubscription = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
      onEndEditingHandler && onEndEditingHandler();
    });
    return () => {
      hideSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeText = t => {
    // [DK-3756] if the text is close to the maxLength it will be rendered twice in the iOS, so we add the focus to prevent the issue.
    if (focus) {
      setText(t);
    }
    onChangeTextHandler && onChangeTextHandler(t);
  };
  const characterLeft = MAX_CHARACTER - text.length;
  let bottomText = '';
  let bottomTextColor = _styles.Colors.warningRed;
  if (showAnonymousWarning) {
    bottomText = _translation.default.t('survey:metadata-anonymous-warning');
    bottomTextColor = _styles.Colors.openQuestionSubTitle;
  }
  const appearanceSubBackgroundColorStyle = {
    backgroundColor: (0, _styles.addOpacityToColor)(colorScheme === _theme2.COLOR_SCHEMES.dark ? _styles.Colors.appearanceSubBlack : themeColor, 0.08)
  };
  const inputValidStyle = {
    borderWidth: 1,
    borderColor: _styles.Colors.warningRed
  };
  const textInputStyle = [_MultiLineTextInput.default.inputContainer, appearanceTextColorStyle, appearanceSubBackgroundColorStyle, showErrorHint ? inputValidStyle : null, rtl && _styles.GlobalStyle.textAlignRight];
  const rightDescTextStyle = [_MultiLineTextInput.default.descText, _MultiLineTextInput.default.descRight, appearanceTextColorStyle, {
    opacity: 0.8
  }];
  const leftDescTextStyle = [_MultiLineTextInput.default.descText, _MultiLineTextInput.default.descLeft, {
    color: bottomTextColor
  }];
  const inputView = /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    ref: inputRef,
    style: textInputStyle,
    multiline: true,
    onChangeText: onChangeText,
    onFocus: () => {
      setFocus(true);
      onFocusHandler();
    },
    onBlur: () => {
      setFocus(false);
      onBlurHandler();
    },
    placeholder: otherText.length > 0 ? otherText : questionBrand.length > 0 ? questionBrand : '',
    placeholderTextColor: _styles.Colors.inputPlaceholder,
    value: text,
    maxLength: MAX_CHARACTER,
    keyboardType: metadataTypeKeyboard(metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(metaDataType)
  });
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
var _default = exports.default = MultiLineTextInput;
//# sourceMappingURL=MultiLineTextInput.js.map