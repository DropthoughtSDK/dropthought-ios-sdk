"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _data = require("../utils/data");
var _feedback = require("../contexts/feedback");
var _SmileyRatingQuestionOption = _interopRequireDefault(require("../components/SmileyRatingQuestionOption1"));
var _SmileyRatingQuestionOption2 = _interopRequireDefault(require("../components/SmileyRatingQuestionOption2"));
var _SmileyRatingQuestionOption3 = _interopRequireDefault(require("../components/SmileyRatingQuestionOption3"));
var _SmileyRatingQuestionOption4 = _interopRequireDefault(require("../components/SmileyRatingQuestionOption4"));
var _SmileyRatingQuestionOption5 = _interopRequireDefault(require("../components/SmileyRatingQuestionOption6"));
var _RankingQuestion = _interopRequireDefault(require("../components/RankingQuestion"));
var _SingleChoiceQuestion = _interopRequireDefault(require("../components/SingleChoiceQuestion"));
var _MultiChoiceQuestion = _interopRequireDefault(require("../components/MultiChoiceQuestion"));
var _SliderRatingQuestion = _interopRequireDefault(require("../components/SliderRatingQuestion"));
var _OpenQuestion = _interopRequireDefault(require("../components/OpenQuestion"));
var _IconRatingQuestion = _interopRequireDefault(require("../components/IconRatingQuestion"));
var _SliderDragRatingQuestion = _interopRequireDefault(require("../components/SliderDragRatingQuestion"));
var _DropdownQuestion = _interopRequireDefault(require("../components/DropdownQuestion"));
var _MatrixRatingQuestion = _interopRequireDefault(require("../components/MatrixRatingQuestion"));
var _MatrixChoiceQuestion = _interopRequireDefault(require("../components/MatrixChoiceQuestion"));
var _MultipleOpenEndedQuestion = _interopRequireDefault(require("../components/MultipleOpenEndedQuestion"));
var _PictureChoiceQuestion = _interopRequireDefault(require("../components/PictureChoiceQuestion"));
var _PollingQuestion = _interopRequireDefault(require("../components/PollingQuestion"));
var _FileQuestion = _interopRequireDefault(require("../components/FileQuestion"));
var _StatementQuestion = _interopRequireDefault(require("../components/StatementQuestion"));
var _MandatoryTitle = _interopRequireDefault(require("../components/MandatoryTitle"));
var _styles = _interopRequireDefault(require("../styles"));
var _theme = require("../contexts/theme");
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
  }, /*#__PURE__*/React.createElement(_MandatoryTitle.default, {
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
  let QuestionComponent = TempComponent;

  // get/update feedback to context
  const feedback = (0, _feedback.useFeedbackByQid)(props.question.questionId);
  const feedbackDispatch = (0, _feedback.useFeedbackDispatch)();
  const onFeedbackHandler = React.useCallback(updatedFeedback => {
    (0, _feedback.updateFeedback)(feedbackDispatch, updatedFeedback);
    // @ts-ignore
    propsOnFeedback && propsOnFeedback(_feedback.updateFeedback);
  }, [feedbackDispatch, propsOnFeedback]);

  // whether to display the forgot warning message
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
        switch (themeOption) {
          case _theme.THEME_OPTION.OPTION1:
            // @ts-ignore
            QuestionComponent = _SmileyRatingQuestionOption.default;
            break;
          case _theme.THEME_OPTION.OPTION2:
            // @ts-ignore
            QuestionComponent = _SmileyRatingQuestionOption2.default;
            break;
          case _theme.THEME_OPTION.OPTION3:
            // @ts-ignore
            QuestionComponent = _SmileyRatingQuestionOption3.default;
            break;
          case _theme.THEME_OPTION.OPTION4:
            // @ts-ignore
            QuestionComponent = _SmileyRatingQuestionOption4.default;
            break;
          case _theme.THEME_OPTION.OPTION6:
            // @ts-ignore
            QuestionComponent = _SmileyRatingQuestionOption5.default;
            break;
          default:
            // @ts-ignore
            QuestionComponent = _SmileyRatingQuestionOption.default;
        }
      } else if (props.question.subType === 'slider') {
        // @ts-ignore
        QuestionComponent = _SliderRatingQuestion.default;
      } else {
        // @ts-ignore
        QuestionComponent = _IconRatingQuestion.default;
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
    case 'ranking':
      // @ts-ignore
      QuestionComponent = _RankingQuestion.default;
      break;
    case 'ratingSlider':
      // @ts-ignore
      QuestionComponent = _SliderDragRatingQuestion.default;
      break;
    case 'dropdown':
      // @ts-ignore
      QuestionComponent = _DropdownQuestion.default;
      break;
    case 'matrixRating':
      // @ts-ignore
      QuestionComponent = _MatrixRatingQuestion.default;
      break;
    case 'matrixChoice':
      // @ts-ignore
      QuestionComponent = _MatrixChoiceQuestion.default;
      break;
    case 'multipleOpenEnded':
      // @ts-ignore
      QuestionComponent = _MultipleOpenEndedQuestion.default;
      break;
    case 'pictureChoice':
      // @ts-ignore
      QuestionComponent = _PictureChoiceQuestion.default;
      break;
    case 'poll':
      // @ts-ignore
      QuestionComponent = _PollingQuestion.default;
      break;
    case 'file':
      // @ts-ignore
      QuestionComponent = _FileQuestion.default;
      break;
    case 'statement':
      // @ts-ignore
      QuestionComponent = _StatementQuestion.default;
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
var _default = exports.default = QuestionContainer;
//# sourceMappingURL=QuestionContainer.js.map