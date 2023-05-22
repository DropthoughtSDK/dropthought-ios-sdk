"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));

var _styles = _interopRequireWildcard(require("../styles"));

var _theme = require("../contexts/theme");

var _SliderDragQuestionConstants = require("../constants/SliderDragQuestionConstants");

var _Slider = _interopRequireDefault(require("../components/Slider"));

var _ramda = require("ramda");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ThumbComponent = ({
  isDark
}) => {
  const thumbStyle = [styles.thumb, {
    shadowColor: isDark ? '#000' : '#aaa',
    backgroundColor: isDark ? _styles.Colors.rankingCheckBoxBorder : _styles.Colors.white
  }];
  const thumbContentStyle = [styles.thumbContent, {
    backgroundColor: isDark ? _styles.Colors.rankingBGDark : _styles.Colors.rankingContainerBorder
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: thumbStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: thumbContentStyle
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: thumbContentStyle
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: thumbContentStyle
  }));
};

const AboveThumbComponent = ({
  value,
  question,
  hasEdited
}) => {
  if (!hasEdited) {
    return null;
  }

  const {
    scale: stringScale,
    minScale: stringMinScale
  } = question;
  const maxScale = Number(stringScale);
  const minScale = Number(stringMinScale);
  const face = (0, _SliderDragQuestionConstants.sliderRatingAboveThumbFace)(minScale, value[0], maxScale);
  const containerStyle = {
    transform: [{
      translateX: -50
    }, {
      translateY: 10
    }]
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
    style: styles.aboveThumbContainer,
    source: require( // @ts-ignore
    '../assets/ic_slider_above_thumb.png')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.aboveThumbContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: face
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.aboveThumbText
  }, value))));
};

