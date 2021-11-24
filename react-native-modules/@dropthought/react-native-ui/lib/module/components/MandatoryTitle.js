import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import { useAddMandatoryRef } from '../contexts/survey-page';
import GlobalStyle, { Colors } from '../styles';
import QuestionWarningMessage from './QuestionWarningMessage';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme } from '../contexts/theme';

const MandatoryTitle = ({
  forgot,
  invalidMessage = '',
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
  return /*#__PURE__*/React.createElement(View, {
    ref: ref,
    style: [styles.horizontal, style, rtl && GlobalStyle.flexRowReverse]
  }, question.questionTitle.split(' ').map((text, index) => /*#__PURE__*/React.createElement(Text, {
    key: index,
    style: [styles.questionTitle, questionTitleSize[dimensionWidthType], {
      color: fontColor
    }]
  }, text + ' ')), question.mandatory && /*#__PURE__*/React.createElement(Text, {
    style: styles.hint
  }, "*"), /*#__PURE__*/React.createElement(QuestionWarningMessage // forgot message has higher priority than custom invalid message
  , {
    message: forgot ? i18n.t('survey:mandatory') : invalidMessage
  }));
};

export default MandatoryTitle;
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
//# sourceMappingURL=MandatoryTitle.js.map