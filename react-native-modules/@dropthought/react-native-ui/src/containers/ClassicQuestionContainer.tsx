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
import ClassicDropdownQuestion from '../components/ClassicDropdownQuestion';
import ClassicMatrixRatingQuestion from '../components/ClassicMatrixRatingQuestion';
import ClassicMatrixChoiceQuestion from '../components/ClassicMatrixChoiceQuestion';
import ClassicMultipleOpenEndedQuestion from '../components/ClassicMultipleOpenEndedQuestion';
import ClassicPictureChoiceQuestion from '../components/ClassicPictureChoiceQuestion';
import ClassicMandatoryTitle from '../components/ClassicMandatoryTitle';
import GlobalStyle from '../styles';
import type { Question, Feedback, ImageFileProps } from '../data';

const TempComponent = ({
  mandatoryErrorMessage,
  question,
  forgot,
}: {
  mandatoryErrorMessage: string;
  question: Question;
  forgot: boolean;
}) => {
  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        question={question}
        mandatoryErrorMessage={mandatoryErrorMessage}
        forgot={forgot}
      />
    </View>
  );
};

type Props = {
  mandatoryErrorMessage: string;
  anonymous: boolean;
  question: Question;
  validationStarted: boolean;
  themeColor: string;
  onFeedback?: (feedback: Feedback) => void;
  onUpload?: (file: ImageFileProps) => void;
  isUploading?: boolean;
  onDragGrant: () => void;
  onDragEnd: () => void;
  preview: boolean;
};

const ClassicQuestionContainer = (props: Props) => {
  const {
    question,
    onFeedback: propsOnFeedback,
    validationStarted,
    onDragGrant,
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
    case 'dropdown':
      // @ts-ignore
      QuestionComponent = ClassicDropdownQuestion;
      break;
    case 'matrixRating':
      // @ts-ignore
      QuestionComponent = ClassicMatrixRatingQuestion;
      break;
    case 'matrixChoice':
      // @ts-ignore
      QuestionComponent = ClassicMatrixChoiceQuestion;
      break;
    case 'multipleOpenEnded':
      // @ts-ignore
      QuestionComponent = ClassicMultipleOpenEndedQuestion;
      break;
    case 'pictureChoice':
      // @ts-ignore
      QuestionComponent = ClassicPictureChoiceQuestion;
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
      onDragGrant={onDragGrant}
      onDragEnd={onDragEnd}
    />
  );
};

export default ClassicQuestionContainer;
