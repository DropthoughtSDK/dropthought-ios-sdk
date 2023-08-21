"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixRatingValidator = exports.default = void 0;

var _react = require("react");

var _data = require("../utils/data");

var _translation = _interopRequireDefault(require("../translation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const matrixRatingValidator = (question, feedback) => {
  const {
    answers = []
  } = feedback;
  const matrixRequiredType = (0, _data.getRequiredType)(question);

  switch (matrixRequiredType) {
    case 'all':
      return answers.length > 1 && answers.every(value => value !== -1);

    case 'one':
      return answers.some(value => value !== -1);

    default:
      return true;
  }
};

exports.matrixRatingValidator = matrixRatingValidator;

const useMatrixRating = (question, feedback, onFeedback) => {
  const {
    questionId,
    questionTitles
  } = question;
  const [collapseList, setCollapseList] = (0, _react.useState)(Array(questionTitles.length).fill(true));
  const [selectedAnswer, setSelectedAnswer] = (0, _react.useState)(feedback !== null && feedback !== void 0 && feedback.answers ? feedback.answers : new Array(questionTitles.length).fill(-1));
  const hasEdited = selectedAnswer.some(value => value !== -1);
  const matrixRequiredType = (0, _data.getRequiredType)(question);
  (0, _react.useEffect)(() => {
    if (hasEdited || matrixRequiredType === 'none') {
      onFeedback({
        questionId: questionId,
        answers: selectedAnswer,
        type: 'matrixRating'
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
      const answers = previous.map((answer, index) => index === rowIndex ? coloumIndex : answer);
      return answers;
    });
    setCollapseList(previous => {
      const list = previous.map((_, index) => {
        return index !== rowIndex + 1;
      });
      return list;
    });
  };

  const handleMatrixRatingErrorHint = forgot => {
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
    handleMatrixRatingErrorHint,
    onRowPress,
    onColoumPress
  };
};

var _default = useMatrixRating;
exports.default = _default;
//# sourceMappingURL=useMatrixRating.js.map