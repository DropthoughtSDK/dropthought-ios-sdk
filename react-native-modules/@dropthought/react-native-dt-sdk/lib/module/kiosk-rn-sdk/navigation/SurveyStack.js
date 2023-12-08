import React, { useCallback, useState } from 'react';
import { View, StyleSheet, NativeModules } from 'react-native';
import { isEmpty, isNil } from 'ramda';
import { PlaceholderImageTypes, PlaceholderScreen, i18n, SurveyScreenLayout, ActivityIndicatorMask } from '@dropthought/react-native-ui/src';
import { useAsync } from 'react-async';
import { useMetadata } from '../contexts/custom-props';
import StartScreen from '../screens/StartScreen';
import EndScreen from '../screens/EndScreen';
import ErrorHintScreen from '../screens/ErrorHintScreen';
import { useSurveyContext } from '../contexts/survey';
import { submitFeedback } from '../../lib/Feedback';
import ScreenWrapper from './ScreenWrapper';
import Header from './Header';
import { fromJSToAPIDateStr } from '../../lib/DateTimerParser';
import { uploadPicture } from '../../lib/UploadPicture';
const noData = a => isNil(a) || isEmpty(a);
const Stack = ({
  preview
}) => {
  const {
    survey,
    onClose
  } = useSurveyContext();
  const themeColor = survey.surveyProperty.hexCode;
  const [visiblePageIds, setVisiblePageIds] = useState([]);
  const [endScreenvisible, setEndScreenvisible] = useState(false);
  const [surveyFeedback, setSurveyFeedback] = useState(undefined);
  const [error, setError] = useState();
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
  const handleNextPage = useCallback(nextPageIndex => {
    if (nextPageIndex < survey.pageOrder.length) {
      setVisiblePageIds(prevPageIds => {
        const nextPageId = survey.pageOrder[nextPageIndex];
        return [...prevPageIds.filter(prevPageId => prevPageId !== nextPageId), nextPageId];
      });
    }
  }, [survey.pageOrder]);
  const handleStart = useCallback(() => {
    handleNextPage(0);
  }, [handleNextPage]);
  const handlePrevPage = useCallback(() => {
    setVisiblePageIds(prevPageIds => prevPageIds.slice(0, -1));
  }, []);
  const handleSubmit = useCallback(feedback => {
    if (preview) {
      setEndScreenvisible(true);
    } else {
      const {
        timeZone
      } = NativeModules.DtSdk.getConstants();
      setSurveyFeedback(feedback);
      run({
        ...feedback,
        metadata,
        createdTime: fromJSToAPIDateStr(Date.now()),
        timeZone
      });
    }
  }, [metadata, preview, run]);
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async file => {
    if (file) {
      setIsUploading(true);
      try {
        const {
          url
        } = await uploadPicture(file);
        setIsUploading(false);
        return url;
      } catch (reason) {
        setIsUploading(false);
        return reason;
      }
    } else {
      return undefined;
    }
  };
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
    isOnTop: !endScreenvisible && visiblePageIds.length === 0,
    rtl: survey.language === 'ar'
  }, /*#__PURE__*/React.createElement(StartScreen, {
    onStart: handleStart,
    onClose: onClose
  })), survey.pageOrder.map((pageId, pageIndex) => {
    return /*#__PURE__*/React.createElement(ScreenWrapper, {
      key: pageId,
      visible: visiblePageIds.includes(pageId),
      isOnTop: visiblePageIds[visiblePageIds.length - 1] === pageId,
      rtl: survey.language === 'ar'
    }, /*#__PURE__*/React.createElement(SurveyScreenLayout, {
      survey: survey,
      pageIndex: pageIndex,
      onClose: onClose,
      onNextPage: handleNextPage,
      onPrevPage: handlePrevPage,
      onSubmit: handleSubmit,
      onUpload: handleUpload,
      isUploading: isUploading,
      preview: preview
    }));
  }), /*#__PURE__*/React.createElement(ScreenWrapper, {
    visible: endScreenvisible,
    isOnTop: endScreenvisible,
    rtl: survey.language === 'ar'
  }, /*#__PURE__*/React.createElement(EndScreen, {
    error: error,
    surveyFeedback: surveyFeedback,
    onClose: onClose
  }))), /*#__PURE__*/React.createElement(ActivityIndicatorMask, {
    loading: loading
  }));
};
const SurveyStack = ({
  preview
}) => {
  const {
    survey,
    onClose
  } = useSurveyContext();
  // check if survey data is valid
  if (noData(survey.pages) || noData(survey.surveyProperty) || noData(survey.surveyStartDate) || noData(survey.surveyEndDate)) {
    // need to render placeholder
    return /*#__PURE__*/React.createElement(ErrorHintScreen, {
      onClose: onClose
    }, /*#__PURE__*/React.createElement(PlaceholderScreen, {
      imageType: PlaceholderImageTypes.ProgramUnavailable,
      message: i18n.t('start-survey:placeholder-message')
    }));
  }
  return /*#__PURE__*/React.createElement(Stack, {
    preview: preview
  });
};
export default SurveyStack;
const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  }
});
//# sourceMappingURL=SurveyStack.js.map