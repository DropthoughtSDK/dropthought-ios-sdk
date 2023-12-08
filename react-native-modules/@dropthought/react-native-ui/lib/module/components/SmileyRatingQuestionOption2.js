import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Option1BackgroundColor, Option1BackgroundColorDark } from '../styles';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { scaleLogic } from '../utils/data';
import WheelPicker from './WheelPicker';
import SurveyFooter from '../containers/SurveyFooter';
import SurveyHeader from '../containers/SurveyHeader';
import LottieView from 'lottie-react-native';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import MandatoryTitle from './MandatoryTitle';
import { isNil } from 'ramda';
const lotties = [require('../assets/animations/smiley_option1/option1_1.json'), require('../assets/animations/smiley_option1/option1_2.json'), require('../assets/animations/smiley_option1/option1_3.json'), require('../assets/animations/smiley_option1/option1_4.json'), require('../assets/animations/smiley_option1/option1_5.json')];

const SmileyRatingQuestionOption2 = ({
  survey,
  pageIndex,
  question,
  forgot,
  onClose,
  onPrevPage,
  onNextPage,
  onFeedback,
  feedback
}) => {
  const answered = feedback && feedback.answers && !isNil(feedback.answers[0]) && typeof feedback.answers[0] === 'number';
  const answeredValue = answered ? parseInt(feedback.answers[0], 10) : 0;
  const {
    hexCode,
    backgroundColor: themeBackgroundColor,
    fontColor,
    colorScheme
  } = useTheme();
  const {
    questionId,
    options,
    scale
  } = question;
  const [selectedIndex, setSelectedIndex] = React.useState(answered ? answeredValue : -1);
  const hasSelected = selectedIndex > -1;
  const scaleLogicList = scaleLogic[scale];
  const lottieSelectedIndex = scaleLogicList[selectedIndex];
  const setSelectedAndFeedback = React.useCallback(index => {
    onFeedback({
      questionId,
      answers: [index],
      type: 'rating'
    });
  }, [onFeedback, questionId]);

  const handleSelected = index => {
    setSelectedIndex(index);
    setSelectedAndFeedback(index);
  };

  const descriptions = scaleLogicList.map((_, index) => options[index]);
  const dummyDescroptions = ['Select', ...descriptions];
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const selectedBackgroundColor = colorScheme === COLOR_SCHEMES.dark ? Option1BackgroundColorDark : Option1BackgroundColor;
  const unselectedBackgroundColor = themeBackgroundColor;
  const backgroundColor = hasSelected ? selectedBackgroundColor[lottieSelectedIndex] : unselectedBackgroundColor;
  const questionContainerStyle = [commonStyles.container, {
    backgroundColor
  }];
  const hintTextStyle = [styles.hintText, {
    color: fontColor
  }];
  const itemTextStyle = [commonStyles.itemTextStyle, {
    color: fontColor
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SurveyHeader, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onClose
  }), /*#__PURE__*/React.createElement(View, {
    style: questionContainerStyle
  }, feedback && hasSelected ? /*#__PURE__*/React.createElement(View, {
    style: commonStyles.infoContainer
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.centerContainer
  }, /*#__PURE__*/React.createElement(LottieView, {
    source: lotties[lottieSelectedIndex],
    autoPlay: true,
    speed: 0.5
  })), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.wheelContainer
  }, /*#__PURE__*/React.createElement(WheelPicker, {
    selectedIndex: selectedIndex,
    options: descriptions,
    onChange: index => {
      if (index > -1) handleSelected(index);
    },
    itemTextStyle: itemTextStyle,
    selectedIndicatorStyle: commonStyles.selectedIndicatorStyle,
    key: 'WheelPicker-descriptions',
    itemHeight: Platform.OS === 'android' ? 60 : undefined
  }))) : /*#__PURE__*/React.createElement(View, {
    style: commonStyles.infoContainer
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.centerContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: hintTextStyle
  }, i18n.t('option1HintDescription:title'))), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.wheelContainer
  }, /*#__PURE__*/React.createElement(WheelPicker, {
    selectedIndex: 0,
    options: dummyDescroptions,
    onChange: index => {
      handleSelected(index - 1);
    },
    itemTextStyle: itemTextStyle,
    selectedIndicatorStyle: commonStyles.selectedIndicatorStyle,
    key: 'WheelPicker-dummyDescroptions',
    itemHeight: Platform.OS === 'android' ? 60 : undefined
  })))), /*#__PURE__*/React.createElement(SurveyFooter, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage,
    backgroundColor: backgroundColor
  }));
};

export default /*#__PURE__*/React.memo(SmileyRatingQuestionOption2);
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    height: '100%'
  },
  infoContainer: {
    height: '100%'
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%'
  },
  wheelContainer: {
    flex: 1
  },
  selectedIndicatorStyle: {
    opacity: 0
  },
  itemTextStyle: {
    fontSize: 24,
    paddingVertical: 9,
    width: '100%',
    textAlign: 'center'
  }
});
const phoneStyles = StyleSheet.create({
  hintText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
const tabletStyles = StyleSheet.create({
  hintText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption2.js.map