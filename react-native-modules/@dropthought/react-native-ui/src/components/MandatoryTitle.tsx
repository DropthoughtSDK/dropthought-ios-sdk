import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import * as React from 'react';

import { useAddMandatoryRef } from '../contexts/survey-page';
import GlobalStyle, { Colors } from '../styles';
import QuestionWarningMessage from './QuestionWarningMessage';
import i18n from '../translation';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { useTheme, THEME_OPTION } from '../contexts/theme';
import type { Question } from '../data';

type Props = {
  forgot?: boolean;
  invalidMessage?: string;
  mandatoryErrorMessage: string;
  question: Question;
  style?: ViewStyle;
};

const MandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  style,
}: Props) => {
  const rtl = i18n.dir() === 'rtl';
  const dimensionWidthType = useDimensionWidthType();
  const { fontColor, themeOption, customFontColor } = useTheme();
  const { questionId, questionTitle, mandatory, type, subType, optional } =
    question;

  const ref = React.useRef<View>(null);
  const addMandatoryRef = useAddMandatoryRef();

  React.useEffect(() => {
    if (ref.current) {
      addMandatoryRef(questionId, ref.current);
    }
  }, [addMandatoryRef, questionId]);

  let color = fontColor;

  const isOption6Smiley =
    themeOption === THEME_OPTION.OPTION6 &&
    type === 'rating' &&
    subType === 'smiley';

  if (
    (customFontColor === undefined || customFontColor === '') &&
    isOption6Smiley
  ) {
    color = Colors.white;
  }

  return (
    <View
      ref={ref}
      style={[styles.horizontal, style, rtl && GlobalStyle.flexRowReverse]}
    >
      <Text
        style={[
          styles.questionTitle,
          questionTitleSize[dimensionWidthType],
          { color },
        ]}
      >
        {questionTitle}
        {
          //optional was been used on matrix question
          (mandatory || optional) && <Text style={styles.hint}>*</Text>
        }
      </Text>
      <QuestionWarningMessage
        // forgot message has higher priority than custom invalid message
        message={forgot ? mandatoryErrorMessage : invalidMessage}
      />
    </View>
  );
};

export default MandatoryTitle;

const questionTitleSize = StyleSheet.create({
  [DimensionWidthType.phone]: {
    fontSize: 26,
  },
  [DimensionWidthType.tablet]: {
    fontSize: 26,
  },
});

const styles = StyleSheet.create({
  hint: {
    color: Colors.mandatoryRed,
    fontSize: 18,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
});
