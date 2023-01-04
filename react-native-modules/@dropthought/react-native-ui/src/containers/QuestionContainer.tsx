import * as React from 'react';
import { View } from 'react-native';
import { mandatoryQuestionValidator } from '../utils/data';

import {
  useFeedbackByQid,
  useFeedbackDispatch,
  updateFeedback,
} from '../contexts/feedback';
import SmileyRatingQuestionOption1 from '../components/SmileyRatingQuestionOption1';
import SmileyRatingQuestionOption2 from '../components/SmileyRatingQuestionOption2';
import SmileyRatingQuestionOption3 from '../components/SmileyRatingQuestionOption3';
import SmileyRatingQuestionOption4 from '../components/SmileyRatingQuestionOption4';
import SmileyRatingQuestionOption6 from '../components/SmileyRatingQuestionOption6';
import SingleChoiceQuestion from '../components/SingleChoiceQuestion';
import MultiChoiceQuestion from '../components/MultiChoiceQuestion';
import SliderRatingQuestion from '../components/SliderRatingQuestion';
import OpenQuestion from '../components/OpenQuestion';
import MandatoryTitle from '../components/MandatoryTitle';
import GlobalStyle from '../styles';
import { useTheme } from '..';
import type { Question, Feedback, Survey } from '../data';

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
  onClose: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onFeedback?: (feedback: Feedback) => void;
  survey: Survey;
  pageIndex: number;
};

const QuestionContainer = (props: Props) => {
  const { onFeedback: propsOnFeedback, validationStarted } = props;
  const { themeOption } = useTheme();

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
        switch (themeOption) {
          case 'option1':
            // @ts-ignore
            QuestionComponent = SmileyRatingQuestionOption1;
            break;
          case 'option2':
            // @ts-ignore
            QuestionComponent = SmileyRatingQuestionOption2;
            break;
          case 'option3':
            // @ts-ignore
            QuestionComponent = SmileyRatingQuestionOption3;
            break;
          case 'option4':
            // @ts-ignore
            QuestionComponent = SmileyRatingQuestionOption4;
            break;
          case 'option6':
            // @ts-ignore
            QuestionComponent = SmileyRatingQuestionOption6;
            break;
          default:
            // @ts-ignore
            QuestionComponent = SmileyRatingQuestionOption1;
        }
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
