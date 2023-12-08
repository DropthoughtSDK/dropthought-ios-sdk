"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _data = require("../utils/data");

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

var _MultiLineTextInput = _interopRequireDefault(require("./MultiLineTextInput"));

var _MetadataDesc = _interopRequireDefault(require("./MetadataDesc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OpenQuestion = ({
  survey,
  anonymous,
  question,
  // onValueChange, // Keep it for Kiosk usage
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  var _question$responseErr;

  const rtl = _translation.default.dir() === 'rtl';
  const {
    backgroundColor
  } = (0, _theme.useTheme)();

  const [text, setText] = _react.default.useState(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');

  const textRef = _react.default.useRef(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');

  const [hasEdited, setHasEdited] = _react.default.useState(false); // It will be used in valid title


  const isValid = (0, _data.metaDataFormatValidator)(text, question.metaDataType);
  const appearanceBackgroundColorStyle = {
    backgroundColor: backgroundColor
  };
  /** @type {Feedback} */

  const tempFeedback = {
    questionId: question.questionId,
    answers: [text],
    type: 'open'
  }; // It will be used in valid title

  const hasForgot = forgot && !(0, _data.mandatoryQuestionValidator)(question, tempFeedback);

  const onEndEditingHandler = () => {
    setHasEdited(true);
    onFeedback({
      questionId: question.questionId,
      answers: [textRef.current],
      type: 'open'
    });
  };

  const onChangeTextHandler = t => {
    setText(t);
    textRef.current = t;
  };

  const upperView = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.upperView
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    forgot: hasForgot,
    invalidMessage: // show the error message after the user has done edited
    hasEdited && !isValid ? (_question$responseErr = question.responseErrorText) !== null && _question$responseErr !== void 0 ? _question$responseErr : _translation.default.t('metadata-invalid-message', question.metaDataType) : '',
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    question: question
  }), /*#__PURE__*/_react.default.createElement(_MetadataDesc.default, {
    question: question,
    rtl: rtl
  }));

  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: [styles.container, appearanceBackgroundColorStyle]
  }, upperView, /*#__PURE__*/_react.default.createElement(_MultiLineTextInput.default, {
    onEndEditingHandler: onEndEditingHandler,
    onChangeTextHandler: onChangeTextHandler,
    themeColor: themeColor,
    feedback: feedback,
    question: question,
    anonymous: anonymous,
    showErrorHint: hasForgot || hasEdited && !isValid
  }));
};

var _default = /*#__PURE__*/_react.default.memo(OpenQuestion);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  },
  upperView: {
    marginBottom: 5
  }
});
//# sourceMappingURL=OpenQuestion.js.map