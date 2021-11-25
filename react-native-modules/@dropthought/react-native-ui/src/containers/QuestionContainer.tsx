import * as React from 'react';
import { View } from 'react-native';
import { mandatoryQuestionValidator } from '../utils/data';

import {
  useFeedbackByQid,
  useFeedbackDispatch,
  updateFeedback,
} from '../contexts/feedback';
import SingleChoiceQuestion from '../components/SingleChoiceQuestion';
import MultiChoiceQuestion from '../components/MultiChoiceQuestion';
import SmileyRatingQuestion from '../components/SmileyRatingQuestion';
import SliderRatingQuestion from '../components/SliderRatingQuestion';
import OpenQuestion from '../components/OpenQuestion';
import MandatoryTitle from '../components/MandatoryTitle';
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
      <MandatoryTitle question={question} forgot={forgot} />
    </View>
  );
};

type Props = {
  anonymous: boolean;
  question: Question;
  validationStarted: boolean;
  themeColor: string;
  onFeedback?: (feedback: Feedback) => void;
};

const QuestionContainer = (props: Props) => {
  const { onFeedback: propsOnFeedback, validationStarted } = props;

  let QuestionComponent = TempComponent;

  // get/update feedback to context
  const feedback = useFeedbackByQid(props.question.questionId);
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
    validationStarted && !mandatoryQuestionValidator(props.question, feedback);

  switch (props.question.type) {
    case 'singleChoice':
      // @ts-ignore
      QuestionComponent = SingleChoiceQuestion;
      break;
    case 'multiChoice':
      // @ts-ignore
      QuestionComponent = MultiChoiceQuestion;
      break;
    case 'rating':
      if (props.question.subType === 'smiley') {
        // @ts-ignore
        QuestionComponent = SmileyRatingQuestion;
      } else {
        // @ts-ignore
        QuestionComponent = SliderRatingQuestion;
      }
      break;
    case 'nps':
      // @ts-ignore
      QuestionComponent = SliderRatingQuestion;
      break;
    case 'open':
      // @ts-ignore
      QuestionComponent = OpenQuestion;
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
    />
  );
};

export default QuestionContainer;
