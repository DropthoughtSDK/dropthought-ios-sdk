"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _data = require("../utils/data");

var _feedback = require("../contexts/feedback");

var _ClassicSingleChoiceQuestion = _interopRequireDefault(require("../components/ClassicSingleChoiceQuestion"));

var _ClassicMultiChoiceQuestion = _interopRequireDefault(require("../components/ClassicMultiChoiceQuestion"));

var _ClassicSmileyRatingQuestion = _interopRequireDefault(require("../components/ClassicSmileyRatingQuestion"));

var _ClassicSliderRatingQuestion = _interopRequireDefault(require("../components/ClassicSliderRatingQuestion"));

var _ClassicSliderDragRatingQuestion = _interopRequireDefault(require("../components/ClassicSliderDragRatingQuestion"));

var _ClassicIconRatingQuestion = _interopRequireDefault(require("../components/ClassicIconRatingQuestion"));

var _ClassicRankingQuestion = _interopRequireDefault(require("../components/ClassicRankingQuestion"));

var _ClassicOpenQuestion = _interopRequireDefault(require("../components/ClassicOpenQuestion"));

var _ClassicDropdownQuestion = _interopRequireDefault(require("../components/ClassicDropdownQuestion"));

var _ClassicMatrixRatingQuestion = _interopRequireDefault(require("../components/ClassicMatrixRatingQuestion"));

var _ClassicMatrixChoiceQuestion = _interopRequireDefault(require("../components/ClassicMatrixChoiceQuestion"));

var _ClassicMultipleOpenEndedQuestion = _interopRequireDefault(require("../components/ClassicMultipleOpenEndedQuestion"));

var _ClassicPictureChoiceQuestion = _interopRequireDefault(require("../components/ClassicPictureChoiceQuestion"));

var _ClassicMandatoryTitle = _interopRequireDefault(require("../components/ClassicMandatoryTitle"));

var _styles = _interopRequireDefault(require("../styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TempComponent = ({
  question,
  forgot
}) => {
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/React.createElement(_ClassicMandatoryTitle.default, {
    question: question,
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
  let QuestionComponent = TempComponent; // get/update feedback to context

  const feedback = (0, _feedback.useFeedbackByQid)(question.questionId);
  const feedbackDispatch = (0, _feedback.useFeedbackDispatch)();
  const onFeedbackHandler = React.useCallback(updatedFeedback => {
    (0, _feedback.updateFeedback)(feedbackDispatch, updatedFeedback); // @ts-ignore

    propsOnFeedback && propsOnFeedback(_feedback.updateFeedback);
  }, [feedbackDispatch, propsOnFeedback]); // whether to display the forgot warning message

  const forgot = validationStarted && !(0, _data.mandatoryQuestionValidator)(question, feedback);

  switch (question.type) {
    case 'singleChoice':
      // @ts-ignore
      QuestionComponent = _ClassicSingleChoiceQuestion.default;
      break;

    case 'multiChoice':
      // @ts-ignore
      QuestionComponent = _ClassicMultiChoiceQuestion.default;
      break;

    case 'rating':
      if (question.subType === 'smiley') {
        // @ts-ignore
        QuestionComponent = _ClassicSmileyRatingQuestion.default;
      } else if (question.subType === 'slider') {
        // @ts-ignore
        QuestionComponent = _ClassicSliderRatingQuestion.default;
      } else {
        // @ts-ignore
        QuestionComponent = _ClassicIconRatingQuestion.default;
      }

      break;

    case 'nps':
      // @ts-ignore
      QuestionComponent = _ClassicSliderRatingQuestion.default;
      break;

    case 'open':
      // @ts-ignore
      QuestionComponent = _ClassicOpenQuestion.default;
      break;

    case 'ranking':
      // @ts-ignore
      QuestionComponent = _ClassicRankingQuestion.default;
      break;

    case 'ratingSlider':
      // @ts-ignore
      QuestionComponent = _ClassicSliderDragRatingQuestion.default;
      break;

    case 'dropdown':
      // @ts-ignore
      QuestionComponent = _ClassicDropdownQuestion.default;
      break;

    case 'matrixRating':
      // @ts-ignore
      QuestionComponent = _ClassicMatrixRatingQuestion.default;
      break;

    case 'matrixChoice':
      // @ts-ignore
      QuestionComponent = _ClassicMatrixChoiceQuestion.default;
      break;

    case 'multipleOpenEnded':
      // @ts-ignore
      QuestionComponent = _ClassicMultipleOpenEndedQuestion.default;
      break;

    case 'pictureChoice':
      // @ts-ignore
      QuestionComponent = _ClassicPictureChoiceQuestion.default;
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

var _default = ClassicQuestionContainer;
exports.default = _default;
//# sourceMappingURL=ClassicQuestionContainer.js.map