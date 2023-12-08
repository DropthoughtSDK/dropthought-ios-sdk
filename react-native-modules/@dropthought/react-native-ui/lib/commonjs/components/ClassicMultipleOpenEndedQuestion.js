"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = _interopRequireWildcard(require("../styles"));

var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));

var _useMultipleOpenEnded = _interopRequireDefault(require("../hooks/useMultipleOpenEnded"));

var _useOpenEnded = _interopRequireDefault(require("../hooks/useOpenEnded"));

var _data = require("../utils/data");

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RowComponent = ({
  question,
  questionRow,
  feedback,
  selectedAnswerState,
  updateFeedback,
  themeColor,
  index
}) => {
  var _question$metaDataTyp;

  const {
    questionTitle,
    exampleMetadataText,
    metaDataType = 'String',
    responseErrorText,
    scale,
    phiData
  } = questionRow;
  const [, setSelectedAnswer] = selectedAnswerState;
  const {
    metadataTypeKeyboard,
    metadataTypeAutoCapitalize,
    text,
    isFocus,
    hasEdited,
    onChangeTextHandler,
    onEndEditingHandler,
    onFocus,
    onBlur
  } = (0, _useOpenEnded.default)(feedback, index);
  const {
    backgroundColor,
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const isDark = colorScheme === _theme.COLOR_SCHEMES.dark;
  const isValid = (0, _data.metaDataFormatValidator)(text, question === null || question === void 0 ? void 0 : (_question$metaDataTyp = question.metaDataTypeList) === null || _question$metaDataTyp === void 0 ? void 0 : _question$metaDataTyp[index]);
  const isFoucsAndInValid = isFocus || !isValid && hasEdited;

  const onChangeText = textInput => {
    onChangeTextHandler(textInput);
    setSelectedAnswer(previous => {
      const answers = previous.map((value, i) => i === index ? textInput : value);
      updateFeedback(answers);
      return answers;
    });
  };

  const rowContainerStyle = [styles.rowContainer, {
    backgroundColor: isFocus ? isDark ? _styles.Colors.rankingContainerBgDark : (0, _styles.addOpacityToColor)(themeColor || _styles.Colors.white, 0.1) : backgroundColor
  }];
  const rowTitleTextStyle = [styles.rowTitleText, {
    color: fontColor
  }];

  const hippaText = _translation.default.t('survey:hippa-hint');

  let inputBorderColor;
  let bottomTextComponent;

  if (!isValid && hasEdited) {
    inputBorderColor = _styles.Colors.warningRed;
    const errorTextStyle = [styles.responseText, {
      color: _styles.Colors.warningRed
    }];
    bottomTextComponent = /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: errorTextStyle
    }, responseErrorText);
  } else if (isFocus) {
    inputBorderColor = themeColor;
    const descTextStyle = [styles.responseText, {
      color: _styles.Colors.openQuestionSubTitle
    }];
    bottomTextComponent = /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: descTextStyle
    }, phiData ? hippaText : '');
  } else {
    inputBorderColor = isDark ? _styles.Colors.rankingBorderDark : _styles.Colors.rankingBorder;
    bottomTextComponent = null;
  }

  const inputStyle = [styles.input, {
    backgroundColor: backgroundColor,
    borderColor: inputBorderColor,
    color: fontColor
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: rowContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: rowTitleTextStyle
  }, questionTitle)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.rowContent
  }, exampleMetadataText && isFoucsAndInValid ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.rowSubTitleText
  }, exampleMetadataText) : null, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: inputStyle,
    onChangeText: onChangeText,
    onEndEditing: onEndEditingHandler,
    value: text,
    onFocus: onFocus,
    onBlur: onBlur,
    maxLength: scale,
    keyboardType: metadataTypeKeyboard(metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(metaDataType)
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.rowBottomContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.flex1
  }, bottomTextComponent), isFoucsAndInValid ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.inputLengthText, _styles.default.textAlignRight]
  }, `${scale - text.length}/${scale}`) : null)));
};

const ClassicMultipleOpenEndedQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    questionRows,
    selectedAnswerState,
    handleErrorHint,
    updateFeedback
  } = (0, _useMultipleOpenEnded.default)(question, feedback, onFeedback);
  const rowList = questionRows.map((questionRow, index) => /*#__PURE__*/_react.default.createElement(RowComponent, {
    question: question,
    questionRow: questionRow,
    feedback: feedback,
    selectedAnswerState: selectedAnswerState,
    updateFeedback: updateFeedback,
    index: index,
    themeColor: themeColor,
    key: index.toString()
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: false,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.title,
    invalidMessage: handleErrorHint(forgot)
  }), rowList);
};

var _default = /*#__PURE__*/_react.default.memo(ClassicMultipleOpenEndedQuestion);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  questionContainer: {
    marginTop: 45,
    marginHorizontal: 16
  },
  title: {
    marginBottom: 16
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: -16,
    borderRadius: 4
  },
  rowTitleText: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 8
  },
  rowSubTitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: _styles.Colors.openQuestionSubTitle,
    marginBottom: 8
  },
  rowContent: {
    flex: 8
  },
  rowBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    borderColor: _styles.Colors.borderColor,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 4,
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 8
  },
  inputLengthText: {
    fontSize: 12,
    fontWeight: '500',
    color: _styles.Colors.openQuestionSubTitle
  },
  responseText: {
    fontSize: 12,
    fontWeight: '500'
  }
});
//# sourceMappingURL=ClassicMultipleOpenEndedQuestion.js.map