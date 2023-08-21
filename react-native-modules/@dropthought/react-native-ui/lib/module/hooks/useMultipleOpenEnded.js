import { useState, useMemo } from 'react';
import { getRequiredType } from '../utils/data';
import i18n from '../translation';
export const multipleOpenEndedValidator = (question, feedback) => {
  const {
    answers = []
  } = feedback;
  const matrixRequiredType = getRequiredType(question);

  switch (matrixRequiredType) {
    case 'all':
      return answers.length > 1 && answers.every(value => value !== '');

    case 'one':
      return answers.some(value => value !== '');

    default:
      return true;
  }
};

const useMultipleOpenEnded = (question, feedback, onFeedback) => {
  const {
    questionIds,
    questionTitles = [],
    responseErrorTextList = [],
    metaDataTypeList,
    exampleMetadataTextList,
    scale = '64',
    phiDataList
  } = question;
  const defaultAnswer = new Array(questionTitles.length).fill('');
  const requiredType = getRequiredType(question);
  const {
    questionId
  } = question;
  const selectedAnswerState = useState(feedback !== null && feedback !== void 0 && feedback.answers ? feedback.answers : defaultAnswer);

  const updateFeedback = answers => {
    const hasEdited = answers.some(value => value.length > 0);
    onFeedback({
      questionId: questionId,
      answers: hasEdited || requiredType === 'none' ? answers : defaultAnswer,
      type: 'multipleOpenEnded'
    });
  };

  const questionRows = useMemo(() => (questionIds === null || questionIds === void 0 ? void 0 : questionIds.map((id, index) => ({
    questionId: id,
    questionTitle: questionTitles === null || questionTitles === void 0 ? void 0 : questionTitles[index],
    responseErrorText: responseErrorTextList === null || responseErrorTextList === void 0 ? void 0 : responseErrorTextList[index],
    metaDataType: metaDataTypeList === null || metaDataTypeList === void 0 ? void 0 : metaDataTypeList[index],
    exampleMetadataText: exampleMetadataTextList === null || exampleMetadataTextList === void 0 ? void 0 : exampleMetadataTextList[index],
    scale: Number(scale),
    phiData: phiDataList[index]
  }))) || [], [exampleMetadataTextList, metaDataTypeList, phiDataList, questionIds, questionTitles, responseErrorTextList, scale]);

  const handleErrorHint = forgot => {
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
    updateFeedback
  };
};

export default useMultipleOpenEnded;
//# sourceMappingURL=useMultipleOpenEnded.js.map