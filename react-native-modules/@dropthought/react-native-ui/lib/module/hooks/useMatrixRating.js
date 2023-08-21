import { useState, useEffect } from 'react';
import { getRequiredType } from '../utils/data';
import i18n from '../translation';
export const matrixRatingValidator = (question, feedback) => {
  const {
    answers = []
  } = feedback;
  const matrixRequiredType = getRequiredType(question);

  switch (matrixRequiredType) {
    case 'all':
      return answers.length > 1 && answers.every(value => value !== -1);

    case 'one':
      return answers.some(value => value !== -1);

    default:
      return true;
  }
};

const useMatrixRating = (question, feedback, onFeedback) => {
  const {
    questionId,
    questionTitles
  } = question;
  const [collapseList, setCollapseList] = useState(Array(questionTitles.length).fill(true));
  const [selectedAnswer, setSelectedAnswer] = useState(feedback !== null && feedback !== void 0 && feedback.answers ? feedback.answers : new Array(questionTitles.length).fill(-1));
  const hasEdited = selectedAnswer.some(value => value !== -1);
  const matrixRequiredType = getRequiredType(question);
  useEffect(() => {
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
        return i18n.t('survey:error-hint-required-all');

      case 'one':
        return i18n.t('survey:error-hint-least-one');

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

export default useMatrixRating;
//# sourceMappingURL=useMatrixRating.js.map