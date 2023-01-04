import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
  const {
    backgroundColor: themeBackgroundColor,
    fontColor,
    colorScheme,
  } = useTheme();
  const { questionId, options, scale } = question;
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
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
            <MandatoryTitle question={question} forgot={forgot} />
            <View style={commonStyles.lottieContainer}>
              <LottieView
                source={lotties[lottieSelectedIndex]}
                autoPlay
                style={commonStyles.lottieContent}
                speed={0.5}
              />
            </View>
          </View>
        ) : (
          <View style={commonStyles.initInfoContainer}>
            <MandatoryTitle question={question} forgot={forgot} />
            <Text style={hintTextStyle}>
              {i18n.t('option1HintDescription:title')}
            </Text>
            <View />
          </View>
        )}
        {hasSelected ? (
          <WheelPicker
            selectedIndex={selectedIndex}
            options={descriptions}
            onChange={(index) => {
              if (index > -1) handleSelected(index);
            }}
            itemTextStyle={itemTextStyle}
            selectedIndicatorStyle={commonStyles.selectedIndicatorStyle}
            key={'WheelPicker-descriptions'}
          />
        ) : (
          <WheelPicker
            selectedIndex={0}
            options={dummyDescroptions}
            onChange={(index) => {
              handleSelected(index - 1);
            }}
            itemTextStyle={itemTextStyle}
            selectedIndicatorStyle={commonStyles.selectedIndicatorStyle}
            key={'WheelPicker-dummyDescroptions'}
          />
        )}
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

export default React.memo(SmileyRatingQuestionOption2);

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42,
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  initInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  selectedIndicatorStyle: {
    opacity: 0,
  },
  itemTextStyle: {
    fontSize: 24,
    paddingVertical: 9,
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
