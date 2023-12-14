"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _ramda = require("ramda");

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _data = require("../utils/data");

var _SurveyFooter = _interopRequireDefault(require("../containers/SurveyFooter"));

var _SurveyHeader = _interopRequireDefault(require("../containers/SurveyHeader"));

var _lottieReactNative = _interopRequireDefault(require("lottie-react-native"));

var _theme = require("../contexts/theme");

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lotties = [require('../assets/animations/smiley_option1/option1_1.json'), require('../assets/animations/smiley_option1/option1_2.json'), require('../assets/animations/smiley_option1/option1_3.json'), require('../assets/animations/smiley_option1/option1_4.json'), require('../assets/animations/smiley_option1/option1_5.json')];

const getInitialSelectedValue = (feedback, question) => {
  let prevAnswer;

  if (feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0])) {
    prevAnswer = parseInt(feedback.answers[0], 10);
  }

  return question.options.map((_option, index) => prevAnswer === index);
};

const SmileyRatingQuestionOption1 = ({
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
  const answered = feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0]) && typeof feedback.answers[0] === 'number';
  const answeredValue = answered ? parseInt(feedback.answers[0], 10) : 0;
  const {
    hexCode,
    backgroundColor: themeBackgroundColor,
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const {
    questionId,
    options,
    scale
  } = question;

  const [selectedIndex, setSelectedIndex] = _react.default.useState(answered ? answeredValue : -1);

  const [selected, setSelected] = _react.default.useState(getInitialSelectedValue(feedback, question));

  const lottieSelectedIndex = _data.scaleLogic[scale][selectedIndex];
  const selectedBackgroundColor = colorScheme === _theme.COLOR_SCHEMES.dark ? _styles.Option1BackgroundColorDark : _styles.Option1BackgroundColor;
  const unselectedBackgroundColor = colorScheme === _theme.COLOR_SCHEMES.dark ? themeBackgroundColor : _styles.Colors.unSelectedBackground;
  const backgroundColor = feedback !== null && feedback !== void 0 && feedback.answers && (feedback === null || feedback === void 0 ? void 0 : feedback.answers.length) > 0 ? selectedBackgroundColor[lottieSelectedIndex] : unselectedBackgroundColor;

  const setSelectedAndFeedback = _react.default.useCallback(index => {
    setSelectedIndex(index);
    let selectedMap = options.map(() => false);
    selectedMap[index] = true;
    setSelected(selectedMap);
    onFeedback({
      questionId,
      answers: [index],
      type: 'rating'
    });
  }, [onFeedback, options, questionId]);

  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const smileyRowContainerStyle = [styles.smileyRowContainer, {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.dark ? (0, _styles.opacity10)(_styles.Colors.white) : (0, _styles.opacity60)(_styles.Colors.white)
  }];

  const ratingComponent = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: smileyRowContainerStyle
  }, options.map((_option, index) => {
    const isSelected = selected[index];
    const buttonStyle = isSelected ? [styles.optionContainer, {
      backgroundColor: _styles.Colors.black
    }] : [styles.optionContainer, {
      backgroundColor: colorScheme === _theme.COLOR_SCHEMES.dark ? (0, _styles.opacity10)(_styles.Colors.white) : _styles.Colors.white
    }];
    const textStyle = isSelected ? [styles.optionTitle, {
      color: _styles.Colors.white
    }] : [styles.optionTitle, {
      color: fontColor
    }];
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: buttonStyle,
      onPress: () => setSelectedAndFeedback(index),
      key: index.toString()
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: textStyle
    }, index + 1));
  }));

  const questionContainerStyle = [commonStyles.container, {
    backgroundColor
  }];
  const hintTextStyle = [styles.hintText, {
    color: fontColor
  }];
  const descStyle = [styles.desc, {
    color: fontColor,
    lineHeight: _translation.default.language === 'te' ? 42 : undefined
  }];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: questionContainerStyle
  }, feedback && selectedIndex >= 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.infoContainer
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/_react.default.createElement(_lottieReactNative.default, {
    source: lotties[lottieSelectedIndex],
    autoPlay: true,
    style: commonStyles.lottieContent,
    speed: 0.5
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: descStyle
  }, options[selectedIndex])) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.initInfoContainer
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.hintContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: hintTextStyle
  }, _translation.default.t('option1HintDescription:title')))), ratingComponent), /*#__PURE__*/_react.default.createElement(_SurveyFooter.default, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage,
    backgroundColor: backgroundColor
  }));
};

var _default = /*#__PURE__*/_react.default.memo(SmileyRatingQuestionOption1);

exports.default = _default;

const commonStyles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 42
  },
  infoContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  initInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
  hintContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
});

const phoneStyles = _reactNative.StyleSheet.create({
  containter: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 31,
    paddingHorizontal: 9
  },
  optionContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  optionTitle: {
    fontSize: 26,
    fontWeight: '600'
  },
  desc: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: '600'
  },
  hintText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  containter: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: (0, _styles.opacity60)(_styles.Colors.white),
    borderRadius: 31,
    paddingHorizontal: 9
  },
  optionContainer: {
    width: 50,
    height: 50,
    backgroundColor: _styles.Colors.white,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  optionTitle: {
    fontSize: 26,
    fontWeight: '600'
  },
  desc: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: '600'
  },
  hintText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption1.js.map