import { useState, useMemo } from 'react';
import type { Question, Feedback, QuestionMetaDataType } from '../data';
import { getRequiredType } from '../utils/data';
import i18n from '../translation';

export type QuestionRowItem = {
  questionId: string;
  questionTitle?: string;
  responseErrorText?: string;
  metaDataType?: QuestionMetaDataType;
  exampleMetadataText?: string;
  scale: number;
  phiData: boolean;
};

export const multipleOpenEndedValidator = (
  question: Question,
  feedback: Feedback
): boolean => {
  const { answers = [] } = feedback;
  const matrixRequiredType = getRequiredType(question);

  switch (matrixRequiredType) {
    case 'all':
      return answers.length > 1 && answers.every((value) => value !== '');
    case 'one':
      return answers.some((value) => value !== '');
    default:
      return true;
  }
};

const useMultipleOpenEnded = (
  question: Question,
  feedback: Feedback,
  onFeedback: (feedback: Feedback) => void
) => {
  const {
    questionIds,
    questionTitles = [],
    responseErrorTextList = [],
    metaDataTypeList,
    exampleMetadataTextList,
    scale = '64',
    phiDataList,
  } = question;
  const defaultAnswer = new Array(questionTitles.length).fill('');
  const requiredType = getRequiredType(question);
  const { questionId } = question;
  const selectedAnswerState = useState<string[]>(
    feedback?.answers ? feedback.answers : defaultAnswer
  );

  const updateFeedback = (answers: string[]) => {
    const hasEdited = answers.some((value) => value.length > 0);
    onFeedback({
      questionId: questionId,
      answers: hasEdited || requiredType === 'none' ? answers : defaultAnswer,
      type: 'multipleOpenEnded',
    });
  };

  const questionRows: QuestionRowItem[] = useMemo(
    () =>
      questionIds?.map((id, index) => ({
        questionId: id,
        questionTitle: questionTitles?.[index],
        responseErrorText: responseErrorTextList?.[index],
        metaDataType: metaDataTypeList?.[index],
        exampleMetadataText: exampleMetadataTextList?.[index],
        scale: Number(scale),
        phiData: phiDataList[index],
      })) || [],
    [
      exampleMetadataTextList,
      metaDataTypeList,
      phiDataList,
      questionIds,
      questionTitles,
      responseErrorTextList,
      scale,
    ]
  );
  const handleErrorHint = (forgot: boolean): string | undefined => {
    if (!forgot) return undefined;
    switch (requiredType) {
      case 'all':
        return i18n.t('survey:error-hint-required-all');
      case 'one':
        return i18n.t('survey:error-hint-least-one');
      default:
        return undefined;
    }
  };
  return {
    questionRows,
    selectedAnswerState,
    handleErrorHint,
    updateFeedback,
  };
};

export default useMultipleOpenEnded;
