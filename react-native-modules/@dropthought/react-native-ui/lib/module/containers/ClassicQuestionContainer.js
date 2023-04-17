function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import ClassicMandatoryTitle from '../components/ClassicMandatoryTitle';
import GlobalStyle from '../styles';

const TempComponent = ({
  question,
  forgot
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    question: question,
    forgot: forgot
  }));
};

const ClassicQuestionContainer = props => {
  const {
    question,
    onFeedback: propsOnFeedback,
    validationStarted,
    onDragStart,
    onDragEnd
  } = props;
  let QuestionComponent = TempComponent; // get/update feedback to context

  const feedback = useFeedbackByQid(question.questionId);
  const feedbackDispatch = useFeedbackDispatch();
  const onFeedbackHandler = React.useCallback(updatedFeedback => {
    updateFeedback(feedbackDispatch, updatedFeedback); // @ts-ignore

    propsOnFeedback && propsOnFeedback(updateFeedback);
  }, [feedbackDispatch, propsOnFeedback]); // whether to display the forgot warning message

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

    default:
      QuestionComponent = TempComponent;
  }

  return /*#__PURE__*/React.createElement(QuestionComponent, _extends({}, props, {
    // @ts-ignore
    feedback: feedback,
    onFeedback: onFeedbackHandler,
    forgot: forgot,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd
  }));
};

export default ClassicQuestionContainer;
//# sourceMappingURL=ClassicQuestionContainer.js.map