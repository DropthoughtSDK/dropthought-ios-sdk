function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions, PanResponder, Platform } from 'react-native';
import { Colors } from '../styles';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import LottieView from 'lottie-react-native';
import SurveyFooter from '../containers/SurveyFooter';
import SurveyHeader from '../containers/SurveyHeader';
import MandatoryTitle from './MandatoryTitle';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import { scaleLogic, option3LoopFaceTable as loopFaceTable } from '../utils/data';
import { isNil } from 'ramda';

const SmileyRatingQuestionOption3 = ({
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
  const windowHeight = Dimensions.get('window').height;
  const {
    questionId,
    scale,
    options
  } = question;
  const [selectedIndex, setSelectedIndex] = React.useState(answered ? answeredValue : 0);
  const [score, setScore] = React.useState(answered ? answeredValue : -1);
  const [loopLotties, setLoopLotties] = React.useState([]);
  const scoreContainerOpacity = React.useRef(new Animated.Value(answered ? 1 : 0)).current;
  const scoreOpacity = React.useRef(new Animated.Value(answered ? 1 : 0)).current;
  const descriptionYAxis = React.useRef(new Animated.Value(answered ? 1 : windowHeight / 2 - 246 + 37)).current; // 37 -> one text line height
  // 246 -> Padding Vertical 123

  const lottieRef = React.useRef();
  const totalScore = Number(scale);
  const renderScore = score + 1;
  const backgroundColorList = ['#fef6f6', //red
  '#fff9f9', //red
  '#f3f9fe', //blue
  '#f5fdfb', //green
  '#f3fcfa' //green
  ];
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, {
      dy
    }) => {
      const direction = Math.sign(dy);
      const isActionActive = Math.abs(dy) > 100;

      if (isActionActive) {
        if (direction === 1 && score > 0) {
          updateScore(-1);
        } else if (direction !== 1 && renderScore < totalScore) {
          updateScore(1);
        }
      }
    }
  }); // choose which scale logic we want to use.

  const scaleLogicList = scaleLogic[scale];
  const scaledIndex = scaleLogicList[selectedIndex];
  useEffect(() => {
    const loopList = scaleLogicList.map(value => {
      const scaleKey = String(value + 1);
      return loopFaceTable.get(scaleKey);
    });
    setLoopLotties(loopList);
  }, [scaleLogicList]);
  const updateScore = React.useCallback(number => {
    const isAtCoverScreen = score === -1;
    const newScore = score + number;
    setScore(newScore);

    if (!isAtCoverScreen) {
      setSelectedIndex(newScore);
    } //animtaion--


    scoreOpacity.setValue(0);

    if (isAtCoverScreen) {
      Animated.sequence([Animated.timing(descriptionYAxis, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }), Animated.timing(scoreContainerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }), Animated.timing(scoreOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })]).start();
    } else {
      Animated.timing(scoreOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    } //animtaion--


    onFeedback({
      questionId,
      answers: [newScore],
      type: 'rating'
    });
  }, [score, scoreOpacity, onFeedback, questionId, descriptionYAxis, scoreContainerOpacity]);
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const animationBackgroundColor = score >= 0 ? backgroundColorList[scaledIndex] : Colors.white;
  const backgroundColor = colorScheme === COLOR_SCHEMES.dark ? themeBackgroundColor : animationBackgroundColor;
  const scoreSelectedStyle = [styles.scoreSelected, {
    opacity: scoreOpacity,
    color: fontColor
  }];
  const descStyle = [styles.desc, {
    transform: [{
      translateY: descriptionYAxis
    }],
    opacity: scoreContainerOpacity,
    color: fontColor
  }];
  const slashStyle = [styles.slash, {
    opacity: scoreContainerOpacity,
    marginBottom: Platform.OS === 'ios' ? 10 : -1
  }];
  const scoreTotalStyle = [styles.scoreTotal, {
    opacity: scoreContainerOpacity,
    marginBottom: Platform.OS === 'ios' ? 4 : -3
  }];
  const containerStyle = [commonStyles.container, {
    backgroundColor
  }];
  const hintContainerStyle = score >= 0 ? commonStyles.hintContainer : commonStyles.initHintContainer;
  const hintTextStyle = [commonStyles.hintText, {
    color: fontColor
  }];
  const lottieContainer = /*#__PURE__*/React.createElement(View, {
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/React.createElement(LottieView // @ts-ignore
  , {
    ref: lottieRef,
    source: loopLotties[selectedIndex],
    autoPlay: true,
    loop: true,
    speed: 0.5
  }));
  const scoreContainer = /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: commonStyles.scoreText
  }, /*#__PURE__*/React.createElement(Animated.Text, {
    style: scoreSelectedStyle
  }, renderScore), /*#__PURE__*/React.createElement(Animated.Text, {
    style: slashStyle
  }, '/'), /*#__PURE__*/React.createElement(Animated.Text, {
    style: scoreTotalStyle
  }, totalScore)), /*#__PURE__*/React.createElement(Animated.Text, {
    style: descStyle
  }, options[selectedIndex]));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SurveyHeader, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onClose
  }), /*#__PURE__*/React.createElement(View, _extends({
    style: containerStyle
  }, panResponder.panHandlers), /*#__PURE__*/React.createElement(View, {
    style: commonStyles.contentContainer
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), score >= 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, lottieContainer, scoreContainer) : null, /*#__PURE__*/React.createElement(View, {
    style: hintContainerStyle
  }, /*#__PURE__*/React.createElement(Text, {
    style: hintTextStyle
  }, i18n.t('option3HintDescription:title'))))), /*#__PURE__*/React.createElement(SurveyFooter, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage,
    backgroundColor: backgroundColor
  }));
};

export default SmileyRatingQuestionOption3;
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 28
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 42,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  hintContainer: {
    width: '100%'
  },
  initHintContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  hintText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  lottieContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.2
  },
  scoreContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  scoreText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 61,
    marginBottom: 10
  }
});
const phoneStyles = StyleSheet.create({
  desc: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  scoreSelected: {
    fontSize: 50,
    textAlign: 'center',
    alignItems: 'baseline'
  },
  scoreTotal: {
    fontSize: 37,
    color: Colors.smileyRatingScoreGray
  },
  slash: {
    fontSize: 37,
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
  },
  slash: {
    fontSize: 37,
    color: Colors.smileyRatingScoreGray
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption3.js.map