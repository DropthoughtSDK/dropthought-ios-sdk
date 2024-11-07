import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAddMandatoryRef } from '../contexts/survey-page';
import GlobalStyle, { Colors } from '../styles';
import ClassicQuestionWarningMessage from './ClassicQuestionWarningMessage';
import HtmlText from './HtmlText';
import { htmlMandatory, htmlTrim, toHtml, toWhite } from '../utils/htmlHelper';
import i18n from '../translation';
import { COLOR_SCHEMES, useTheme } from '../contexts/theme';
const ClassicMandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  subTitleMessage,
  style
}) => {
  const {
    questionId,
    questionTitle,
    mandatory,
    optional,
    type,
    respondentTracker = false
  } = question;
  const rtl = i18n.dir() === 'rtl';
  const {
    fontColor,
    colorScheme
  } = useTheme();
  const ref = useRef(null);
  const addMandatoryRef = useAddMandatoryRef();
  useEffect(() => {
    if (ref.current) {
      addMandatoryRef(questionId, ref.current);
    }
  }, [addMandatoryRef, questionId]);
  let html = mandatory || optional ? htmlMandatory(htmlTrim(toHtml(questionTitle))) : htmlTrim(toHtml(questionTitle));
  html = colorScheme === COLOR_SCHEMES.dark && (type === 'nps' || respondentTracker) ? toWhite(html) : html;
  return /*#__PURE__*/React.createElement(View, {
    ref: ref,
    style: [styles.horizontal, style, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(HtmlText, {
    html: html,
    accessibilityLabel: `question_${fontColor}_${questionTitle}`
  }), subTitleMessage ? /*#__PURE__*/React.createElement(View, {
    style: rtl && GlobalStyle.flexRowReverse
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.subTitle
  }, subTitleMessage)) : null, /*#__PURE__*/React.createElement(ClassicQuestionWarningMessage
  // forgot message has higher priority than custom invalid message
  , {
    message: forgot ? mandatoryErrorMessage : invalidMessage
  }));
};
export default ClassicMandatoryTitle;
const styles = StyleSheet.create({
  hint: {
    color: Colors.mandatoryRed,
    fontSize: 18
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 2,
    textAlignVertical: 'center',
    alignSelf: 'center'
  },
  subTitle: {
    marginTop: 8,
    color: Colors.border
  }
});
//# sourceMappingURL=ClassicMandatoryTitle.js.map