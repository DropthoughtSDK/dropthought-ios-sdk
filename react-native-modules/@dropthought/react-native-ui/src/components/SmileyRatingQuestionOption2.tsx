import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Option1BackgroundColor, Option1BackgroundColorDark } from '../styles';
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
import WheelPicker from './WheelPicker';
import SurveyFooter from '../containers/SurveyFooter';
import SurveyHeader from '../containers/SurveyHeader';
import LottieView from 'lottie-react-native';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import MandatoryTitle from './MandatoryTitle';
import { isNil } from 'ramda';

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

const SmileyRatingQuestionOption2 = ({
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
  const answered =
    feedback &&
    feedback.answers &&
    !isNil(feedback.answers[0]) &&
    typeof feedback.answers[0] === 'number';
  const answeredValue: number = answered
    ? parseInt(feedback.answers[0], 10)
    : 0;

  const {
    hexCode,
    backgroundColor: themeBackgroundColor,
    fontColor,
    colorScheme,
  } = useTheme();
  const { questionId, options, scale } = question;
  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    answered ? answeredValue : -1
  );
  const hasSelected = selectedIndex > -1;

  const scaleLogicList = scaleLogic[scale];
  const lottieSelectedIndex = scaleLogicList[selectedIndex];

  const setSelectedAndFeedback = React.useCallback(
    (index) => {
      onFeedback({
        questionId,
        answers: [index],
        type: 'rating',
      });
    },
    [onFeedback, questionId]
  );

  const handleSelected = (index: number) => {
    setSelectedIndex(index);
    setSelectedAndFeedback(index);
  };

  const descriptions = scaleLogicList.map((_, index) => options[index]);
  const dummyDescroptions = ['Select', ...descriptions];

  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;

  const selectedBackgroundColor =
    colorScheme === COLOR_SCHEMES.dark
      ? Option1BackgroundColorDark
      : Option1BackgroundColor;

  const unselectedBackgroundColor = themeBackgroundColor;

  const backgroundColor = hasSelected
    ? selectedBackgroundColor[lottieSelectedIndex]
    : unselectedBackgroundColor;

  const questionContainerStyle = [commonStyles.container, { backgroundColor }];

  const hintTextStyle = [styles.hintText, { color: fontColor }];
  const itemTextStyle = [commonStyles.itemTextStyle, { color: fontColor }];

  return (
    <>
      <SurveyHeader
        survey={survey}
        pageIndex={pageIndex}
        backgroundColor={backgroundColor}
        onClose={onClose}
      />
      <View style={questionContainerStyle}>
        {feedback && hasSelected ? (
          <View style={commonStyles.infoContainer}>
            <MandatoryTitle
              question={question}
              mandatoryErrorMessage={survey.mandatoryErrorMessage}
              forgot={forgot}
            />
            <View style={commonStyles.centerContainer}>
              <LottieView
                source={lotties[lottieSelectedIndex]}
                autoPlay
                speed={0.5}
              />
            </View>
            <View style={commonStyles.wheelContainer}>
              <WheelPicker
                selectedIndex={selectedIndex}
                options={descriptions}
                onChange={(index) => {
                  if (index > -1) handleSelected(index);
                }}
                itemTextStyle={itemTextStyle}
                selectedIndicatorStyle={commonStyles.selectedIndicatorStyle}
                key={'WheelPicker-descriptions'}
                itemHeight={Platform.OS === 'android' ? 60 : undefined}
              />
            </View>
          </View>
        ) : (
          <View style={commonStyles.infoContainer}>
            <MandatoryTitle
              question={question}
              mandatoryErrorMessage={survey.mandatoryErrorMessage}
              forgot={forgot}
            />
            <View style={commonStyles.centerContainer}>
              <Text style={hintTextStyle}>
                {i18n.t('option1HintDescription:title')}
              </Text>
            </View>
            <View style={commonStyles.wheelContainer}>
              <WheelPicker
                selectedIndex={0}
                options={dummyDescroptions}
                onChange={(index) => {
                  handleSelected(index - 1);
                }}
                itemTextStyle={itemTextStyle}
                selectedIndicatorStyle={commonStyles.selectedIndicatorStyle}
                key={'WheelPicker-dummyDescroptions'}
                itemHeight={Platform.OS === 'android' ? 60 : undefined}
              />
            </View>
          </View>
        )}
      </View>
      <SurveyFooter
        submitSurvey={survey.submitSurvey}
        surveyColor={hexCode}
        isFirstPage={pageIndex === 0}
        isLastPage={pageIndex === survey.pageOrder.length - 1}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        backgroundColor={backgroundColor}
      />
    </>
  );
};

export default React.memo(SmileyRatingQuestionOption2);

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    height: '100%',
  },
  infoContainer: {
    height: '100%',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%',
  },
  wheelContainer: {
    flex: 1,
  },
  selectedIndicatorStyle: {
    opacity: 0,
  },
  itemTextStyle: {
    fontSize: 24,
    paddingVertical: 9,
    width: '100%',
    textAlign: 'center',
  },
});

const phoneStyles = StyleSheet.create({
  hintText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

const tabletStyles = StyleSheet.create({
  hintText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
