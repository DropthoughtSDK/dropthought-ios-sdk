import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
// @ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@react-native-community/hooks';
import ClassicProgressBar from '../components/ClassicProgressBar';
import { useFeedbackState } from '../contexts/feedback';
import { opacity10 } from '../styles';
import { useTheme } from '../contexts/theme';
import i18n from '../translation';
const numValidFeedbacks = ({
  answeredQuestionIds,
  feedbacksMap
}) => {
  return answeredQuestionIds.filter(qid => {
    const feedback = feedbacksMap[qid];

    // if no answers or 0 length, filter out
    if (!feedback || !feedback.answers || !feedback.answers.length) {
      return false;
    }

    // a special case: answers: [""], should also consider as invalid
    const answer = feedback.answers[0];
    if (typeof answer === 'string' && !answer.length) {
      return false;
    }
    return true;
  }).length;
};
const isAndroid = Platform.OS === 'android';
const SurveyProgressBar = ({
  displayDictionary
}) => {
  const rtl = i18n.dir() === 'rtl';
  const feedbackState = useFeedbackState();
  const {
    hexCode
  } = useTheme();
  const themeColor = hexCode;
  const insets = useSafeAreaInsets();
  const {
    keyboardShown
  } = useKeyboard();
  const insetsBottom =
  // if it is android, and the insets bottom is not normal,
  // maybe it is because the keyboard is showed, don't use this insets
  isAndroid && insets.bottom >= 100 ? 0 : insets.bottom;
  const containerStyle = React.useMemo(() => [styles.container, {
    backgroundColor: opacity10(themeColor),
    paddingBottom: insetsBottom || 15
  }], [insetsBottom, themeColor]);

  // hide this bar when it is android and keyboard is shown
  if (isAndroid && keyboardShown) return null;
  const maxValue = Object.values(displayDictionary).filter(item => item === true).length;
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(ClassicProgressBar, {
    value: numValidFeedbacks(feedbackState),
    maxValue: maxValue,
    themeColor: themeColor,
    rtl: rtl
  }));
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    width: '100%'
  }
});
export default /*#__PURE__*/React.memo(SurveyProgressBar);
//# sourceMappingURL=SurveyProgressBar.js.map