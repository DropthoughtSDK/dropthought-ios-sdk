import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Keyboard, TextInput, Image, ScrollView } from 'react-native';
import MandatoryTitle from './MandatoryTitle';
import GlobalStyle, { Colors } from '../styles';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import { sliderRatingAboveThumbFace } from '../constants/SliderDragQuestionConstants';
import CustomSlider from '../components/Slider';
import { isNil } from 'ramda';

const ThumbComponent = ({
  isDark
}) => {
  const thumbStyle = [styles.thumb, {
    shadowColor: isDark ? '#000' : '#aaa',
    backgroundColor: isDark ? Colors.rankingCheckBoxBorder : Colors.white
  }];
  const thumbContentStyle = [styles.thumbContent, {
    backgroundColor: isDark ? Colors.rankingBGDark : Colors.rankingContainerBorder
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: thumbStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: thumbContentStyle
  }), /*#__PURE__*/React.createElement(View, {
    style: thumbContentStyle
  }), /*#__PURE__*/React.createElement(View, {
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
  const face = sliderRatingAboveThumbFace(minScale, value[0], maxScale);
  const containerStyle = {
    transform: [{
      translateX: -50
    }, {
      translateY: 10
    }]
  };
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(ImageBackground, {
    style: styles.aboveThumbContainer,
    source: require( // @ts-ignore
    '../assets/ic_slider_above_thumb.png')
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.aboveThumbContent
  }, /*#__PURE__*/React.createElement(Image, {
    source: face
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.aboveThumbText
  }, value))));
};

const SliderDragRatingQuestion = ({
  survey,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    colorScheme,
    fontColor
  } = useTheme();
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
  const [value, setValue] = React.useState([minScale]);
  const [valueInput, setInputValue] = React.useState();
  const [hasEdited, setHasEdited] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const total = maxScale - minScale + 1;
  const middle = Math.round((maxScale + minScale) / 2);
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  const onFeedbackHandler = React.useCallback(() => {
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
    if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
      const {
        answers
      } = feedback;
      const prevAnswer = typeof answers[0] === 'string' ? parseInt(answers[0], 10) : answers[0];
      setValue([prevAnswer + 1]);
      setInputValue(prevAnswer + 1);
      setHasEdited(true);
    }
  };

  React.useEffect(() => {
    getInitialSelectedValueFromFeedbackProps(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (focus) {
        onFeedbackHandler();
      }
    });
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [focus, onFeedbackHandler]);
  const inputStyle = {
    color: fontColor,
    borderColor: isDark ? Colors.rankingContainerBgDark : Colors.rankingContainerBorder
  };
  const trackStyle = { ...styles.track,
    backgroundColor: isDark ? Colors.rankingContainerBgDark : Colors.rankingBorder
  };
  const activeMarkStyle = { ...styles.activeMark,
    opacity: isDark ? 0.3 : 1
  };
  const hintTextStyle = [styles.hintText, {
    color: fontColor
  }];
  const textField = /*#__PURE__*/React.createElement(TextInput, {
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
  const slider = /*#__PURE__*/React.createElement(CustomSlider, {
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
    renderThumbComponent: () => /*#__PURE__*/React.createElement(ThumbComponent, {
      isDark: isDark
    }),
    trackStyle: trackStyle,
    renderAboveThumbComponent: () => /*#__PURE__*/React.createElement(AboveThumbComponent, {
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
  return /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: styles.container
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: forgot,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    question: question,
    style: styles.mandatoryTitle
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.questionContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.sliderLabelContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.flex1, GlobalStyle.flexEnd]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.sliderLabel, GlobalStyle.textAlignLeft]
  }, includeCustomLabel ? options[0] : minScale)), includeCenterLabel ? /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.flex1, GlobalStyle.flexEnd]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sliderLabel
  }, includeCustomLabel ? options[1] : middle)) : null, /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.flex1, GlobalStyle.flexEnd]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.sliderLabel, GlobalStyle.textAlignRight]
  }, includeCustomLabel ? options[options.length - 1] : maxScale)), /*#__PURE__*/React.createElement(View, {
    style: styles.dummyLabel
  })), /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.row
  }, /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, slider), textField)), /*#__PURE__*/React.createElement(View, {
    style: styles.hintContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: hintTextStyle
  }, 'Slide left or right to rate')));
};

export default /*#__PURE__*/React.memo(SliderDragRatingQuestion);
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between'
  },
  questionContainer: {
    marginRight: 35,
    marginLeft: 45,
    justifyContent: 'center'
  },
  mandatoryTitle: {
    marginBottom: 50,
    marginHorizontal: 16
  },
  sliderLabelContainer: {
    flexDirection: 'row'
  },
  sliderLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.sliderLabel,
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
    color: Colors.black
  },
  disappearMark: {
    width: 0
  },
  activeMark: {
    backgroundColor: Colors.rankingContainerBorder,
    width: 2,
    height: 10,
    left: 40 / 2 - 2
  },
  hintContainer: {
    marginBottom: 27,
    justifyContent: 'center'
  },
  hintText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6
  }
});
//# sourceMappingURL=SliderDragRatingQuestion.js.map