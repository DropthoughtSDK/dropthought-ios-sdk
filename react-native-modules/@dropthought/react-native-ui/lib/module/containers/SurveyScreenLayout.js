function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { ScrollView as RNScrollView, StyleSheet, Platform, View, findNodeHandle } from 'react-native';
import { SurveyPageProvider } from '../contexts/survey-page';
import QuestionContainer from './QuestionContainer';
import DefaultSurveyProgressBar from './SurveyProgressBar';
import SurveyFooter from './SurveyFooter';
import DefaultSurveyPageIndicator from '../components/SurveyPageIndicator';
import { KeyboardAvoidingScrollView } from '../components/KeyboardAvoidingView';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';
export const SurveyProgressBarPosition = {
  FixedBottom: 0,
  BelowBody: 1
};
const ScrollView = Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

const SurveyScreenLayout = props => {
  const {
    backgroundColor
  } = useTheme();
  const {
    pageIndex = 0,
    survey,
    SurveyPageIndicator = DefaultSurveyPageIndicator,
    SurveyProgressBar = DefaultSurveyProgressBar,
    surveyProgressBarPosition = SurveyProgressBarPosition.FixedBottom
  } = props;
  const scrollViewRef = React.useRef(null); // when validation start, set the state

  const [validationStarted, setValidationStarted] = React.useState(false);
  const onValidationStartHandler = React.useCallback(() => {
    setValidationStarted(true);
  }, []); // when validation failed, scroll to the ref

  const onValidationFailedHandler = React.useCallback((_, targetReg) => {
    if (targetReg && scrollViewRef.current) {
      targetReg.measureLayout(findNodeHandle(scrollViewRef.current), (_x, y) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: 0,
            y: y,
            animated: true
          });
        }
      });
    }
  }, []);
  const questions = survey.pages[pageIndex].questions.map(question => {
    return /*#__PURE__*/React.createElement(QuestionContainer, {
      key: question.questionId,
      anonymous: survey.anonymous,
      question: question,
      validationStarted: validationStarted,
      themeColor: survey.surveyProperty.hexCode
    });
  });
  const surveyProgressBar = /*#__PURE__*/React.createElement(SurveyProgressBar, {
    survey: survey,
    pageIndex: pageIndex,
    rtl: i18n.dir() === 'rtl'
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.flex1, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(SurveyPageIndicator, {
    pageIndex: pageIndex,
    survey: survey,
    rtl: i18n.dir() === 'rtl'
  }), /*#__PURE__*/React.createElement(ScrollView, {
    ref: scrollViewRef,
    style: [styles.scrollView, {
      backgroundColor
    }],
    extraAvoidingSpace: 30,
    contentContainerStyle: styles.scrollViewContentContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.bodyContent
  }, questions, /*#__PURE__*/React.createElement(SurveyFooter, _extends({}, props, {
    survey: survey,
    onValidationFailed: onValidationFailedHandler,
    onValidationStart: onValidationStartHandler
  })), surveyProgressBarPosition === SurveyProgressBarPosition.BelowBody && surveyProgressBar)), surveyProgressBarPosition === SurveyProgressBarPosition.FixedBottom && surveyProgressBar);
};

const SurveyScreenLayoutWrapper = props => {
  return /*#__PURE__*/React.createElement(SurveyPageProvider, null, /*#__PURE__*/React.createElement(SurveyScreenLayout, props));
};

export default SurveyScreenLayoutWrapper;

const noop = () => undefined;

SurveyScreenLayout.defaultProps = {
  pageIndex: 0,
  onSubmit: noop,
  onNextPage: noop,
  onPrevPage: noop
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 30
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 30
  },
  // where the questions and submit/page buttons go
  bodyContent: {
    width: '100%',
    flex: 1,
    maxWidth: 648
  }
});
//# sourceMappingURL=SurveyScreenLayout.js.map