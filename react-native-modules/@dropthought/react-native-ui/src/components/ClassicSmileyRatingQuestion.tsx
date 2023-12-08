import React from 'react';
import { View, StyleSheet } from 'react-native';
import { isNil } from 'ramda';
import SmileyIcon from './SmileyIcon';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import GlobalStyle from '../styles';
import i18n from '../translation';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
} from '../data';

type Feedback = OriginFeedback & {
  answers: string[];
};

type Question = OriginQuestion & {
  options: string[];
  scale: string;
};

const noop = () => undefined;

const getInitialSelectedValue = (feedback: Feedback, question: Question) => {
  let prevAnswer: number | undefined;
  if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
    prevAnswer = parseInt(feedback.answers[0], 10);
  }
  return question.options.map((_option, index) => prevAnswer === index);
};

const VeryDislikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
}) => {
  const { colorScheme } = useTheme();
  return (
    <SmileyIcon
      selected={selected}
      onPress={onPress}
      label={label}
      {...restProps}
      source={
        selected
          ? require('../assets/btn_very_dislike_selected.png')
          : colorScheme === COLOR_SCHEMES.dark
          ? require('../assets/btn_very_dislike_dark.png')
          : require('../assets/btn_very_dislike.png')
      }
    />
  );
};

const VeryLikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
}) => {
  const { colorScheme } = useTheme();
  return (
    <SmileyIcon
      selected={selected}
      onPress={onPress}
      label={label}
      {...restProps}
      source={
        selected
          ? require('../assets/btn_very_like_selected.png')
          : colorScheme === COLOR_SCHEMES.dark
          ? require('../assets/btn_very_like_dark.png')
          : require('../assets/btn_very_like.png')
      }
    />
  );
};

const NotSureIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
}) => {
  const { colorScheme } = useTheme();
  return (
    <SmileyIcon
      selected={selected}
      onPress={onPress}
      label={label}
      {...restProps}
      source={
        selected
          ? require('../assets/btn_not_sure_selected.png')
          : colorScheme === COLOR_SCHEMES.dark
          ? require('../assets/btn_not_sure_dark.png')
          : require('../assets/btn_not_sure.png')
      }
    />
  );
};

const LikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
}) => {
  const { colorScheme } = useTheme();
  return (
    <SmileyIcon
      selected={selected}
      onPress={onPress}
      label={label}
      {...restProps}
      source={
        selected
          ? require('../assets/btn_like_selected.png')
          : colorScheme === COLOR_SCHEMES.dark
          ? require('../assets/btn_like_dark.png')
          : require('../assets/btn_like.png')
      }
    />
  );
};

const DislikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
}) => {
  const { colorScheme } = useTheme();
  return (
    <SmileyIcon
      selected={selected}
      onPress={onPress}
      label={label}
      {...restProps}
      source={
        selected
          ? require('../assets/btn_dislike_selected.png')
          : colorScheme === COLOR_SCHEMES.dark
          ? require('../assets/btn_dislike_dark.png')
          : require('../assets/btn_dislike.png')
      }
    />
  );
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
};

const ClassicSmileyRatingQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
}: Props) => {
  const [selected, setSelected] = React.useState<boolean[]>(
    getInitialSelectedValue(feedback, question)
  );

  const setSelectedAndFeedback = React.useCallback(
    (index) => {
      let selectedMap = question.options.map(() => false);
      selectedMap[index] = true;
      setSelected(selectedMap);
      onFeedback({
        questionId: question.questionId,
        answers: [index],
        type: 'rating',
      });
    },
    [onFeedback, question.options, question.questionId]
  );

  const rtl = i18n.dir() === 'rtl';
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;

  const fakeSmiley = !isPhone && (
    <SmileyIcon selected={false} onPress={noop} label="" />
  );

  const renderSmiley = () => {
    const viewStyle = isPhone
      ? styles.containter
      : [styles.containter, rtl && GlobalStyle.flexRowReverse];

    const { options } = question;
    switch (options.length) {
      case 2:
        return (
          <View style={viewStyle}>
            <VeryDislikeIcon
              selected={selected[0]}
              onPress={() => setSelectedAndFeedback(0)}
              label={options[0]}
            />
            <VeryLikeIcon
              selected={selected[1]}
              onPress={() => setSelectedAndFeedback(1)}
              label={options[1]}
            />
            {fakeSmiley}
            {fakeSmiley}
            {fakeSmiley}
          </View>
        );
      case 3:
        return (
          <View style={viewStyle}>
            <VeryDislikeIcon
              selected={selected[0]}
              onPress={() => setSelectedAndFeedback(0)}
              label={options[0]}
            />
            <NotSureIcon
              selected={selected[1]}
              onPress={() => setSelectedAndFeedback(1)}
              label={options[1]}
            />
            <VeryLikeIcon
              selected={selected[2]}
              onPress={() => setSelectedAndFeedback(2)}
              label={options[2]}
            />
            {fakeSmiley}
            {fakeSmiley}
          </View>
        );
      case 4:
        return (
          <View style={viewStyle}>
            <VeryDislikeIcon
              selected={selected[0]}
              onPress={() => setSelectedAndFeedback(0)}
              label={options[0]}
            />
            <NotSureIcon
              selected={selected[1]}
              onPress={() => setSelectedAndFeedback(1)}
              label={options[1]}
            />
            <LikeIcon
              selected={selected[2]}
              onPress={() => setSelectedAndFeedback(2)}
              label={options[2]}
            />
            <VeryLikeIcon
              selected={selected[3]}
              onPress={() => setSelectedAndFeedback(3)}
              label={options[3]}
            />
            {fakeSmiley}
          </View>
        );
      case 5:
        return (
          <View style={viewStyle}>
            <VeryDislikeIcon
              selected={selected[0]}
              onPress={() => setSelectedAndFeedback(0)}
              label={options[0]}
            />
            <DislikeIcon
              selected={selected[1]}
              onPress={() => setSelectedAndFeedback(1)}
              label={options[1]}
            />
            <NotSureIcon
              selected={selected[2]}
              onPress={() => setSelectedAndFeedback(2)}
              label={options[2]}
            />
            <LikeIcon
              selected={selected[3]}
              onPress={() => setSelectedAndFeedback(3)}
              label={options[3]}
            />
            <VeryLikeIcon
              selected={selected[4]}
              onPress={() => setSelectedAndFeedback(4)}
              label={options[4]}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        forgot={forgot}
        mandatoryErrorMessage={mandatoryErrorMessage}
        question={question}
      />
      <View style={[styles.smileyRowContainer, rtl && GlobalStyle.flexEnd]}>
        {renderSmiley()}
      </View>
    </View>
  );
};

export default React.memo(ClassicSmileyRatingQuestion);

const phoneStyles = StyleSheet.create({
  containter: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6,
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
    flex: 1,
    flexDirection: 'row',
  },
});
