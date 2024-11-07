"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _styles = require("../styles");
var _translation = _interopRequireDefault(require("../translation"));
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _data = require("../utils/data");
var _lottieReactNative = _interopRequireDefault(require("lottie-react-native"));
var _SurveyFooter = _interopRequireDefault(require("../containers/SurveyFooter"));
var _SurveyHeader = _interopRequireDefault(require("../containers/SurveyHeader"));
var _RotaryPhonePicker = _interopRequireDefault(require("./RotaryPhonePicker"));
var _theme = require("../contexts/theme");
var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));
var _ramda = require("ramda");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const answered = feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0]) && typeof feedback.answers[0] === 'number';
  const answeredValue = answered && feedback.answers[0] ? parseInt(feedback.answers[0], 10) : 0;
  const [selectedIndex, setSelectedIndex] = (0, _react.useState)(answered ? answeredValue : -1);
  const {
    questionId,
    scale,
    options
  } = question;
  const scaleLogicList = _data.scaleLogic[scale];
  const descriptions = scaleLogicList === null || scaleLogicList === void 0 ? void 0 : scaleLogicList.map((_, index) => options[index]);

  // We through the null text string to keep blank to make it as same as the rotary dial design.
  const lotties = (0, _react.useMemo)(() => {
    let result = [''];
    if (scaleLogicList) {
      scaleLogicList.forEach(scaleIndex => {
        result = [...result, animations[scaleIndex]];
      });
      const remainDummy = 7 - scaleLogicList.length;
      result = [...result, ...(0, _ramda.repeat)('', remainDummy)];
    }
    return result;
  }, [scaleLogicList]);
  const {
    hexCode,
    colorScheme,
    customFontColor
  } = (0, _theme.useTheme)();
  const totalScore = scale;
  const isAtCoverScreen = selectedIndex === -1;
  const updateScore = _react.default.useCallback(currentIndex => {
    setSelectedIndex(currentIndex - 1);
    onFeedback({
      questionId,
      answers: [currentIndex - 1],
      type: 'rating'
    });
  }, [onFeedback, questionId]);
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const textColor = customFontColor === undefined || customFontColor === '' ? _styles.Colors.white : customFontColor;
  const scoreSelectedStyle = [styles.scoreSelected, {
    color: textColor
  }];
  const descStyle = [styles.desc, {
    color: textColor,
    lineHeight: _translation.default.language === 'te' ? 42 : undefined
  }];
  const scoreTotalStyle = [styles.scoreTotal, {
    color: textColor
  }];
  const hintTextStyle = [commonStyles.hintText, {
    color: textColor
  }];
  const backgroundImage = require('../assets/bg-option6.png');
  const imageStyle = {
    opacity: colorScheme === _theme.COLOR_SCHEMES.light ? 0.6 : 0
  };
  const lottieContainer = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    accessibilityLabel: `selected_custom_dialer_${selectedIndex}`,
    style: commonStyles.lottieContainer
  }, selectedIndex > -1 && lotties[selectedIndex + 1] !== '' ? /*#__PURE__*/_react.default.createElement(_lottieReactNative.default
  // @ts-ignore
  , {
    source: lotties[selectedIndex + 1],
    autoPlay: true,
    style: commonStyles.lottieContent
  }) : null);
  const scoreContainer = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreText
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/custom_dialer_render_score",
    style: scoreSelectedStyle
  }, selectedIndex + 1), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/custom_dialer_total_score",
    style: scoreTotalStyle
  }, '/' + totalScore)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/custom_dialer_score_desc",
    style: descStyle
  }, descriptions && descriptions[selectedIndex])));
  return /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    source: backgroundImage,
    resizeMethod: "auto",
    style: commonStyles.imageBackground,
    imageStyle: imageStyle
  }, /*#__PURE__*/_react.default.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    question: question,
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.container
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.contentContainer
  }, isAtCoverScreen ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.hintContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: `test:id/custom_dialer_title_${colorScheme}`,
    style: hintTextStyle
  }, `${_translation.default.t('option6HintDescription:title')}`)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, lottieContainer, scoreContainer))), /*#__PURE__*/_react.default.createElement(_SurveyFooter.default, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: isLastPage,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.picker
  }, /*#__PURE__*/_react.default.createElement(_RotaryPhonePicker.default, {
    list: lotties,
    scale: scale,
    selectedIndex: selectedIndex + 1,
    updateScore: updateScore
  })));
};
var _default = exports.default = SmileyRatingQuestionOption6;
const commonStyles = _reactNative.StyleSheet.create({
  imageBackground: {
    backgroundColor: _styles.Colors.black,
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
const phoneStyles = _reactNative.StyleSheet.create({
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
    color: _styles.Colors.smileyRatingScoreGray
  }
});
const tabletStyles = _reactNative.StyleSheet.create({
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
    color: _styles.Colors.smileyRatingScoreGray
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption6.js.map