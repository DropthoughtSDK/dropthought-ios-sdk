"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _lottieReactNative = _interopRequireDefault(require("lottie-react-native"));

var _SurveyFooter = _interopRequireDefault(require("../containers/SurveyFooter"));

var _SurveyHeader = _interopRequireDefault(require("../containers/SurveyHeader"));

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

var _theme = require("../contexts/theme");

var _data = require("../utils/data");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  const answered = feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0]) && typeof feedback.answers[0] === 'number';
  const answeredValue = answered ? parseInt(feedback.answers[0], 10) : 0;
  const {
    backgroundColor: themeBackgroundColor,
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();

  const windowHeight = _reactNative.Dimensions.get('window').height;

  const {
    questionId,
    scale,
    options
  } = question;

  const [selectedIndex, setSelectedIndex] = _react.default.useState(answered ? answeredValue : 0);

  const [score, setScore] = _react.default.useState(answered ? answeredValue : -1);

  const [loopLotties, setLoopLotties] = _react.default.useState([]);

  const scoreContainerOpacity = _react.default.useRef(new _reactNative.Animated.Value(answered ? 1 : 0)).current;

  const scoreOpacity = _react.default.useRef(new _reactNative.Animated.Value(answered ? 1 : 0)).current;

  const descriptionYAxis = _react.default.useRef(new _reactNative.Animated.Value(answered ? 1 : windowHeight / 2 - 246 + 37)).current; // 37 -> one text line height
  // 246 -> Padding Vertical 123


  const lottieRef = _react.default.useRef();

  const totalScore = Number(scale);
  const renderScore = score + 1;
  const backgroundColorList = ['#fef6f6', //red
  '#fff9f9', //red
  '#f3f9fe', //blue
  '#f5fdfb', //green
  '#f3fcfa' //green
  ];

  const panResponder = _reactNative.PanResponder.create({
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


  const scaleLogicList = _data.scaleLogic[scale];
  const scaledIndex = scaleLogicList[selectedIndex];
  (0, _react.useEffect)(() => {
    const loopList = scaleLogicList.map(value => {
      const scaleKey = String(value + 1);
      return _data.option3LoopFaceTable.get(scaleKey);
    });
    setLoopLotties(loopList);
  }, [scaleLogicList]);

  const updateScore = _react.default.useCallback(number => {
    const isAtCoverScreen = score === -1;
    const newScore = score + number;
    setScore(newScore);

    if (!isAtCoverScreen) {
      setSelectedIndex(newScore);
    } //animtaion--


    scoreOpacity.setValue(0);

    if (isAtCoverScreen) {
      _reactNative.Animated.sequence([_reactNative.Animated.timing(descriptionYAxis, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }), _reactNative.Animated.timing(scoreContainerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }), _reactNative.Animated.timing(scoreOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })]).start();
    } else {
      _reactNative.Animated.timing(scoreOpacity, {
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

  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const animationBackgroundColor = score >= 0 ? backgroundColorList[scaledIndex] : _styles.Colors.white;
  const backgroundColor = colorScheme === _theme.COLOR_SCHEMES.dark ? themeBackgroundColor : animationBackgroundColor;
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
    marginBottom: _reactNative.Platform.OS === 'ios' ? 10 : -1
  }];
  const scoreTotalStyle = [styles.scoreTotal, {
    opacity: scoreContainerOpacity,
    marginBottom: _reactNative.Platform.OS === 'ios' ? 4 : -3
  }];
  const containerStyle = [commonStyles.container, {
    backgroundColor
  }];
  const hintContainerStyle = score >= 0 ? commonStyles.hintContainer : commonStyles.initHintContainer;
  const hintTextStyle = [commonStyles.hintText, {
    color: fontColor
  }];

  const lottieContainer = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/_react.default.createElement(_lottieReactNative.default // @ts-ignore
  , {
    ref: lottieRef,
    source: loopLotties[selectedIndex],
    autoPlay: true,
    style: commonStyles.lottieContent,
    loop: true,
    speed: 0.5
  }));

  const scoreContainer = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.scoreText
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.Text, {
    style: scoreSelectedStyle
  }, renderScore), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.Text, {
    style: slashStyle
  }, '/'), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.Text, {
    style: scoreTotalStyle
  }, totalScore)), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.Text, {
    style: descStyle
  }, options[selectedIndex]));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: containerStyle
  }, panResponder.panHandlers), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.contentContainer
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    forgot: forgot
  }), score >= 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, lottieContainer, scoreContainer) : null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: hintContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: hintTextStyle
  }, _translation.default.t('option3HintDescription:title'))))), /*#__PURE__*/_react.default.createElement(_SurveyFooter.default, {
    surveyColor: survey.surveyProperty.hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage,
    backgroundColor: backgroundColor
  }));
};

var _default = SmileyRatingQuestionOption3;
exports.default = _default;

const commonStyles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _styles.Colors.white,
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
    marginTop: 42
  },
  lottieContent: {
    width: '60%'
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

const phoneStyles = _reactNative.StyleSheet.create({
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
    color: _styles.Colors.smileyRatingScoreGray
  },
  slash: {
    fontSize: 37,
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
  },
  slash: {
    fontSize: 37,
    color: _styles.Colors.smileyRatingScoreGray
  }
});
//# sourceMappingURL=SmileyRatingQuestionOption3.js.map