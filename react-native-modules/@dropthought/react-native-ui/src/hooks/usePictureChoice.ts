import { useEffect, useState } from 'react';
import { QuestionBrandType } from '../utils/data';
import type { Question, Feedback } from '../data';

const DefaultPictureAnswer = { image: '', value: '' };

export const usePictureChoice = (
  question: Question,
  onFeedback: (feedback: Feedback) => void,
  feedback?: Feedback
) => {
  const { questionId, subType, questionBrand, optionImages, options } =
    question;

  const images = optionImages.map((uri, index) => {
    return { uri, option: options?.[index] ?? '' };
  });

  const otherPictureEnable = questionBrand === QuestionBrandType.Other;

  const [otherPictureAnswer, setOtherPictureAnswer] = useState(() => {
    const { answers } = feedback ?? {};
    const lastItem =
      answers && answers.length > 0 ? answers[answers.length - 1] : undefined;
    if (
      lastItem &&
      typeof lastItem !== 'number' &&
      typeof lastItem !== 'string'
    ) {
      return { image: lastItem.image, value: lastItem.value };
    } else {
      return { image: '', value: '' };
    }
  });

  const [otherPictureSelected, setOtherPictureSelected] = useState(
    () =>
      otherPictureAnswer.image.length > 0 || otherPictureAnswer.value.length > 0
  );

  const [selectIndex, setSelectIndex] = useState(() => {
    const { answers } = feedback ?? {};
    if (answers && answers.length > 0) {
      if (otherPictureSelected) {
        answers.splice(-1);
        return answers.filter((answer) => typeof answer === 'number');
      } else {
        return answers.filter((answer) => typeof answer === 'number');
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
        answers: otherPictureSelected
          ? [...selectIndex, otherPictureAnswer]
          : selectIndex,
        type: 'pictureChoice',
        subType,
        otherFlag: otherPictureSelected,
      };
      // @ts-ignore
      onFeedback(result);
    }
  }, [
    selectIndex,
    otherPictureSelected,
    otherPictureAnswer,
    questionId,
    onFeedback,
    subType,
    hasEdit,
  ]);

  const resetOtherPicture = () => {
    setOtherPictureSelected(false);
    setOtherPictureAnswer(DefaultPictureAnswer);
  };

  const [invalidMessage, setInvalidMessage] = useState<string | undefined>(
    undefined
  );

  const onSelectIndex = (selected: number) => {
    setHasEdit(true);
    setSelectIndex((prev) => {
      if (prev.includes(selected)) {
        return prev?.filter((item) => item !== selected);
      } else {
        return [...prev, selected];
      }
    });
  };

  const replaceSelectIndex = (selectedList: number[] | []) => {
    setHasEdit(true);
    setSelectIndex(selectedList);
  };

  const setOtherPictureAnswerText = (text: string) => {
    setHasEdit(true);
    setOtherPictureAnswer((prev) => ({
      ...prev,
      value: text,
    }));
  };

  const setOtherPictureAnswerUrl = (url: string) => {
    setHasEdit(true);
    setOtherPictureAnswer((prev) => ({
      ...prev,
      image: url,
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
    setInvalidMessage,
  };
};
