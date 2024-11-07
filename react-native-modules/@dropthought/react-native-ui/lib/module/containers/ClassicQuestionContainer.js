function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { View } from 'react-native';
import { mandatoryQuestionValidator } from '../utils/data';
import { useFeedbackByQid, useFeedbackDispatch, updateFeedback } from '../contexts/feedback';
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
import ClassicPollingQuestion from '../components/ClassicPollingQuestion';
import ClassicFileQuestion from '../components/ClassicFileQuestion';
import ClassicStatementQuestion from '../components/ClassicStatementQuestion';
import ClassicMandatoryTitle from '../components/ClassicMandatoryTitle';
import GlobalStyle from '../styles';

// @ts-ignore

const TempComponent = ({
  mandatoryErrorMessage,
  question,
  forgot
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    question: question,
    mandatoryErrorMessage: mandatoryErrorMessage,
    forgot: forgot
  }));
};
const ClassicQuestionContainer = props => {
  const {
    question,
    onFeedback: propsOnFeedback,
    validationStarted,
    onDragGrant,
    onDragEnd
  } = props;
  let QuestionComponent = TempComponent;

  // get/update feedback to context
  const feedback = useFeedbackByQid(question.questionId);
  const feedbackDispatch = useFeedbackDispatch();
  const onFeedbackHandler = React.useCallback(updatedFeedback => {
    updateFeedback(feedbackDispatch, updatedFeedback);
    // @ts-ignore
    propsOnFeedback && propsOnFeedback(updateFeedback);
  }, [feedbackDispatch, propsOnFeedback]);

  // whether to display the forgot warning message
  const forgot = validationStarted && !mandatoryQuestionValidator(question, feedback);
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
    case 'poll':
      // @ts-ignore
      QuestionComponent = ClassicPollingQuestion;
      break;
    case 'file':
      // @ts-ignore
      QuestionComponent = ClassicFileQuestion;
      break;
    case 'statement':
      // @ts-ignore
      QuestionComponent = ClassicStatementQuestion;
      break;
    default:
      QuestionComponent = TempComponent;
  }
  return /*#__PURE__*/React.createElement(QuestionComponent, _extends({}, props, {
    // @ts-ignore
    feedback: feedback,
    onFeedback: onFeedbackHandler,
    forgot: forgot,
    onDragGrant: onDragGrant,
    onDragEnd: onDragEnd
  }));
};
export default ClassicQuestionContainer;
//# sourceMappingURL=ClassicQuestionContainer.js.map