import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { isNil } from 'ramda';
import {
  Colors,
  opacity60,
  opacity10,
  Option1BackgroundColor,
  Option1BackgroundColorDark,
} from '../styles';
import i18n from '../translation';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
  Survey,
} from '../data';
import { scaleLogic } from '../utils/data';
import SurveyFooter from '../containers/SurveyFooter';
import SurveyHeader from '../containers/SurveyHeader';
import LottieView from 'lottie-react-native';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import MandatoryTitle from './MandatoryTitle';

const lotties = [
  require('../assets/animations/smiley_option1/option1_1.json'),
  require('../assets/animations/smiley_option1/option1_2.json'),
  require('../assets/animations/smiley_option1/option1_3.json'),
  require('../assets/animations/smiley_option1/option1_4.json'),
  require('../assets/animations/smiley_option1/option1_5.json'),
];

type Feedback = OriginFeedback & {
  answers: string[];
};

type Question = OriginQuestion & {
  options: string[];
  scale: string;
};

const getInitialSelectedValue = (feedback: Feedback, question: Question) => {
  let prevAnswer: number | undefined;
  if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
    prevAnswer = parseInt(feedback.answers[0], 10);
  }
  return question.options.map((_option, index) => prevAnswer === index);
};

type Props = {
  survey: Survey;
  question: Question;
  pageIndex: number;
  forgot: boolean;
  onClose: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
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
  feedback,
}: Props) => {
  const {
    backgroundColor: themeBackgroundColor,
    fontColor,
    colorScheme,
  } = useTheme();
  const { questionId, options, scale } = question;

  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [selected, setSelected] = React.useState<boolean[]>(
    getInitialSelectedValue(feedback, question)
  );
  const lottieSelectedIndex = scaleLogic[scale][selectedIndex];

  const selectedBackgroundColor =
    colorScheme === COLOR_SCHEMES.dark
      ? Option1BackgroundColorDark
      : Option1BackgroundColor;

  const unselectedBackgroundColor =
    colorScheme === COLOR_SCHEMES.dark
      ? themeBackgroundColor
      : Colors.unSelectedBackground;

  const backgroundColor =
    feedback?.answers && feedback?.answers.length > 0
      ? selectedBackgroundColor[lottieSelectedIndex]
      : unselectedBackgroundColor;

  const setSelectedAndFeedback = React.useCallback(
    (index) => {
      setSelectedIndex(index);
      let selectedMap = options.map(() => false);
      selectedMap[index] = true;
      setSelected(selectedMap);
      onFeedback({
        questionId,
        answers: [index],
        type: 'rating',
      });
    },
    [onFeedback, options, questionId]
  );

  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;

  const smileyRowContainerStyle = [
    styles.smileyRowContainer,
    {
      backgroundColor:
        colorScheme === COLOR_SCHEMES.dark
          ? opacity10(Colors.white)
          : opacity60(Colors.white),
    },
  ];

  const ratingComponent = (
    <View style={smileyRowContainerStyle}>
      {options.map((_option, index) => {
        const isSelected = selected[index];
        const buttonStyle = isSelected
          ? [styles.optionContainer, { backgroundColor: Colors.black }]
          : [
              styles.optionContainer,
              {
                backgroundColor:
                  colorScheme === COLOR_SCHEMES.dark
                    ? opacity10(Colors.white)
                    : Colors.white,
              },
            ];
        const textStyle = isSelected
          ? [styles.optionTitle, { color: Colors.white }]
          : [styles.optionTitle, { color: fontColor }];

        return (
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => setSelectedAndFeedback(index)}
            key={index.toString()}
          >
            <Text style={textStyle}>{index + 1}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const questionContainerStyle = [commonStyles.container, { backgroundColor }];

  const hintTextStyle = [styles.hintText, { color: fontColor }];
  const descStyle = [styles.desc, { color: fontColor }];

  return (
    <>
      <SurveyHeader
        survey={survey}
        pageIndex={pageIndex}
        backgroundColor={backgroundColor}
        onClose={onClose}
      />
      <View style={questionContainerStyle}>
        {feedback && selectedIndex >= 0 ? (
          <View style={commonStyles.infoContainer}>
            <MandatoryTitle question={question} forgot={forgot} />
            <View style={commonStyles.lottieContainer}>
              <LottieView
                source={lotties[lottieSelectedIndex]}
                autoPlay
                style={commonStyles.lottieContent}
                speed={0.5}
              />
            </View>
            <Text style={descStyle}>{options[selectedIndex]}</Text>
          </View>
        ) : (
          <View style={commonStyles.initInfoContainer}>
            <MandatoryTitle question={question} forgot={forgot} />
            <View style={commonStyles.hintContainer}>
              <Text style={hintTextStyle}>
                {i18n.t('option1HintDescription:title')}
              </Text>
            </View>
          </View>
        )}
        {ratingComponent}
      </View>
      <SurveyFooter
        surveyColor={survey.surveyProperty.hexCode}
        isFirstPage={pageIndex === 0}
        isLastPage={pageIndex === survey.pageOrder.length - 1}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        backgroundColor={backgroundColor}
      />
    </>
  );
};

export default React.memo(SmileyRatingQuestionOption1);

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 42,
  },
  infoContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  initInfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  lottieContent: {
    width: '100%',
  },
  hintContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

const phoneStyles = StyleSheet.create({
  containter: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  smileyRowContainer: {
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 31,
    paddingHorizontal: 9,
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
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  optionTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  desc: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: '600',
  },
  hintText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

const tabletStyles = StyleSheet.create({
  containter: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  smileyRowContainer: {
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: opacity60(Colors.white),
    borderRadius: 31,
    paddingHorizontal: 9,
  },
  optionContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  optionTitle: {
    fontSize: 26,
    fontWeight: '600',
  },
  desc: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: '600',
  },
  hintText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});