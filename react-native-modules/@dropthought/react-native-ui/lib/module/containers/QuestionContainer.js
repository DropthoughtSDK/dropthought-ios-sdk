function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { View } from 'react-native';
import { mandatoryQuestionValidator } from '../utils/data';
import { useFeedbackByQid, useFeedbackDispatch, updateFeedback } from '../contexts/feedback';
import SingleChoiceQuestion from '../components/SingleChoiceQuestion';
import MultiChoiceQuestion from '../components/MultiChoiceQuestion';
import SmileyRatingQuestion from '../components/SmileyRatingQuestion';
import SliderRatingQuestion from '../components/SliderRatingQuestion';
import OpenQuestion from '../components/OpenQuestion';
import MandatoryTitle from '../components/MandatoryTitle';
import GlobalStyle from '../styles';

const TempComponent = ({
  question,
  forgot
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    question: question,
    forgot: forgot
  }));
};

const QuestionContainer = props => {
  const {
    onFeedback: propsOnFeedback,
    validationStarted
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

  return /*#__PURE__*/React.createElement(QuestionComponent, _extends({}, props, {
    // @ts-ignore
    feedback: feedback,
    onFeedback: onFeedbackHandler,
    forgot: forgot
  }));
};

export default QuestionContainer;
//# sourceMappingURL=QuestionContainer.js.map