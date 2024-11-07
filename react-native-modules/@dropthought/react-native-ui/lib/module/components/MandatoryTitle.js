import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import { useAddMandatoryRef } from '../contexts/survey-page';
import GlobalStyle, { Colors } from '../styles';
import QuestionWarningMessage from './QuestionWarningMessage';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme, THEME_OPTION } from '../contexts/theme';
const MandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  subTitleMessage,
  style
}) => {
  const rtl = i18n.dir() === 'rtl';
  const dimensionWidthType = useDimensionWidthType();
  const {
    fontColor,
    themeOption,
    customFontColor
  } = useTheme();
  const {
    questionId,
    questionTitlePlain,
    mandatory,
    type,
    subType,
    optional
  } = question;
  const ref = React.useRef(null);
  const addMandatoryRef = useAddMandatoryRef();
  React.useEffect(() => {
    if (ref.current) {
      addMandatoryRef(questionId, ref.current);
    }
  }, [addMandatoryRef, questionId]);
  let color = fontColor;
  const isOption6Smiley = themeOption === THEME_OPTION.OPTION6 && type === 'rating' && subType === 'smiley';
  if ((customFontColor === undefined || customFontColor === '') && isOption6Smiley) {
    color = Colors.white;
  }
  const textStyle = [styles.questionTitle, questionTitleSize[dimensionWidthType], {
    color,
    lineHeight: i18n.language === 'te' ? 42 : undefined
  }];
  return /*#__PURE__*/React.createElement(View, {
    ref: ref,
    style: [styles.horizontal, style, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/mandatory_title",
    style: textStyle
  }, questionTitlePlain,
  //optional was been used on matrix question
  (mandatory || optional) && /*#__PURE__*/React.createElement(Text, {
    style: styles.hint
  }, "*")), subTitleMessage ? /*#__PURE__*/React.createElement(View, {
    style: rtl && GlobalStyle.flexRowReverse
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.subTitle
  }, subTitleMessage)) : null, /*#__PURE__*/React.createElement(QuestionWarningMessage
  // forgot message has higher priority than custom invalid message
  , {
    message: forgot ? mandatoryErrorMessage : invalidMessage
  }));
};
export default MandatoryTitle;
const questionTitleSize = StyleSheet.create({
  [DimensionWidthType.phone]: {
    fontSize: 26
  },
  [DimensionWidthType.tablet]: {
    fontSize: 26
  }
});
const styles = StyleSheet.create({
  hint: {
    color: Colors.mandatoryRed,
    fontSize: 18
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center'
  },
  subTitle: {
    marginTop: 8,
    color: Colors.border
  }
});
//# sourceMappingURL=MandatoryTitle.js.map