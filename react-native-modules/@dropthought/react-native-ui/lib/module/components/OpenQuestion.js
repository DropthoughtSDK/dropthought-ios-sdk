import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { metaDataTypeQuestionValidator, mandatoryQuestionValidator } from '../utils/data';
import MandatoryTitle from './MandatoryTitle';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';
import MultiLineTextInput from './MultiLineTextInput';
import MetadataDesc from './MetadataDesc';

const OpenQuestion = ({
  anonymous,
  question,
  // onValueChange, // Keep it for Kiosk usage
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  var _question$responseErr;

  const rtl = i18n.dir() === 'rtl';
  const {
    backgroundColor
  } = useTheme();
  const [text, setText] = React.useState(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');
  const textRef = React.useRef(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');
  const [hasEdited, setHasEdited] = React.useState(false); // It will be used in valid title

  const isValid = metaDataTypeQuestionValidator(question, text);
  const appearanceBackgroundColorStyle = {
    backgroundColor: backgroundColor
  };
  /** @type {Feedback} */

  const tempFeedback = {
    questionId: question.questionId,
    answers: [text],
    type: 'open'
  }; // It will be used in valid title

  const hasForgot = forgot && !mandatoryQuestionValidator(question, tempFeedback);

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

  const upperView = /*#__PURE__*/React.createElement(View, {
    style: styles.upperView
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: hasForgot,
    invalidMessage: // show the error message after the user has done edited
    hasEdited && !isValid ? (_question$responseErr = question.responseErrorText) !== null && _question$responseErr !== void 0 ? _question$responseErr : i18n.t('metadata-invalid-message', question.metaDataType) : '',
    question: question
  }), /*#__PURE__*/React.createElement(MetadataDesc, {
    question: question,
    rtl: rtl
  }));
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: [styles.container, appearanceBackgroundColorStyle]
  }, upperView, /*#__PURE__*/React.createElement(MultiLineTextInput, {
    onEndEditingHandler: onEndEditingHandler,
    onChangeTextHandler: onChangeTextHandler,
    themeColor: themeColor,
    feedback: feedback,
    question: question,
    anonymous: anonymous,
    showErrorHint: hasForgot || hasEdited && !isValid
  }));
};

export default /*#__PURE__*/React.memo(OpenQuestion);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  },
  upperView: {
    marginBottom: 5
  }
});
//# sourceMappingURL=OpenQuestion.js.map