const ClassicSliderDragRatingQuestion = ({
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const {
    scale: stringScale,
    options = [],
    questionId,
    minScale: stringMinScale,
    includeCenterLabel,
    includeCustomLabel
  } = question;
  const maxScale = Number(stringScale);
  const minScale = Number(stringMinScale);

  const [value, setValue] = _react.default.useState([minScale]);

  const [valueInput, setInputValue] = _react.default.useState();

  const [hasEdited, setHasEdited] = _react.default.useState(false);

  const [focus, setFocus] = _react.default.useState(false);

  const total = maxScale - minScale + 1;
  const middle = Math.round((maxScale + minScale) / 2);
  const isDark = colorScheme === _theme.COLOR_SCHEMES.dark;

  const onFeedbackHandler = _react.default.useCallback(() => {
    setHasEdited(true);
    setFocus(false);
    let submitValue = valueInput || 0;

    if (submitValue > maxScale) {
      setValue([maxScale]);
      setInputValue(maxScale);
      submitValue = maxScale;
    } else if (submitValue < minScale) {
      setValue([minScale]);
      setInputValue(minScale);
      submitValue = minScale;
    } else {
      setValue([submitValue]);
    }

    onFeedback({
      questionId: questionId,
      answers: [submitValue - 1],
      type: 'ratingSlider'
    });
  }, [valueInput, maxScale, minScale, onFeedback, questionId]);

  const getInitialSelectedValueFromFeedbackProps = () => {
    if (feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0])) {
      const {
        answers
      } = feedback;
      const prevAnswer = typeof answers[0] === 'string' ? parseInt(answers[0], 10) : answers[0];
      setValue([prevAnswer + 1]);
      setInputValue(prevAnswer + 1);
      setHasEdited(true);
    }
  };

  _react.default.useEffect(() => {
    getInitialSelectedValueFromFeedbackProps(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputRef = _react.default.useRef(null);

  _react.default.useEffect(() => {
    const keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
      if (focus) {
        var _inputRef$current;

        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.blur();
        onFeedbackHandler();
      }
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [focus, onFeedbackHandler]);

  const inputStyle = {
    color: fontColor,
    borderColor: isDark ? _styles.Colors.rankingContainerBgDark : _styles.Colors.rankingContainerBorder
  };
  const trackStyle = { ...styles.track,
    backgroundColor: isDark ? _styles.Colors.rankingContainerBgDark : _styles.Colors.rankingBorder
  };
  const activeMarkStyle = { ...styles.activeMark,
    opacity: isDark ? 0.3 : 1
  };

  const textField = /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    ref: inputRef,
    style: [styles.input, inputStyle],
    onChangeText: text => {
      const formatText = Number(text.replace(/[^0-9]/g, ''));
      setInputValue(formatText);
      setFocus(true);
    },
    onFocus: () => setFocus(true),
    defaultValue: "",
    value: valueInput === null || valueInput === void 0 ? void 0 : valueInput.toString(),
    placeholder: "--",
    placeholderTextColor: fontColor,
    keyboardType: "numeric"
  });

  const slider = /*#__PURE__*/_react.default.createElement(_Slider.default, {
    value: value[0],
    setValue: setValue,
    trackMarks: total % 2 === 0 ? [middle - 0.5] : [middle],
    trackMarkStyles: {
      inactiveMark: {},
      activeMark: includeCenterLabel ? activeMarkStyle : styles.disappearMark
    },
    maximumValue: maxScale,
    minimumValue: minScale,
    step: 1,
    animateTransitions: true,
    minimumTrackTintColor: themeColor,
    renderThumbComponent: () => /*#__PURE__*/_react.default.createElement(ThumbComponent, {
      isDark: isDark
    }),
    trackStyle: trackStyle,
    renderAboveThumbComponent: () => /*#__PURE__*/_react.default.createElement(AboveThumbComponent, {
      value: value,
      question: question,
      hasEdited: hasEdited
    }),
    onSlidingStart: () => {
      if (!hasEdited) {
        setHasEdited(true);
      }
    },
    onCustomValueChange: () => {
      setInputValue(value[0]);
    },
    onSlidingComplete: input => {
      const inputNumber = typeof input !== 'number' ? input[0] : 0;
      setInputValue(inputNumber);
      setFocus(false);
      onFeedback({
        questionId: questionId,
        answers: [inputNumber - 1],
        type: 'ratingSlider'
      });
    },
    animationType: "timing"
  });

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: forgot,
    question: question,
    style: styles.mandatoryTitle
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.sliderLabelContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.flex1, _styles.default.flexEnd]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.sliderLabel, _styles.default.textAlignLeft]
  }, includeCustomLabel ? options[0] : minScale)), includeCenterLabel ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.flex1, _styles.default.flexEnd]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sliderLabel
  }, includeCustomLabel ? options[1] : middle)) : null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.flex1, _styles.default.flexEnd]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.sliderLabel, _styles.default.textAlignRight]
  }, includeCustomLabel ? options[options.length - 1] : maxScale)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.dummyLabel
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.flex1
  }, slider), textField)));
};

var _default = /*#__PURE__*/_react.default.memo(ClassicSliderDragRatingQuestion);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  questionContainer: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 48,
    marginBottom: 32,
    padding: 10
  },
  container: {
    marginLeft: 14
  },
  mandatoryTitle: {
    marginBottom: 50
  },
  sliderLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sliderLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: _styles.Colors.sliderLabel,
    textAlign: 'center'
  },
  dummyLabel: {
    width: 48,
    height: 10,
    marginLeft: 26
  },
  input: {
    height: 32,
    width: 48,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingVertical: 8,
    paddingLeft: 12,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400'
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  track: {
    borderRadius: 8,
    height: 16
  },
  thumb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 40,
    height: 32,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.7,
    shadowRadius: 1.5,
    elevation: 4
  },
  thumbContent: {
    height: '100%',
    width: 3,
    borderRadius: 2
  },
  aboveThumbContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    width: 102,
    height: 86
  },
  aboveThumbContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24
  },
  aboveThumbText: {
    fontSize: 16,
    fontWeight: '400',
    color: _styles.Colors.black
  },
  disappearMark: {
    width: 0
  },
  activeMark: {
    backgroundColor: _styles.Colors.rankingContainerBorder,
    width: 2,
    height: 10,
    left: 40 / 2 - 2
  }
});
//# sourceMappingURL=ClassicSliderDragRatingQuestion.js.map