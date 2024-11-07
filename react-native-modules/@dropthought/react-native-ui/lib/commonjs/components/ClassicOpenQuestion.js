"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadataTypeKeyboard = exports.metadataTypeAutoCapitalize = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _data = require("../utils/data");
var _styles = _interopRequireWildcard(require("../styles"));
var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));
var _MetadataDesc = _interopRequireDefault(require("./MetadataDesc"));
var _translation = _interopRequireDefault(require("../translation"));
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MAX_CHARACTER = 4000;
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
const OpenQuestion = ({
  mandatoryErrorMessage,
  anonymous,
  question,
  onFeedback,
  // onValueChange, // Keep it for Kiosk usage
  feedback,
  forgot,
  themeColor
}) => {
  const {
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const [text, setText] = (0, _react.useState)(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');
  const [focus, setFocus] = (0, _react.useState)(false);
  const [hasEdited, setHasEdited] = (0, _react.useState)(false);
  const inputRef = (0, _react.useRef)(null);
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const styles = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone ? phoneStyles : phoneStyles;
  (0, _react.useEffect)(() => {
    const keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.blur();
    });
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const onEndEditingHandler = () => {
    setHasEdited(true);
    onFeedback({
      questionId: question.questionId,
      answers: [text],
      type: 'open'
    });
  };
  const getBackgroundColorStyle = () => {
    return {
      borderColor: themeColor
    };
  };
  const rtl = _translation.default.dir() === 'rtl';
  const showAnonymousWarning = anonymous && question.metaDataType && (question.metaDataType === 'Email' || question.metaDataType === 'Name' || question.metaDataType === 'Phone');
  const maxCharacterLength = question.scale ? parseInt(question.scale, 10) : MAX_CHARACTER;
  const characterLeft = maxCharacterLength - text.length;
  const isValid = (0, _data.metaDataFormatValidator)(text, question.metaDataType);

  /** @type {Feedback} */
  const tempFeedback = {
    questionId: question.questionId,
    answers: [text],
    type: 'open'
  };
  const hasForgot = forgot && !(0, _data.mandatoryQuestionValidator)(question, tempFeedback);
  const upperView = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: hasForgot,
    invalidMessage:
    // show the error message after the user has done edited
    hasEdited && !isValid ? question.responseErrorText : '',
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.title
  }), /*#__PURE__*/_react.default.createElement(_MetadataDesc.default, {
    question: question,
    rtl: rtl
  }));
  const inputView = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.inputBG, colorScheme === _theme.COLOR_SCHEMES.dark ? styles.inputBGDark : {}, focus && getBackgroundColorStyle()
    // question.metaDataType && styles.metaDataTypeInput,
    // !question.metaDataType && styles.paddingVertical15,
    ]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    testID: "test:id/field_open_ended",
    ref: inputRef,
    style: [styles.input, {
      color: fontColor
    }, rtl && _styles.default.textAlignRight],
    multiline: true,
    onChangeText: t => {
      if (focus) {
        // [DK-3756] if the text is close to the maxLength it will be rendered twice in the iOS, so we add the focus to prevent the issue.
        setText(t);
      }
      // onValueChange(text) // Keep it for Kiosk usage
    },
    placeholder: question.questionBrand,
    placeholderTextColor: _styles.Colors.inputPlaceholder,
    onEndEditing: onEndEditingHandler,
    value: text,
    onFocus: () => {
      setFocus(true);
    },
    onBlur: () => {
      setFocus(false);
    },
    maxLength: maxCharacterLength,
    keyboardType: metadataTypeKeyboard(question.metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(question.metaDataType)
  }));
  const bottomView = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.subTextRow, rtl && _styles.default.flexRowReverse]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/open_ended_warning",
    style: styles.descText
  }, showAnonymousWarning && `${_translation.default.t('survey:metadata-anonymous-warning')}`), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/open_ended_text_length",
    style: styles.descText
  }, characterLeft, " / ", maxCharacterLength));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, upperView, inputView, bottomView);
};
var _default = exports.default = OpenQuestion;
const phoneStyles = _reactNative.StyleSheet.create({
  descText: {
    color: _styles.Colors.openQuestionSubTitle,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 17
  },
  inputBG: {
    borderColor: _styles.Colors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 101,
    marginVertical: 10,
    paddingHorizontal: 15
  },
  inputBGDark: {
    borderColor: _styles.Colors.borderColorDark
  },
  input: {
    flex: 1,
    // when multi=true, it is important to note that this aligns the text to the top on iOS,
    // and centers it on Android. Use with textAlignVertical set to top for the same behavior in both platforms.
    textAlignVertical: 'top' // this is an android only props, won't affect ios
  },
  paddingVertical15: {
    ..._reactNative.Platform.select({
      ios: {
        paddingVertical: 15
      },
      android: {
        paddingVertical: 5
      }
    })
  },
  metaDataTypeInput: {
    fontSize: 14,
    height: 40
  },
  subTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    marginBottom: 6
  }
});
//# sourceMappingURL=ClassicOpenQuestion.js.map