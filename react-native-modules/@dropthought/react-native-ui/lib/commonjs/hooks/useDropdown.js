"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _data = require("../utils/data");
var _translation = _interopRequireDefault(require("../translation"));
var _ramda = require("ramda");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useDropdown = (question, feedback, onFeedback) => {
  const {
    questionId,
    responseErrorText
  } = question;
  const options = (0, _react.useMemo)(() => {
    let result = (0, _data.getOptionsFromQuestion)(question);
    if (question.questionBrand === _data.QuestionBrandType.Other) {
      const lastOption = result[result.length - 1];
      if (lastOption) {
        lastOption.title = _translation.default.t('common:others');
        lastOption.placeholder = (0, _ramda.isNil)(question.otherText) || question.otherText === '' ? _translation.default.t('survey:other-placeholder') : question.otherText;
      }
    }
    return result;
  }, [question]);
  const [bottomSheetVisible, setBottomSheetVisible] = (0, _react.useState)(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = (0, _react.useState)();
  const [selectedOptionIndexCache, setSelectedOptionIndexCache] = (0, _react.useState)();
  const [renderList, setRenderList] = (0, _react.useState)(options);
  const [searchText, setSearchText] = (0, _react.useState)('');
  const [otherText, setOtherText] = (0, _react.useState)('');
  const [hasEdited, setHasEdited] = (0, _react.useState)(feedback !== null && feedback !== void 0 && feedback.answers[0] && typeof feedback.answers[0] === 'string' ? feedback.answers[0].length > 0 : false);
  const isValid = (0, _data.metaDataFormatValidator)(otherText, question.metaDataType);
  (0, _react.useEffect)(() => {
    const searchedList = options.filter(({
      title
    }) => {
      return title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase() || '');
    });
    setRenderList(searchedList);
  }, [options, searchText]);
  const currentSelectedOption = (0, _react.useMemo)(() => {
    return selectedOptionIndex !== undefined ? options[selectedOptionIndex] : undefined;
  }, [options, selectedOptionIndex]);
  const optionLabel = (0, _react.useMemo)(() => {
    return (currentSelectedOption === null || currentSelectedOption === void 0 ? void 0 : currentSelectedOption.title) ?? _translation.default.t('survey:select-Your-Option');
  }, [currentSelectedOption]);
  (0, _react.useEffect)(() => {
    if (feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0])) {
      const answer = feedback.answers[0];
      if (typeof answer === 'number') {
        setSelectedOptionIndex(answer);
      } else if (typeof answer === 'string') {
        // if the answer is not a number type,
        // it is for other label, return the last index
        setOtherText(answer);
        const indexOfOther = options.length - 1;
        setSelectedOptionIndex(indexOfOther);
      }
    }
  }, [feedback, options.length]);
  (0, _react.useEffect)(() => {
    if (currentSelectedOption === undefined) return;
    if (!currentSelectedOption.isOther) {
      setOtherText('');
      onFeedback({
        questionId: questionId,
        answers: [currentSelectedOption.index],
        type: 'dropdown'
      });
    } else if (currentSelectedOption.isOther) {
      onFeedback({
        questionId: questionId,
        answers: [''],
        type: 'dropdown',
        otherFlag: true
      });
    }
  }, [currentSelectedOption, onFeedback, questionId]);
  (0, _react.useEffect)(() => {
    if (currentSelectedOption && currentSelectedOption.isOther) {
      onFeedback({
        questionId: questionId,
        answers: [otherText],
        type: 'dropdown',
        otherFlag: true
      });
    }
  }, [currentSelectedOption, onFeedback, otherText, questionId]);
  const onChangeOtherText = text => {
    setHasEdited(true);
    setOtherText(text);
  };
  const onChangeSearchText = text => {
    setSearchText(text);
  };
  const onCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };
  const onOpenBottomSheet = () => {
    setSelectedOptionIndexCache(selectedOptionIndex);
    setBottomSheetVisible(true);
  };
  const onConfirm = () => {
    setSelectedOptionIndex(selectedOptionIndexCache);
    setSearchText('');
    onCloseBottomSheet();
  };
  const onCancel = () => {
    setSelectedOptionIndexCache(undefined);
    setSearchText('');
    onCloseBottomSheet();
  };
  return {
    selectedOptionIndexCache,
    setSelectedOptionIndexCache,
    currentSelectedOption,
    invalidMessage: hasEdited && !isValid ? responseErrorText : undefined,
    bottomSheetVisible,
    optionLabel,
    renderList,
    otherText,
    onChangeOtherText,
    onChangeSearchText,
    onCloseBottomSheet,
    onOpenBottomSheet,
    onConfirm,
    onCancel
  };
};
var _default = exports.default = useDropdown;
//# sourceMappingURL=useDropdown.js.map