import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { metaDataTypeQuestionValidator, mandatoryQuestionValidator } from '../utils/data';
import MandatoryTitle from './MandatoryTitle';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';
import MultiLineTextInput from './MultiLineTextInput';

const OpenQuestion = ({
  anonymous,
  question,
  // onValueChange, // Keep it for Kiosk usage
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    backgroundColor
  } = useTheme();
  const [text, setText] = React.useState(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');
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
      answers: [text],
      type: 'open'
    });
  };

  const onChangeTextHandler = t => {
    setText(t);
  };

  const upperView = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: hasForgot,
    invalidMessage: // show the error message after the user has done edited
    hasEdited && !isValid ? i18n.t(`metadata-invalid-message:${question.metaDataType}`) : '',
    question: question
  }));
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: [styles.container, appearanceBackgroundColorStyle]
  }, upperView, /*#__PURE__*/React.createElement(MultiLineTextInput, {
    onEndEditingHandler: onEndEditingHandler,
    onChangeTextHandler: onChangeTextHandler,
    themeColor: themeColor,
    feedback: feedback,
    question: question,
    anonymous: anonymous
  }));
};

export default /*#__PURE__*/React.memo(OpenQuestion);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  }
});
//# sourceMappingURL=OpenQuestion.js.map