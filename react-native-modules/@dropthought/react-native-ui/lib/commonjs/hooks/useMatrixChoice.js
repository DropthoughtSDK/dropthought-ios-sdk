"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixChoiceValidator = exports.default = void 0;
var _react = require("react");
var _data = require("../utils/data");
var _translation = _interopRequireDefault(require("../translation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const matrixChoiceValidator = (question, feedback) => {
  const {
    answers = []
  } = feedback;
  const requiredType = (0, _data.getRequiredType)(question);
  switch (requiredType) {
    case 'all':
      return answers.length > 1 && answers.every(value => value[0] !== -1);
    case 'one':
      return answers.some(value => value[0] !== -1);
    default:
      return true;
  }
};
exports.matrixChoiceValidator = matrixChoiceValidator;
const useMatrixChoice = (question, feedback, onFeedback) => {
  const {
    questionId,
    questionTitles
  } = question;
  const [collapseList, setCollapseList] = (0, _react.useState)(Array(questionTitles.length).fill(true));
  const [selectedAnswer, setSelectedAnswer] = (0, _react.useState)(feedback !== null && feedback !== void 0 && feedback.answers ? feedback.answers : new Array(questionTitles.length).fill(new Array(1).fill(-1)));
  const hasEdited = (0, _react.useRef)(false);
  const matrixRequiredType = (0, _data.getRequiredType)(question);
  (0, _react.useEffect)(() => {
    if (!hasEdited.current) {
      hasEdited.current = selectedAnswer.some(answer => answer.some(value => value !== -1));
    }
    if (hasEdited.current || matrixRequiredType === 'none') {
      onFeedback({
        questionId: questionId,
        answers: selectedAnswer,
        type: 'matrixChoice'
      });
    }
  }, [hasEdited, matrixRequiredType, onFeedback, questionId, selectedAnswer]);
  const onRowPress = rowIndex => {
    setCollapseList(previous => {
      const list = previous.map((collapse, index) => {
        if (!collapse) {
          return true;
        } else {
          return index !== rowIndex;
        }
      });
      return list;
    });
  };
  const onColoumPress = (rowIndex, coloumIndex) => {
    setSelectedAnswer(previous => {
      const result = [];
      const newAnswer = [...previous];
      const answer = newAnswer[rowIndex];
      if (answer) {
        if (answer[0] === -1) {
          //not answer
          result.push(coloumIndex);
        } else {
          let answerIndex = 0;
          const isAnswered = answer.some((value, index) => {
            if (value === coloumIndex) {
              answerIndex = index;
              return true;
            }
            return false;
          });
          if (isAnswered) {
            //was answered
            answer.splice(answerIndex, 1);
            if (answer.length === 0) {
              result.push(-1);
            } else {
              result.push(...answer);
            }
          } else {
            //the answer is not include the answered
            result.push(...answer);
            result.push(coloumIndex);
          }
        }
        if (result.length === 0) {
          result.push(-1);
        }
        newAnswer[rowIndex] = result.sort();
      }
      return newAnswer;
    });
  };
  const handleMatrixChoiceErrorHint = forgot => {
    if (!forgot) return undefined;
    switch (matrixRequiredType) {
      case 'all':
        return _translation.default.t('survey:error-hint-required-all');
      case 'one':
        return _translation.default.t('survey:error-hint-least-one');
      default:
        return undefined;
    }
  };
  return {
    collapseList,
    selectedAnswer,
    handleMatrixChoiceErrorHint,
    onRowPress,
    onColoumPress
  };
};
var _default = exports.default = useMatrixChoice;
//# sourceMappingURL=useMatrixChoice.js.map