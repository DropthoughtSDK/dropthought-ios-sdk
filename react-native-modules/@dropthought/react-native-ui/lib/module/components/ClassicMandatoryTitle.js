import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import { useAddMandatoryRef } from '../contexts/survey-page';
import GlobalStyle, { Colors } from '../styles';
import ClassicQuestionWarningMessage from './ClassicQuestionWarningMessage';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme } from '../contexts/theme';

const ClassicMandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  style
}) => {
  const rtl = i18n.dir() === 'rtl';
  const dimensionWidthType = useDimensionWidthType();
  const {
    fontColor
  } = useTheme();
  const ref = React.useRef(null);
  const addMandatoryRef = useAddMandatoryRef();
  React.useEffect(() => {
    if (ref.current) {
      addMandatoryRef(question.questionId, ref.current);
    }
  }, [addMandatoryRef, question.questionId]);
  const textStyle = [styles.questionTitle, questionTitleSize[dimensionWidthType], {
    color: fontColor,
    minHeight: i18n.language === 'te' ? 30 : undefined
  }];
  return /*#__PURE__*/React.createElement(View, {
    ref: ref,
    style: [styles.horizontal, style, rtl && GlobalStyle.flexRowReverse]
  }, question.questionTitle.split(' ').map((text, index) => /*#__PURE__*/React.createElement(Text, {
    key: index,
    style: textStyle
  }, text + ' ')), //optional was been used on matrix question
  (question.mandatory || question.optional) && /*#__PURE__*/React.createElement(Text, {
    style: styles.hint
  }, "*"), /*#__PURE__*/React.createElement(ClassicQuestionWarningMessage // forgot message has higher priority than custom invalid message
  , {
    message: forgot ? mandatoryErrorMessage : invalidMessage
  }));
};

export default ClassicMandatoryTitle;
const questionTitleSize = StyleSheet.create({
  [DimensionWidthType.phone]: {
    fontSize: 16
  },
  [DimensionWidthType.tablet]: {
    fontSize: 18
  }
});
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
  }
});
//# sourceMappingURL=ClassicMandatoryTitle.js.map