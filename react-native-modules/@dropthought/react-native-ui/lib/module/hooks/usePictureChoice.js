import { useEffect, useState } from 'react';
import { QuestionBrandType } from '../utils/data';
const DefaultPictureAnswer = {
  image: '',
  value: ''
};
export const multiplePictureChoiceValidator = (question, feedback) => {
  const {
    answers
  } = feedback !== null && feedback !== void 0 ? feedback : {};
  const lastItem = answers && answers.length > 0 ? answers[answers.length - 1] : undefined;

  if (answers && answers.length > 0) {
    if (lastItem && typeof lastItem !== 'number' && typeof lastItem !== 'string') {
      return lastItem.image.length > 0 && lastItem.value.length > 0;
    } else {
      return true;
    }
  } else {
    // if mandatory return false
    return !question.mandatory;
  }
};
export const usePictureChoice = (question, onFeedback, feedback) => {
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
  const otherPictureEnable = questionBrand === QuestionBrandType.Other;
  const [otherPictureAnswer, setOtherPictureAnswer] = useState(() => {
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
  const [otherPictureSelected, setOtherPictureSelected] = useState(() => otherPictureAnswer.image.length > 0 || otherPictureAnswer.value.length > 0);
  const [selectIndex, setSelectIndex] = useState(() => {
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
  const [hasEdit, setHasEdit] = useState(() => {
    return feedback !== undefined;
  });
  useEffect(() => {
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

  const [invalidMessage, setInvalidMessage] = useState(undefined);

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
//# sourceMappingURL=usePictureChoice.js.map