import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Keyboard,
  TextInput,
  Image,
} from 'react-native';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import GlobalStyle, { Colors } from '../styles';

import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
} from '../data';
import { sliderRatingAboveThumbFace } from '../constants/SliderDragQuestionConstants';
import CustomSlider from '../components/Slider';
import { isNil } from 'ramda';

type Feedback = OriginFeedback & {
  answers: string[];
};

type Question = OriginQuestion & {
  options: string[];
  scale: string;
  minScale: string;
  includeCenterLabel: boolean;
  includeCustomLabel: boolean;
};

type Props = {
  mandatoryErrorMessage: string;
  question: Question;
  onFeedback: ({
    questionId,
    answers,
    type,
  }: {
    questionId: string;
    answers: number[];
    type: string;
  }) => void;
  feedback: Feedback;
  forgot: boolean;
  themeColor: string;
};

type AboveThumbProps = {
  value: number[];
  question: Question;
  hasEdited: boolean;
};

type ThumbProps = {
  isDark: boolean;
};

const ThumbComponent = ({ isDark }: ThumbProps) => {
  const thumbStyle = [
    styles.thumb,
    {
      shadowColor: isDark ? '#000' : '#aaa',
      backgroundColor: isDark ? Colors.rankingCheckBoxBorder : Colors.white,
    },
  ];
  const thumbContentStyle = [
    styles.thumbContent,
    {
      backgroundColor: isDark
        ? Colors.rankingBGDark
        : Colors.rankingContainerBorder,
    },
  ];
  return (
    <View style={thumbStyle}>
      <View style={thumbContentStyle} />
      <View style={thumbContentStyle} />
      <View style={thumbContentStyle} />
    </View>
  );
};

