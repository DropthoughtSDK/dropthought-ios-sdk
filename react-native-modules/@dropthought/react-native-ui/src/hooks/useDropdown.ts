import { useState, useEffect, useMemo } from 'react';
import { metaDataFormatValidator, getOptionsFromQuestion } from '../utils/data';
import i18n from '../translation';
import type { Question, Feedback } from '../data';
import { isNil } from 'ramda';
import { QuestionBrandType } from '../utils/data';

const useDropdown = (
  question: Question,
  feedback: Feedback,
  onFeedback: (feedback: Feedback) => void
) => {
  const { questionId, responseErrorText } = question;

  const options = useMemo(() => {
    let result = getOptionsFromQuestion(question);
    if (question.questionBrand === QuestionBrandType.Other) {
      const lastOption = result[result.length - 1];
      lastOption.title = i18n.t('common:others');
      lastOption.placeholder =
        isNil(question.otherText) || question.otherText === ''
          ? i18n.t('survey:other-placeholder')
          : question.otherText;
    }
    return result;
  }, [question]);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>();
  const [selectedOptionIndexCache, setSelectedOptionIndexCache] =
    useState<number>();
  const [renderList, setRenderList] = useState(options);
  const [searchText, setSearchText] = useState('');
  const [otherText, setOtherText] = useState('');
  const [hasEdited, setHasEdited] = useState(
    feedback?.answers[0] && typeof feedback.answers[0] === 'string'
      ? feedback.answers[0].length > 0
      : false
  );
  const isValid = metaDataFormatValidator(otherText, question.metaDataType);

  useEffect(() => {
    const searchedList = options.filter(({ title }) => {
      return title
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase() || '');
    });
    setRenderList(searchedList);
  }, [options, searchText]);

  const currentSelectedOption = useMemo(() => {
    return selectedOptionIndex !== undefined
      ? options[selectedOptionIndex]
      : undefined;
  }, [options, selectedOptionIndex]);

  const optionLabel = useMemo(() => {
    return currentSelectedOption?.title ?? i18n.t('survey:select-Your-Option');
  }, [currentSelectedOption]);

  useEffect(() => {
    if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
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

  useEffect(() => {
    if (currentSelectedOption === undefined) return;

    if (!currentSelectedOption.isOther) {
      setOtherText('');
      onFeedback({
        questionId: questionId,
        answers: [currentSelectedOption.index],
        type: 'dropdown',
      });
    } else if (currentSelectedOption.isOther) {
      onFeedback({
        questionId: questionId,
        answers: [''],
        type: 'dropdown',
        otherFlag: true,
      });
    }
  }, [currentSelectedOption, onFeedback, questionId]);

  useEffect(() => {
    if (currentSelectedOption && currentSelectedOption.isOther) {
      onFeedback({
        questionId: questionId,
        answers: [otherText],
        type: 'dropdown',
        otherFlag: true,
      });
    }
  }, [currentSelectedOption, onFeedback, otherText, questionId]);

  const onChangeOtherText = (text: string) => {
    setHasEdited(true);
    setOtherText(text);
  };

  const onChangeSearchText = (text: string) => {
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
    onCancel,
  };
};

export default useDropdown;
