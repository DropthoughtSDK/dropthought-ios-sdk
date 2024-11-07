import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Colors } from '../styles';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { scaleLogic } from '../utils/data';
import LottieView from 'lottie-react-native';
import SurveyFooter from '../containers/SurveyFooter';
import SurveyHeader from '../containers/SurveyHeader';
import RotaryPhonePicker from './RotaryPhonePicker';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import MandatoryTitle from './MandatoryTitle';
import { isNil, repeat } from 'ramda';
const animations = [require('../assets/animations/smiley_option6/option6_1.json'), require('../assets/animations/smiley_option6/option6_2.json'), require('../assets/animations/smiley_option6/option6_3.json'), require('../assets/animations/smiley_option6/option6_4.json'), require('../assets/animations/smiley_option6/option6_5.json')];
const SmileyRatingQuestionOption6 = ({
  survey,
  pageIndex,
  question,
  forgot,
  onClose,
  onPrevPage,
  onNextPage,
  onFeedback,
  feedback,
  isLastPage
}) => {
  const answered = feedback && feedback.answers && !isNil(feedback.answers[0]) && typeof feedback.answers[0] === 'number';
  const answeredValue = answered && feedback.answers[0] ? parseInt(feedback.answers[0], 10) : 0;
  const [selectedIndex, setSelectedIndex] = useState(answered ? answeredValue : -1);
  const {
    questionId,
    scale,
    options
  } = question;
  const scaleLogicList = scaleLogic[scale];
  const descriptions = scaleLogicList === null || scaleLogicList === void 0 ? void 0 : scaleLogicList.map((_, index) => options[index]);

  // We through the null text string to keep blank to make it as same as the rotary dial design.
  const lotties = useMemo(() => {
    let result = [''];
    if (scaleLogicList) {
      scaleLogicList.forEach(scaleIndex => {
        result = [...result, animations[scaleIndex]];
      });
      const remainDummy = 7 - scaleLogicList.length;
      result = [...result, ...repeat('', remainDummy)];
    }
    return result;
  }, [scaleLogicList]);
  const {
    hexCode,
    colorScheme,
    customFontColor
  } = useTheme();
  const totalScore = scale;
  const isAtCoverScreen = selectedIndex === -1;
  const updateScore = React.useCallback(currentIndex => {
    setSelectedIndex(currentIndex - 1);
    onFeedback({
      questionId,
      answers: [currentIndex - 1],
      type: 'rating'
    });
  }, [onFeedback, questionId]);
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const textColor = customFontColor === undefined || customFontColor === '' ? Colors.white : customFontColor;
  const scoreSelectedStyle = [styles.scoreSelected, {
    color: textColor
  }];
  const descStyle = [styles.desc, {
    color: textColor,
    lineHeight: i18n.language === 'te' ? 42 : undefined
  }];
  const scoreTotalStyle = [styles.scoreTotal, {
    color: textColor
  }];
  const hintTextStyle = [commonStyles.hintText, {
    color: textColor
  }];
  const backgroundImage = require('../assets/bg-option6.png');
  const imageStyle = {
    opacity: colorScheme === COLOR_SCHEMES.light ? 0.6 : 0
  };
  const lottieContainer = /*#__PURE__*/React.createElement(View, {
    accessibilityLabel: `selected_custom_dialer_${selectedIndex}`,
    style: commonStyles.lottieContainer
  }, selectedIndex > -1 && lotties[selectedIndex + 1] !== '' ? /*#__PURE__*/React.createElement(LottieView
  // @ts-ignore
  , {
    source: lotties[selectedIndex + 1],
    autoPlay: true,
    style: commonStyles.lottieContent
  }) : null);
  const scoreContainer = /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreText
  }, /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/custom_dialer_render_score",
    style: scoreSelectedStyle
  }, selectedIndex + 1), /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/custom_dialer_total_score",
    style: scoreTotalStyle
  }, '/' + totalScore)), /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/custom_dialer_score_desc",
    style: descStyle
  }, descriptions && descriptions[selectedIndex])));
  return /*#__PURE__*/React.createElement(ImageBackground, {
    source: backgroundImage,
    resizeMethod: "auto",
    style: commonStyles.imageBackground,
    imageStyle: imageStyle
  }, /*#__PURE__*/React.createElement(SurveyHeader, {
    survey: survey,
    pageIndex: pageIndex,
    question: question,
    onClose: onClose
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.container
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.contentContainer
  }, isAtCoverScreen ? /*#__PURE__*/React.createElement(View, {
    style: commonStyles.hintContainer
  }, /*#__PURE__*/React.createElement(Text, {
    testID: `test:id/custom_dialer_title_${colorScheme}`,
    style: hintTextStyle
  }, `${i18n.t('option6HintDescription:title')}`)) : /*#__PURE__*/React.createElement(React.Fragment, null, lottieContainer, scoreContainer))), /*#__PURE__*/React.createElement(SurveyFooter, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: isLastPage,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.picker
  }, /*#__PURE__*/React.createElement(RotaryPhonePicker, {
    list: lotties,
    scale: scale,
    selectedIndex: selectedIndex + 1,
    updateScore: updateScore
  })));
};
export default SmileyRatingQuestionOption6;
const commonStyles = StyleSheet.create({
  imageBackground: {
    backgroundColor: Colors.black,
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    opacity: 0.6
  },
  container: {
    flex: 1,
    paddingHorizontal: 42,
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentContainer: {
    width: '100%',
    flex: 5,
    alignItems: 'center'
  },
  hintContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  hintText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6
  },
  lottieContainer: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreContainer: {
    flex: 2,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  picker: {
    alignItems: 'center',
    height: 120
  },
  lottieContent: {
    width: '100%',
    height: '100%'
  }
});
const phoneStyles = StyleSheet.create({
  desc: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  scoreSelected: {
    fontSize: 90,
    textAlign: 'center',
    alignItems: 'baseline'
  },
  scoreTotal: {
    fontSize: 70,
    color: Colors.smileyRatingScoreGray
  }
});
const tabletStyles = StyleSheet.create({
  desc: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  scoreSelected: {
    fontSize: 74,
    textAlign: 'center',
    alignItems: 'baseline'
  },
  scoreTotal: {
    fontSize: 55,
    color: Colors.smileyRatingScoreGray
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption6.js.map