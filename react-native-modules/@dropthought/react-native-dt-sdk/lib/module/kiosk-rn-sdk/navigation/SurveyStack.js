import * as React from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import { isEmpty, isNil } from 'ramda';
import { PlaceholderImageTypes, PlaceholderScreen, i18n, SurveyScreenLayout, ActivityIndicatorMask } from '@dropthought/react-native-ui';
import { useAsync } from 'react-async';
import { useMetadata } from '../contexts/custom-props';
import StartScreen from '../screens/StartScreen';
import EndScreen from '../screens/EndScreen';
import FakeScreen from '../screens/FakeScreen';
import { useSurveyContext } from '../contexts/survey';
import { submitFeedback } from '../../lib/Feedback';
import ScreenWrapper from './ScreenWrapper';
import Header from './Header';
import { fromJSToAPIDateStr } from '../../lib/DateTimerParser';

const noData = a => isNil(a) || isEmpty(a);

const Stack = ({
  survey
}) => {
  const {
    onClose
  } = useSurveyContext();
  const themeColor = survey.surveyProperty.hexCode;
  const [visiblePageIds, setVisiblePageIds] = React.useState([]);
  const [endScreenvisible, setEndScreenvisible] = React.useState(false);
  const [surveyFeedback, setSurveyFeedback] = React.useState(undefined);
  const [error, setError] = React.useState();
  const metadata = useMetadata();
  const {
    run,
    isPending: loading
  } = useAsync({
    deferFn: submitFeedback,
    onResolve: () => {
      setEndScreenvisible(true);
    },
    onReject: rejectedError => {
      setError(rejectedError);
      setEndScreenvisible(true);
    }
  });
  const handleNextPage = React.useCallback(nextPageIndex => {
    if (nextPageIndex < survey.pageOrder.length) {
      setVisiblePageIds(prevPageIds => {
        const nextPageId = survey.pageOrder[nextPageIndex];
        return [...prevPageIds.filter(prevPageId => prevPageId !== nextPageId), nextPageId];
      });
    }
  }, [survey.pageOrder]);
  const handleStart = React.useCallback(() => {
    handleNextPage(0);
  }, [handleNextPage]);
  const handlePrevPage = React.useCallback(() => {
    setVisiblePageIds(prevPageIds => prevPageIds.slice(0, -1));
  }, []);
  const handleSubmit = React.useCallback(feedback => {
    const {
      timeZone
    } = NativeModules.DtSdk.getConstants();
    setSurveyFeedback(feedback);
    run({ ...feedback,
      metadata,
      createdTime: fromJSToAPIDateStr(Date.now()),
      timeZone
    });
  }, [metadata, run]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.flexOne
  }, /*#__PURE__*/React.createElement(Header, {
    title: survey.surveyName,
    onClose: onClose,
    themeColor: themeColor
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.flexOne
  }, /*#__PURE__*/React.createElement(ScreenWrapper, {
    visible: true,
    isOnTop: !endScreenvisible && visiblePageIds.length === 0
  }, /*#__PURE__*/React.createElement(StartScreen, {
    onStart: handleStart,
    onClose: onClose
  })), survey.pageOrder.map((pageId, pageIndex) => {
    return /*#__PURE__*/React.createElement(ScreenWrapper, {
      key: pageId,
      visible: visiblePageIds.includes(pageId),
      isOnTop: visiblePageIds[visiblePageIds.length - 1] === pageId
    }, /*#__PURE__*/React.createElement(SurveyScreenLayout, {
      survey: survey,
      pageIndex: pageIndex,
      onClose: onClose,
      onNextPage: handleNextPage,
      onPrevPage: handlePrevPage,
      onSubmit: handleSubmit
    }));
  }), /*#__PURE__*/React.createElement(ScreenWrapper, {
    visible: endScreenvisible,
    isOnTop: endScreenvisible
  }, /*#__PURE__*/React.createElement(EndScreen, {
    error: error,
    surveyFeedback: surveyFeedback
  }))), /*#__PURE__*/React.createElement(ActivityIndicatorMask, {
    loading: loading
  }));
};

const SurveyStack = () => {
  const {
    survey,
    onClose
  } = useSurveyContext(); // check if survey data is valid

  if (noData(survey.pages) || noData(survey.surveyProperty) || noData(survey.surveyStartDate) || noData(survey.surveyEndDate)) {
    // need to render placeholder
    return /*#__PURE__*/React.createElement(FakeScreen, {
      onClose: onClose
    }, /*#__PURE__*/React.createElement(PlaceholderScreen, {
      imageType: PlaceholderImageTypes.ProgramUnavailable,
      message: i18n.t('start-survey:placeholder-message')
    }));
  }

  return /*#__PURE__*/React.createElement(Stack, {
    survey: survey
  });
};

export default SurveyStack;
const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  }
});
//# sourceMappingURL=SurveyStack.js.map