const AboveThumbComponent = ({
  value,
  question,
  hasEdited,
}: AboveThumbProps) => {
  if (!hasEdited) {
    return null;
  }
  const { scale: stringScale, minScale: stringMinScale } = question;
  const maxScale = Number(stringScale);
  const minScale = Number(stringMinScale);
  const face = sliderRatingAboveThumbFace(minScale, value[0], maxScale);

  const containerStyle = {
    transform: [
      {
        translateX: -50,
      },
      {
        translateY: 10,
      },
    ],
  };
  return (
    <View style={containerStyle}>
      <ImageBackground
        style={styles.aboveThumbContainer}
        source={require(// @ts-ignore
        '../assets/ic_slider_above_thumb.png')}
      >
        <View style={styles.aboveThumbContent}>
          <Image source={face} />
          <Text style={styles.aboveThumbText}>{value}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const ClassicSliderDragRatingQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const { colorScheme, fontColor } = useTheme();
  const {
    scale: stringScale,
    options = [],
    questionId,
    minScale: stringMinScale,
    includeCenterLabel,
    includeCustomLabel,
  } = question;
  const maxScale = Number(stringScale);
  const minScale = Number(stringMinScale);
  const [value, setValue] = React.useState([minScale]);
  const [valueInput, setInputValue] = React.useState<number | undefined>();
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
      type: 'ratingSlider',
    });
  }, [valueInput, maxScale, minScale, onFeedback, questionId]);
  const getInitialSelectedValueFromFeedbackProps = () => {
    if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
      const { answers } = feedback;
      const prevAnswer =
        typeof answers[0] === 'string' ? parseInt(answers[0], 10) : answers[0];
      setValue([prevAnswer + 1]);
      setInputValue(prevAnswer + 1);
      setHasEdited(true);
    }
  };
  React.useEffect(() => {
    getInitialSelectedValueFromFeedbackProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (focus) {
          inputRef.current?.blur();
          onFeedbackHandler();
        }
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [focus, onFeedbackHandler]);
  const inputStyle = {
    color: fontColor,
    borderColor: isDark
      ? Colors.rankingContainerBgDark
      : Colors.rankingContainerBorder,
  };
  const trackStyle = {
    ...styles.track,
    backgroundColor: isDark
      ? Colors.rankingContainerBgDark
      : Colors.rankingBorder,
  };
  const activeMarkStyle = {
    ...styles.activeMark,
    opacity: isDark ? 0.3 : 1,
  };
  const textField = (
    <TextInput
      ref={inputRef}
      style={[styles.input, inputStyle]}
      onChangeText={(text) => {
        const formatText = Number(text.replace(/[^0-9]/g, ''));
        setInputValue(formatText);
        setFocus(true);
      }}
      onFocus={() => setFocus(true)}
      defaultValue=""
      value={valueInput?.toString()}
      placeholder="--"
      placeholderTextColor={fontColor}
      keyboardType="numeric"
    />
  );
  const slider = (
    <CustomSlider
      value={value[0]}
      setValue={setValue}
      trackMarks={total % 2 === 0 ? [middle - 0.5] : [middle]}
      trackMarkStyles={{
        inactiveMark: {},
        activeMark: includeCenterLabel ? activeMarkStyle : styles.disappearMark,
      }}
      maximumValue={maxScale}
      minimumValue={minScale}
      step={1}
      animateTransitions
      minimumTrackTintColor={themeColor}
      renderThumbComponent={() => <ThumbComponent isDark={isDark} />}
      trackStyle={trackStyle}
      renderAboveThumbComponent={() => (
        <AboveThumbComponent
          value={value}
          question={question}
          hasEdited={hasEdited}
        />
      )}
      onSlidingStart={() => {
        if (!hasEdited) {
          setHasEdited(true);
        }
      }}
      onCustomValueChange={() => {
        setInputValue(value[0]);
      }}
      onSlidingComplete={(input) => {
        const inputNumber = typeof input !== 'number' ? input[0] : 0;
        setInputValue(inputNumber);
        setFocus(false);
        onFeedback({
          questionId: questionId,
          answers: [inputNumber - 1],
          type: 'ratingSlider',
        });
      }}
      animationType="timing"
    />
  );
  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        forgot={forgot}
        mandatoryErrorMessage={mandatoryErrorMessage}
        question={question}
        style={styles.mandatoryTitle}
      />
      <View style={styles.container}>
        <View style={styles.sliderLabelContainer}>
          <View style={[GlobalStyle.flex1, GlobalStyle.flexEnd]}>
            <Text style={[styles.sliderLabel, GlobalStyle.textAlignLeft]}>
              {includeCustomLabel ? options[0] : minScale}
            </Text>
          </View>
          {includeCenterLabel ? (
            <View style={[GlobalStyle.flex1, GlobalStyle.flexEnd]}>
              <Text style={styles.sliderLabel}>
                {includeCustomLabel ? options[1] : middle}
              </Text>
            </View>
          ) : null}
          <View style={[GlobalStyle.flex1, GlobalStyle.flexEnd]}>
            <Text style={[styles.sliderLabel, GlobalStyle.textAlignRight]}>
              {includeCustomLabel ? options[options.length - 1] : maxScale}
            </Text>
          </View>
          <View style={styles.dummyLabel} />
        </View>
        <View style={GlobalStyle.row}>
          <View style={GlobalStyle.flex1}>{slider}</View>
          {textField}
        </View>
      </View>
    </View>
  );
};

export default React.memo(ClassicSliderDragRatingQuestion);

const styles = StyleSheet.create({
  questionContainer: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 48,
    marginBottom: 32,
    padding: 10,
  },
  container: {
    marginLeft: 14,
  },
  mandatoryTitle: {
    marginBottom: 50,
  },
  sliderLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sliderLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.sliderLabel,
    textAlign: 'center',
  },
  dummyLabel: {
    width: 48,
    height: 10,
    marginLeft: 26,
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
    fontWeight: '400',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    borderRadius: 8,
    height: 16,
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 1.5,
    elevation: 4,
  },
  thumbContent: {
    height: '100%',
    width: 3,
    borderRadius: 2,
  },
  aboveThumbContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    width: 102,
    height: 86,
  },
  aboveThumbContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  aboveThumbText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black,
  },
  disappearMark: {
    width: 0,
  },
  activeMark: {
    backgroundColor: Colors.rankingContainerBorder,
    width: 2,
    height: 10,
    left: 40 / 2 - 2,
  },
});
