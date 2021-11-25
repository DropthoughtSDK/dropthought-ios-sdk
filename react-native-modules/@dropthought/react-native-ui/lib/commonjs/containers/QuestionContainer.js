"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _data = require("../utils/data");

var _feedback = require("../contexts/feedback");

var _SingleChoiceQuestion = _interopRequireDefault(require("../components/SingleChoiceQuestion"));

var _MultiChoiceQuestion = _interopRequireDefault(require("../components/MultiChoiceQuestion"));

var _SmileyRatingQuestion = _interopRequireDefault(require("../components/SmileyRatingQuestion"));

var _SliderRatingQuestion = _interopRequireDefault(require("../components/SliderRatingQuestion"));

var _OpenQuestion = _interopRequireDefault(require("../components/OpenQuestion"));

var _MandatoryTitle = _interopRequireDefault(require("../components/MandatoryTitle"));

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
  }, /*#__PURE__*/React.createElement(_MandatoryTitle.default, {
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

  const feedback = (0, _feedback.useFeedbackByQid)(props.question.questionId);
  const feedbackDispatch = (0, _feedback.useFeedbackDispatch)();
  const onFeedbackHandler = React.useCallback(updatedFeedback => {
    (0, _feedback.updateFeedback)(feedbackDispatch, updatedFeedback); // @ts-ignore

    propsOnFeedback && propsOnFeedback(_feedback.updateFeedback);
  }, [feedbackDispatch, propsOnFeedback]); // whether to display the forgot warning message

  const forgot = validationStarted && !(0, _data.mandatoryQuestionValidator)(props.question, feedback);

  switch (props.question.type) {
    case 'singleChoice':
      // @ts-ignore
      QuestionComponent = _SingleChoiceQuestion.default;
      break;

    case 'multiChoice':
      // @ts-ignore
      QuestionComponent = _MultiChoiceQuestion.default;
      break;

    case 'rating':
      if (props.question.subType === 'smiley') {
        // @ts-ignore
        QuestionComponent = _SmileyRatingQuestion.default;
      } else {
        // @ts-ignore
        QuestionComponent = _SliderRatingQuestion.default;
      }

      break;

    case 'nps':
      // @ts-ignore
      QuestionComponent = _SliderRatingQuestion.default;
      break;

    case 'open':
      // @ts-ignore
      QuestionComponent = _OpenQuestion.default;
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

var _default = QuestionContainer;
exports.default = _default;
//# sourceMappingURL=QuestionContainer.js.map