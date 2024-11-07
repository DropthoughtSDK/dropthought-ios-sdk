import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';

import { useAddMandatoryRef } from '../contexts/survey-page';
import GlobalStyle, { Colors } from '../styles';
import ClassicQuestionWarningMessage from './ClassicQuestionWarningMessage';
import HtmlText from './HtmlText';
import { htmlMandatory, htmlTrim, toHtml, toWhite } from '../utils/htmlHelper';
import i18n from '../translation';
import { COLOR_SCHEMES, useTheme } from '../contexts/theme';
import type { Question } from '../data';

type Props = {
  forgot?: boolean;
  invalidMessage?: string;
  mandatoryErrorMessage: string;
  question: Question;
  subTitleMessage?: string;
  style?: ViewStyle;
};

const ClassicMandatoryTitle = ({
  forgot,
  invalidMessage = '',
  mandatoryErrorMessage,
  question,
  subTitleMessage,
  style,
}: Props) => {
  const {
    questionId,
    questionTitle,
    mandatory,
    optional,
    type,
    respondentTracker = false,
  } = question;
  const rtl = i18n.dir() === 'rtl';
  const { fontColor, colorScheme } = useTheme();

  const ref = useRef<View>(null);
  const addMandatoryRef = useAddMandatoryRef();

  useEffect(() => {
    if (ref.current) {
      addMandatoryRef(questionId, ref.current);
    }
  }, [addMandatoryRef, questionId]);

  let html =
    mandatory || optional
      ? htmlMandatory(htmlTrim(toHtml(questionTitle)))
      : htmlTrim(toHtml(questionTitle));

  html =
    colorScheme === COLOR_SCHEMES.dark && (type === 'nps' || respondentTracker)
      ? toWhite(html)
      : html;

  return (
    <View
      ref={ref}
      style={[styles.horizontal, style, rtl && GlobalStyle.flexRowReverse]}
    >
      {
        <HtmlText
          html={html}
          accessibilityLabel={`question_${fontColor}_${questionTitle}`}
        />
      }
      {subTitleMessage ? (
        <View style={rtl && GlobalStyle.flexRowReverse}>
          <Text style={styles.subTitle}>{subTitleMessage}</Text>
        </View>
      ) : null}
      <ClassicQuestionWarningMessage
        // forgot message has higher priority than custom invalid message
        message={forgot ? mandatoryErrorMessage : invalidMessage}
      />
    </View>
  );
};

export default ClassicMandatoryTitle;

const styles = StyleSheet.create({
  hint: {
    color: Colors.mandatoryRed,
    fontSize: 18,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 2,
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  subTitle: {
    marginTop: 8,
    color: Colors.border,
  },
});
