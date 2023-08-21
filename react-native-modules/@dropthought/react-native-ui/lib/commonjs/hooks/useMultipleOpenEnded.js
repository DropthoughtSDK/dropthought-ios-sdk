"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multipleOpenEndedValidator = exports.default = void 0;

var _react = require("react");

var _data = require("../utils/data");

var _translation = _interopRequireDefault(require("../translation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multipleOpenEndedValidator = (question, feedback) => {
  const {
    answers = []
  } = feedback;
  const matrixRequiredType = (0, _data.getRequiredType)(question);

  switch (matrixRequiredType) {
    case 'all':
      return answers.length > 1 && answers.every(value => value !== '');

    case 'one':
      return answers.some(value => value !== '');

    default:
      return true;
  }
};

exports.multipleOpenEndedValidator = multipleOpenEndedValidator;

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
  const requiredType = (0, _data.getRequiredType)(question);
  const {
    questionId
  } = question;
  const selectedAnswerState = (0, _react.useState)(feedback !== null && feedback !== void 0 && feedback.answers ? feedback.answers : defaultAnswer);

  const updateFeedback = answers => {
    const hasEdited = answers.some(value => value.length > 0);
    onFeedback({
      questionId: questionId,
      answers: hasEdited || requiredType === 'none' ? answers : defaultAnswer,
      type: 'multipleOpenEnded'
    });
  };

  const questionRows = (0, _react.useMemo)(() => (questionIds === null || questionIds === void 0 ? void 0 : questionIds.map((id, index) => ({
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
        return _translation.default.t('survey:error-hint-required-all');

      case 'one':
        return _translation.default.t('survey:error-hint-least-one');

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

var _default = useMultipleOpenEnded;
exports.default = _default;
//# sourceMappingURL=useMultipleOpenEnded.js.map