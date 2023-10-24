"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePictureChoice = void 0;

var _react = require("react");

var _data = require("../utils/data");

const DefaultPictureAnswer = {
  image: '',
  value: ''
};

const usePictureChoice = (question, onFeedback, feedback) => {
  const {
    questionId,
    subType,
    questionBrand,
    optionImages,
    options
  } = question;
  const images = optionImages.map((uri, index) => {
    var _options$index;

    return {
      uri,
      option: (_options$index = options === null || options === void 0 ? void 0 : options[index]) !== null && _options$index !== void 0 ? _options$index : ''
    };
  });
  const otherPictureEnable = questionBrand === _data.QuestionBrandType.Other;
  const [otherPictureAnswer, setOtherPictureAnswer] = (0, _react.useState)(() => {
    const {
      answers
    } = feedback !== null && feedback !== void 0 ? feedback : {};
    const lastItem = answers && answers.length > 0 ? answers[answers.length - 1] : undefined;

    if (lastItem && typeof lastItem !== 'number' && typeof lastItem !== 'string') {
      return {
        image: lastItem.image,
        value: lastItem.value
      };
    } else {
      return {
        image: '',
        value: ''
      };
    }
  });
  const [otherPictureSelected, setOtherPictureSelected] = (0, _react.useState)(() => otherPictureAnswer.image.length > 0 || otherPictureAnswer.value.length > 0);
  const [selectIndex, setSelectIndex] = (0, _react.useState)(() => {
    const {
      answers
    } = feedback !== null && feedback !== void 0 ? feedback : {};

    if (answers && answers.length > 0) {
      if (otherPictureSelected) {
        answers.splice(-1);
        return answers.filter(answer => typeof answer === 'number');
      } else {
        return answers.filter(answer => typeof answer === 'number');
      }
    } else {
      return [];
    }
  });
  const isMultipleChoice = subType === 'multiChoice';
  const [hasEdit, setHasEdit] = (0, _react.useState)(() => {
    return feedback !== undefined;
  });
  (0, _react.useEffect)(() => {
    if (hasEdit) {
      const result = {
        questionId,
        answers: otherPictureSelected ? [...selectIndex, otherPictureAnswer] : selectIndex,
        type: 'pictureChoice',
        subType,
        otherFlag: otherPictureSelected
      }; // @ts-ignore

      onFeedback(result);
    }
  }, [selectIndex, otherPictureSelected, otherPictureAnswer, questionId, onFeedback, subType, hasEdit]);

  const resetOtherPicture = () => {
    setOtherPictureSelected(false);
    setOtherPictureAnswer(DefaultPictureAnswer);
  };

  const [invalidMessage, setInvalidMessage] = (0, _react.useState)(undefined);

  const onSelectIndex = selected => {
    setHasEdit(true);
    setSelectIndex(prev => {
      if (prev.includes(selected)) {
        return prev === null || prev === void 0 ? void 0 : prev.filter(item => item !== selected);
      } else {
        return [...prev, selected];
      }
    });
  };

  const replaceSelectIndex = selectedList => {
    setHasEdit(true);
    setSelectIndex(selectedList);
  };

  const setOtherPictureAnswerText = text => {
    setHasEdit(true);
    setOtherPictureAnswer(prev => ({ ...prev,
      value: text
    }));
  };

  const setOtherPictureAnswerUrl = url => {
    setHasEdit(true);
    setOtherPictureAnswer(prev => ({ ...prev,
      image: url
    }));
  };

  return {
    images,
    otherPictureEnable,
    otherPictureAnswer,
    setOtherPictureAnswerText,
    setOtherPictureAnswerUrl,
    otherPictureSelected,
    setOtherPictureSelected,
    selectIndex,
    onSelectIndex,
    replaceSelectIndex,
    isMultipleChoice,
    resetOtherPicture,
    invalidMessage,
    setInvalidMessage
  };
};

exports.usePictureChoice = usePictureChoice;
//# sourceMappingURL=usePictureChoice.js.map