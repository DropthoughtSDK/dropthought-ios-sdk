"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _usePollingRecord = require("./usePollingRecord");
const usePolling = (question, onFeedback, onPostPollChoice, feedback) => {
  const {
    options,
    questionId,
    optionIds,
    otherTextLabel
  } = question;
  const {
    answers,
    otherFlag = false
  } = feedback || {};
  const {
    pollingRecord,
    setPollingRecord
  } = (0, _usePollingRecord.usePollingRecord)();
  const feedbackToPollingOption = () => {
    let index = answers === null || answers === void 0 ? void 0 : answers[0];
    if (feedback) {
      if (typeof index === 'number' && options && optionIds) {
        return {
          title: options[index],
          choice: `${optionIds[index]}`,
          otherFlag: false
        };
      } else {
        const initOtherText = otherFlag && feedback && typeof feedback.answers[0] === 'string' ? feedback.answers[0] : '';
        return {
          title: otherTextLabel,
          choice: initOtherText,
          otherFlag: true
        };
      }
    }
    return undefined;
  };
  const [selectedOption, setSelectedOption] = (0, _react.useState)(feedbackToPollingOption());
  (0, _react.useEffect)(() => {
    if (selectedOption) {
      var _optionIds$map;
      const selectedIndex = optionIds === null || optionIds === void 0 || (_optionIds$map = optionIds.map(value => `${value}`)) === null || _optionIds$map === void 0 ? void 0 : _optionIds$map.indexOf(`${selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.choice}`);
      const result = {
        questionId,
        answers: [selectedIndex === -1 ? selectedOption.choice : selectedIndex],
        type: 'poll',
        otherFlag: selectedOption.otherFlag
      };
      // @ts-ignore
      onFeedback(result);
    }
  }, [selectedOption, onFeedback, optionIds, questionId]);
  const onPoll = async option => {
    setSelectedOption(option);
    try {
      const data = await onPostPollChoice({
        questionId: questionId,
        choice: option.choice,
        isOther: option.otherFlag ?? false
      });
      if (data) {
        setPollingRecord(prev => ({
          ...prev,
          [questionId]: data
        }));
      }
    } catch (err) {
      console.error('post fail', err);
    }
  };
  return {
    selectedOption,
    setSelectedOption,
    onPoll,
    pollingResult: pollingRecord[questionId]
  };
};
var _default = exports.default = usePolling;
//# sourceMappingURL=usePolling.js.map