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

var _theme = require("../contexts/theme");

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

var _data = require("../utils/data");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SmileyRatingQuestionOption4 = ({
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

  const windowHeight = _reactNative.Dimensions.get('window').height;

  const {
    questionId,
    scale,
    options
  } = question;

  const [selectedIndex, setSelectedIndex] = _react.default.useState(answered ? answeredValue : 0);

  const [score, setScore] = _react.default.useState(answered ? answeredValue : -1);

  const [isLoop, setIsLoop] = _react.default.useState(true);

  const [loopLotties, setLoopLotties] = _react.default.useState([]);

  const [transformLotties, setTransformLotties] = _react.default.useState([]);

  const scoreContainerOpacity = _react.default.useRef(new _reactNative.Animated.Value(answered ? 1 : 0)).current;

  const scoreOpacity = _react.default.useRef(new _reactNative.Animated.Value(answered ? 1 : 0)).current;

  const descriptionYAxis = _react.default.useRef(new _reactNative.Animated.Value(answered ? 1 : windowHeight / 2 - 246 + 37)).current; // 37 -> one text line height
  // 246 -> Padding Vertical 123


  const lottieRef = _react.default.useRef();

  const totalScore = Number(scale);
  const renderScore = score + 1;
  const hasEdited = score >= 0; // choose which scale logic we want to use.

  const scaleLogicList = _data.scaleLogic[scale];
  (0, _react.useEffect)(() => {
    const loopList = scaleLogicList.map((value, index) => {
      const scaleKey = String(index + 1) + _data.option4FaceTable[value];

      return _data.option4LoopFaceTable.get(scaleKey);
    });
    const transformList = scaleLogicList.map((value, index, array) => {
      if (index === 0) return '';

      const fromScale = String(index) + _data.option4FaceTable[array[index - 1]];

      const toScale = String(index + 1) + _data.option4FaceTable[value];

      const key = `${fromScale}-${toScale}`;
      return _data.option4TransformTable.get(key);
    });
    setLoopLotties(loopList);
    setTransformLotties(transformList);
  }, [scaleLogicList]);

  const imageLignt = require('../assets/icOption4Info.png');

  const imageDark = require('../assets/icOption4InfoDark.png');

  const updateScore = _react.default.useCallback(number => {
    const isAtCoverScreen = score === -1;
    const newScore = score + number;
    setScore(newScore);

    if (!isAtCoverScreen) {
      setSelectedIndex(newScore);

      if (number > 0) {
        setIsLoop(false);
      } else {
        setIsLoop(true);
        setTimeout(() => {
          var _lottieRef$current;

          (_lottieRef$current = lottieRef.current) === null || _lottieRef$current === void 0 ? void 0 : _lottieRef$current.play();
        }, 100);
      }
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

  const {
    backgroundColor,
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const containerStyle = [commonStyles.container, {
    backgroundColor
  }];
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
    marginBottom: _reactNative.Platform.OS === 'ios' ? 14 : 7
  }];
  const scoreTotalStyle = [styles.scoreTotal, {
    opacity: scoreContainerOpacity,
    marginBottom: _reactNative.Platform.OS === 'ios' ? 5 : 4
  }];
  const hintContainerStyle = hasEdited ? null : commonStyles.hintContainer;
  const hintTextStyle = [commonStyles.hintText, {
    color: fontColor
  }];
  const hintSubTextStyle = [commonStyles.hintSubText, {
    color: fontColor
  }];
  (0, _react.useEffect)(() => {
    if (isLoop) {
      setTimeout(() => {
        var _lottieRef$current2;

        (_lottieRef$current2 = lottieRef.current) === null || _lottieRef$current2 === void 0 ? void 0 : _lottieRef$current2.play();
      }, 100);
    }
  }, [isLoop]);

  const handleDecreaseScore = () => {
    if (score > 0) updateScore(-1);
  };

  const lottieContainer = isLoop ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: handleDecreaseScore
  }, /*#__PURE__*/_react.default.createElement(_lottieReactNative.default // @ts-ignore
  , {
    ref: lottieRef,
    source: loopLotties[selectedIndex],
    autoPlay: true,
    loop: true
  }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.lottieContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: handleDecreaseScore
  }, /*#__PURE__*/_react.default.createElement(_lottieReactNative.default, {
    source: transformLotties[selectedIndex],
    autoPlay: true,
    loop: false,
    onAnimationFinish: isCancel => {
      if (!isCancel) setIsLoop(true);
    }
  })));

  const infoImage = /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: commonStyles.infoImage,
    source: colorScheme === _theme.COLOR_SCHEMES.dark ? imageDark : imageLignt
  });

  const scoreContainer = /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => {
      if (renderScore < totalScore) updateScore(1);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
  }, options[selectedIndex])));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SurveyHeader.default, {
    survey: survey,
    pageIndex: pageIndex,
    backgroundColor: backgroundColor,
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    question: question,
    forgot: forgot
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: commonStyles.contentContainer
  }, hasEdited ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, lottieContainer, scoreContainer) : null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: hintContainerStyle,
    disabled: score > -1,
    onPress: () => updateScore(1)
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, hasEdited ? null : infoImage, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: hintTextStyle
  }, _translation.default.t('option4HintDescription:title')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: hintSubTextStyle
  }, _translation.default.t('option4HintDescription:subTitle', {
    count: totalScore
  })))))), /*#__PURE__*/_react.default.createElement(_SurveyFooter.default, {
    surveyColor: survey.surveyProperty.hexCode,
    isFirstPage: pageIndex === 0,
    isLastPage: pageIndex === survey.pageOrder.length - 1,
    onPrevPage: onPrevPage,
    onNextPage: onNextPage,
    backgroundColor: backgroundColor
  }));
};

var _default = SmileyRatingQuestionOption4;
exports.default = _default;

const commonStyles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: _styles.Colors.white,
    paddingBottom: 7
  },
  contentContainer: {
    width: '100%',
    flex: 5,
    alignItems: 'center'
  },
  infoImage: {
    marginBottom: 30
  },
  hintContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hintText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6
  },
  hintSubText: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center'
  },
  lottieContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  scoreText: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
});

const phoneStyles = _reactNative.StyleSheet.create({
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
    fontSize: 55,
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
//# sourceMappingURL=SmileyRatingQuestionOption4.js.map