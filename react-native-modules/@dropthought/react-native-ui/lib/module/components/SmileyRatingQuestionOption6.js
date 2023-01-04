import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
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
const animations = [require('../assets/animations/smiley_option6/option6_1.json'), require('../assets/animations/smiley_option6/option6_2.json'), require('../assets/animations/smiley_option6/option6_3.json'), require('../assets/animations/smiley_option6/option6_4.json'), require('../assets/animations/smiley_option6/option6_5.json')]; // We through the null text string to keep blank to make it as same as the rotary dial design.

const lotties = new Array(8).fill('');

const SmileyRatingQuestionOption6 = ({
  survey,
  pageIndex,
  question,
  forgot,
  onClose,
  onPrevPage,
  onNextPage,
  onFeedback
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [score, setScore] = React.useState(-1);
  const {
    questionId,
    scale,
    options
  } = question;
  const scaleLogicList = scaleLogic[scale];
  const descriptions = scaleLogicList.map((_, index) => options[index]);
  useEffect(() => {
    lotties.forEach((value, index) => {
      if (index === 0 || index > scaleLogicList.length) {
        lotties[index] = value;
      } else {
        const scaleIndex = scaleLogicList[index - 1];
        lotties[index] = animations[scaleIndex];
      }
    });
  }, [scaleLogicList]);
  const {
    colorScheme,
    customFontColor
  } = useTheme();
  const totalScore = scale;
  const renderScore = score;
  const isAtCoverScreen = score === -1;
  const updateScore = React.useCallback(currentIndex => {
    setScore(currentIndex);
    setSelectedIndex(currentIndex);
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
    color: textColor
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
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/React.createElement(LottieView, {
    source: lotties[selectedIndex],
    autoPlay: true
  }));
  const scoreContainer = /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreText
  }, /*#__PURE__*/React.createElement(Text, {
    style: scoreSelectedStyle
  }, renderScore), /*#__PURE__*/React.createElement(Text, {
    style: scoreTotalStyle
  }, '/' + totalScore)), /*#__PURE__*/React.createElement(Text, {
    style: descStyle
  }, descriptions[selectedIndex - 1])));
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
    forgot: forgot
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.contentContainer
  }, isAtCoverScreen ? /*#__PURE__*/React.createElement(View, {
    style: commonStyles.hintContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: hintTextStyle
  }, i18n.t('option6HintDescription:title'))) : /*#__PURE__*/React.createElement(React.Fragment, null, lottieContainer, scoreContainer))), /*#__PURE__*/React.createElement(SurveyFooter, {
    surveyColor: survey.surveyProperty.hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage
  }), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.picker
  }, /*#__PURE__*/React.createElement(RotaryPhonePicker, {
    list: lotties,
    scale: scale,
    selectedIndex: selectedIndex,
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