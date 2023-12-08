function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { View } from 'react-native';
import { mandatoryQuestionValidator } from '../utils/data';
import { useFeedbackByQid, useFeedbackDispatch, updateFeedback } from '../contexts/feedback';
import SmileyRatingQuestionOption1 from '../components/SmileyRatingQuestionOption1';
import SmileyRatingQuestionOption2 from '../components/SmileyRatingQuestionOption2';
import SmileyRatingQuestionOption3 from '../components/SmileyRatingQuestionOption3';
import SmileyRatingQuestionOption4 from '../components/SmileyRatingQuestionOption4';
import SmileyRatingQuestionOption6 from '../components/SmileyRatingQuestionOption6';
import RankingQuestion from '../components/RankingQuestion';
import SingleChoiceQuestion from '../components/SingleChoiceQuestion';
import MultiChoiceQuestion from '../components/MultiChoiceQuestion';
import SliderRatingQuestion from '../components/SliderRatingQuestion';
import OpenQuestion from '../components/OpenQuestion';
import IconRatingQuestion from '../components/IconRatingQuestion';
import SliderDragRatingQuestion from '../components/SliderDragRatingQuestion';
import DropdownQuestion from '../components/DropdownQuestion';
import MatrixRatingQuestion from '../components/MatrixRatingQuestion';
import MatrixChoiceQuestion from '../components/MatrixChoiceQuestion';
import MultipleOpenEndedQuestion from '../components/MultipleOpenEndedQuestion';
import PictureChoiceQuestion from '../components/PictureChoiceQuestion';
import MandatoryTitle from '../components/MandatoryTitle';
import GlobalStyle from '../styles';

const TempComponent = ({
  mandatoryErrorMessage,
  question,
  forgot
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    question: question,
    mandatoryErrorMessage: mandatoryErrorMessage,
    forgot: forgot
  }));
};

const QuestionContainer = props => {
  const {
    onFeedback: propsOnFeedback,
    validationStarted,
    themeOption
  } = props;
  let QuestionComponent = TempComponent; // get/update feedback to context

  const feedback = useFeedbackByQid(props.question.questionId);
  const feedbackDispatch = useFeedbackDispatch();
  const onFeedbackHandler = React.useCallback(updatedFeedback => {
    updateFeedback(feedbackDispatch, updatedFeedback); // @ts-ignore

    propsOnFeedback && propsOnFeedback(updateFeedback);
  }, [feedbackDispatch, propsOnFeedback]); // whether to display the forgot warning message

  const forgot = validationStarted && !mandatoryQuestionValidator(props.question, feedback);

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
      } else if (props.question.subType === 'slider') {
        // @ts-ignore
        QuestionComponent = SliderRatingQuestion;
      } else {
        // @ts-ignore
        QuestionComponent = IconRatingQuestion;
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

    case 'ranking':
      // @ts-ignore
      QuestionComponent = RankingQuestion;
      break;

    case 'ratingSlider':
      // @ts-ignore
      QuestionComponent = SliderDragRatingQuestion;
      break;

    case 'dropdown':
      // @ts-ignore
      QuestionComponent = DropdownQuestion;
      break;

    case 'matrixRating':
      // @ts-ignore
      QuestionComponent = MatrixRatingQuestion;
      break;

    case 'matrixChoice':
      // @ts-ignore
      QuestionComponent = MatrixChoiceQuestion;
      break;

    case 'multipleOpenEnded':
      // @ts-ignore
      QuestionComponent = MultipleOpenEndedQuestion;
      break;

    case 'pictureChoice':
      // @ts-ignore
      QuestionComponent = PictureChoiceQuestion;
      break;

    default:
      QuestionComponent = TempComponent;
  }

  return /*#__PURE__*/React.createElement(QuestionComponent, _extends({}, props, {
    // @ts-ignore
    feedback: feedback,
    onFeedback: onFeedbackHandler,
    forgot: forgot
  }));
};

export default QuestionContainer;
//# sourceMappingURL=QuestionContainer.js.map