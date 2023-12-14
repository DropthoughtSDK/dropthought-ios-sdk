"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _data = require("../utils/data");

var _WheelPicker = _interopRequireDefault(require("./WheelPicker"));

var _SurveyFooter = _interopRequireDefault(require("../containers/SurveyFooter"));

var _SurveyHeader = _interopRequireDefault(require("../containers/SurveyHeader"));

var _lottieReactNative = _interopRequireDefault(require("lottie-react-native"));

var _theme = require("../contexts/theme");

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  const hasSelected = selectedIndex > -1;
  const scaleLogicList = _data.scaleLogic[scale];
  const lottieSelectedIndex = scaleLogicList[selectedIndex];

  const setSelectedAndFeedback = _react.default.useCallback(index => {
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
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const selectedBackgroundColor = colorScheme === _theme.COLOR_SCHEMES.dark ? _styles.Option1BackgroundColorDark : _styles.Option1BackgroundColor;
  const unselectedBackgroundColor = themeBackgroundColor;
  const backgroundColor = hasSelected ? selectedBackgroundColor[lottieSelectedIndex] : unselectedBackgroundColor;
  const questionContainerStyle = [commonStyles.container, {
    backgroundColor
  }];
  const hintTextStyle = [styles.hintText, {
    color: fontColor
  }];
  const itemTextStyle = [commonStyles.itemTextStyle, {
    color: fontColor,
    lineHeight: _translation.default.language === 'te' ? 40 : undefined
  }];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: questionContainerStyle
  }, feedback && hasSelected ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.infoContainer
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.centerContainer
  }, /*#__PURE__*/_react.default.createElement(_lottieReactNative.default, {
    source: lotties[lottieSelectedIndex],
    autoPlay: true,
    speed: 0.5
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.wheelContainer
  }, /*#__PURE__*/_react.default.createElement(_WheelPicker.default, {
    selectedIndex: selectedIndex,
    options: descriptions,
    onChange: index => {
      if (index > -1) handleSelected(index);
    },
    itemTextStyle: itemTextStyle,
    selectedIndicatorStyle: commonStyles.selectedIndicatorStyle,
    key: 'WheelPicker-descriptions',
    itemHeight: _reactNative.Platform.OS === 'android' ? 60 : _translation.default.language === 'te' ? 50 : undefined
  }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.infoContainer
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    forgot: forgot
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.centerContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: hintTextStyle
  }, _translation.default.t('option1HintDescription:title'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.wheelContainer
  }, /*#__PURE__*/_react.default.createElement(_WheelPicker.default, {
    selectedIndex: 0,
    options: dummyDescroptions,
    onChange: index => {
      handleSelected(index - 1);
    },
    itemTextStyle: itemTextStyle,
    selectedIndicatorStyle: commonStyles.selectedIndicatorStyle,
    key: 'WheelPicker-dummyDescroptions',
    itemHeight: _reactNative.Platform.OS === 'android' ? 60 : _translation.default.language === 'te' ? 50 : undefined
  })))), /*#__PURE__*/_react.default.createElement(_SurveyFooter.default, {
    submitSurvey: survey.submitSurvey,
    surveyColor: hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage,
    backgroundColor: backgroundColor
  }));
};

var _default = /*#__PURE__*/_react.default.memo(SmileyRatingQuestionOption2);

exports.default = _default;

const commonStyles = _reactNative.StyleSheet.create({
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

const phoneStyles = _reactNative.StyleSheet.create({
  hintText: {
    fontSize: 16,
    fontWeight: '500'
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  hintText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption2.js.map