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
var _ClassicPollingQuestion = _interopRequireDefault(require("../components/ClassicPollingQuestion"));
var _ClassicFileQuestion = _interopRequireDefault(require("../components/ClassicFileQuestion"));
var _ClassicStatementQuestion = _interopRequireDefault(require("../components/ClassicStatementQuestion"));
var _ClassicMandatoryTitle = _interopRequireDefault(require("../components/ClassicMandatoryTitle"));
var _styles = _interopRequireDefault(require("../styles"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
// @ts-ignore

const TempComponent = ({
  mandatoryErrorMessage,
  question,
  forgot
}) => {
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/React.createElement(_ClassicMandatoryTitle.default, {
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
  const feedback = (0, _feedback.useFeedbackByQid)(question.questionId);
  const feedbackDispatch = (0, _feedback.useFeedbackDispatch)();
  const onFeedbackHandler = React.useCallback(updatedFeedback => {
    (0, _feedback.updateFeedback)(feedbackDispatch, updatedFeedback);
    // @ts-ignore
    propsOnFeedback && propsOnFeedback(_feedback.updateFeedback);
  }, [feedbackDispatch, propsOnFeedback]);

  // whether to display the forgot warning message
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
    case 'poll':
      // @ts-ignore
      QuestionComponent = _ClassicPollingQuestion.default;
      break;
    case 'file':
      // @ts-ignore
      QuestionComponent = _ClassicFileQuestion.default;
      break;
    case 'statement':
      // @ts-ignore
      QuestionComponent = _ClassicStatementQuestion.default;
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
var _default = exports.default = ClassicQuestionContainer;
//# sourceMappingURL=ClassicQuestionContainer.js.map