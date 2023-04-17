import * as React from 'react';
import { View } from 'react-native';
import { mandatoryQuestionValidator } from '../utils/data';

import {
  useFeedbackByQid,
  useFeedbackDispatch,
  updateFeedback,
} from '../contexts/feedback';
import ClassicSingleChoiceQuestion from '../components/ClassicSingleChoiceQuestion';
import ClassicMultiChoiceQuestion from '../components/ClassicMultiChoiceQuestion';
import ClassicSmileyRatingQuestion from '../components/ClassicSmileyRatingQuestion';
import ClassicSliderRatingQuestion from '../components/ClassicSliderRatingQuestion';
import ClassicSliderDragRatingQuestion from '../components/ClassicSliderDragRatingQuestion';
import ClassicIconRatingQuestion from '../components/ClassicIconRatingQuestion';
import ClassicRankingQuestion from '../components/ClassicRankingQuestion';
import ClassicOpenQuestion from '../components/ClassicOpenQuestion';
import ClassicMandatoryTitle from '../components/ClassicMandatoryTitle';
import GlobalStyle from '../styles';
import type { Question, Feedback } from '../data';

const TempComponent = ({
  question,
  forgot,
}: {
  question: Question;
  forgot: boolean;
}) => {
  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle question={question} forgot={forgot} />
    </View>
  );
};

type Props = {
  anonymous: boolean;
  question: Question;
  validationStarted: boolean;
  themeColor: string;
  onFeedback?: (feedback: Feedback) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
};

const ClassicQuestionContainer = (props: Props) => {
  const {
    question,
    onFeedback: propsOnFeedback,
    validationStarted,
    onDragStart,
    onDragEnd,
  } = props;

  let QuestionComponent = TempComponent;

  // get/update feedback to context
  const feedback = useFeedbackByQid(question.questionId);
  const feedbackDispatch = useFeedbackDispatch();
  const onFeedbackHandler = React.useCallback(
    (updatedFeedback) => {
      updateFeedback(feedbackDispatch, updatedFeedback);
      // @ts-ignore
      propsOnFeedback && propsOnFeedback(updateFeedback);
    },
    [feedbackDispatch, propsOnFeedback]
  );

  // whether to display the forgot warning message
  const forgot =
    validationStarted && !mandatoryQuestionValidator(question, feedback);

  switch (question.type) {
    case 'singleChoice':
      // @ts-ignore
      QuestionComponent = ClassicSingleChoiceQuestion;
      break;
    case 'multiChoice':
      // @ts-ignore
      QuestionComponent = ClassicMultiChoiceQuestion;
      break;
    case 'rating':
      if (question.subType === 'smiley') {
        // @ts-ignore
        QuestionComponent = ClassicSmileyRatingQuestion;
      } else if (question.subType === 'slider') {
        // @ts-ignore
        QuestionComponent = ClassicSliderRatingQuestion;
      } else {
        // @ts-ignore
        QuestionComponent = ClassicIconRatingQuestion;
      }
      break;
    case 'nps':
      // @ts-ignore
      QuestionComponent = ClassicSliderRatingQuestion;
      break;
    case 'open':
      // @ts-ignore
      QuestionComponent = ClassicOpenQuestion;
      break;
    case 'ranking':
      // @ts-ignore
      QuestionComponent = ClassicRankingQuestion;
      break;
    case 'ratingSlider':
      // @ts-ignore
      QuestionComponent = ClassicSliderDragRatingQuestion;
      break;
    default:
      QuestionComponent = TempComponent;
  }

  return (
    <QuestionComponent
      {...props}
      // @ts-ignore
      feedback={feedback}
      onFeedback={onFeedbackHandler}
      forgot={forgot}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default ClassicQuestionContainer;
