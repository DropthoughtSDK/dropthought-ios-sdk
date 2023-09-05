import { useState, useEffect, useRef } from 'react';
import type { Question, QuestionType } from '../data';
import { getRequiredType } from '../utils/data';
import i18n from '../translation';

export interface MatrixChoiceFeedback {
  questionId: string;
  answers: number[][];
  type: QuestionType;
  otherFlag?: boolean;
}

export const matrixChoiceValidator = (
  question: Question,
  feedback: MatrixChoiceFeedback
): boolean => {
  const { answers = [] } = feedback;
  const requiredType = getRequiredType(question);
  switch (requiredType) {
    case 'all':
      return answers.length > 1 && answers.every((value) => value[0] !== -1);
    case 'one':
      return answers.some((value) => value[0] !== -1);
    default:
      return true;
  }
};

const useMatrixChoice = (
  question: Question,
  feedback: MatrixChoiceFeedback,
  onFeedback: (feedback: MatrixChoiceFeedback) => void
) => {
  const { questionId, questionTitles } = question;
  const [collapseList, setCollapseList] = useState<boolean[]>(
    Array(questionTitles.length).fill(true)
  );

  const [selectedAnswer, setSelectedAnswer] = useState<number[][]>(
    feedback?.answers
      ? feedback.answers
      : new Array(questionTitles.length).fill(new Array(1).fill(-1))
  );
  const hasEdited = useRef(false);
  const matrixRequiredType = getRequiredType(question);

  useEffect(() => {
    if (!hasEdited.current) {
      hasEdited.current = selectedAnswer.some((answer) =>
        answer.some((value) => value !== -1)
      );
    }
    if (hasEdited.current || matrixRequiredType === 'none') {
      onFeedback({
        questionId: questionId,
        answers: selectedAnswer,
        type: 'matrixChoice',
      });
    }
  }, [hasEdited, matrixRequiredType, onFeedback, questionId, selectedAnswer]);

  const onRowPress = (rowIndex: number) => {
    setCollapseList((previous) => {
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

  const onColoumPress = (rowIndex: number, coloumIndex: number) => {
    setSelectedAnswer((previous) => {
      const result: number[] = [];
      const newAnswer = [...previous];
      const answer = newAnswer[rowIndex];
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
      return newAnswer;
    });
  };

  const handleMatrixChoiceErrorHint = (forgot: boolean): string | undefined => {
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
    handleMatrixChoiceErrorHint,
    onRowPress,
    onColoumPress,
  };
};

export default useMatrixChoice;
