import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
  const {
    backgroundColor: themeBackgroundColor,
    fontColor,
    colorScheme
  } = useTheme();
  const {
    questionId,
    options,
    scale
  } = question;
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
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
    forgot: forgot
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/React.createElement(LottieView, {
    source: lotties[lottieSelectedIndex],
    autoPlay: true,
    style: commonStyles.lottieContent,
    speed: 0.5
  }))) : /*#__PURE__*/React.createElement(View, {
    style: commonStyles.initInfoContainer
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    question: question,
    forgot: forgot
  }), /*#__PURE__*/React.createElement(Text, {
    style: hintTextStyle
  }, i18n.t('option1HintDescription:title')), /*#__PURE__*/React.createElement(View, null)), hasSelected ? /*#__PURE__*/React.createElement(WheelPicker, {
    selectedIndex: selectedIndex,
    options: descriptions,
    onChange: index => {
      if (index > -1) handleSelected(index);
    },
    itemTextStyle: itemTextStyle,
    selectedIndicatorStyle: commonStyles.selectedIndicatorStyle,
    key: 'WheelPicker-descriptions'
  }) : /*#__PURE__*/React.createElement(WheelPicker, {
    selectedIndex: 0,
    options: dummyDescroptions,
    onChange: index => {
      handleSelected(index - 1);
    },
    itemTextStyle: itemTextStyle,
    selectedIndicatorStyle: commonStyles.selectedIndicatorStyle,
    key: 'WheelPicker-dummyDescroptions'
  })), /*#__PURE__*/React.createElement(SurveyFooter, {
    surveyColor: survey.surveyProperty.hexCode,
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
    paddingHorizontal: 42,
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  initInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  lottieContent: {
    width: '100%'
  },
  selectedIndicatorStyle: {
    opacity: 0
  },
  itemTextStyle: {
    fontSize: 24,
    paddingVertical: 9
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