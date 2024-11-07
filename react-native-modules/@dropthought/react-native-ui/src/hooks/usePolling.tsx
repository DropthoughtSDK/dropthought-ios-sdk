import { useState, useEffect } from 'react';
import type { Question, Feedback } from '../data';
import type { onPostPollChoiceType } from '../containers/SurveyScreenLayout';
import { usePollingRecord } from './usePollingRecord';

export interface PollingOption {
  title?: string;
  choice?: string;
  otherFlag: boolean;
}

const usePolling = (
  question: Question,
  onFeedback: (feedback: Feedback) => void,
  onPostPollChoice: onPostPollChoiceType,
  feedback?: Feedback
) => {
  const { options, questionId, optionIds, otherTextLabel } = question;
  const { answers, otherFlag = false } = feedback || {};

  const { pollingRecord, setPollingRecord } = usePollingRecord();

  const feedbackToPollingOption = (): PollingOption | undefined => {
    let index = answers?.[0];
    if (feedback) {
      if (typeof index === 'number' && options && optionIds) {
        return {
          title: options[index],
          choice: `${optionIds[index]}`,
          otherFlag: false,
        };
      } else {
        const initOtherText =
          otherFlag && feedback && typeof feedback.answers[0] === 'string'
            ? feedback.answers[0]
            : '';
        return {
          title: otherTextLabel,
          choice: initOtherText,
          otherFlag: true,
        };
      }
    }
    return undefined;
  };

  const [selectedOption, setSelectedOption] = useState<
    PollingOption | undefined
  >(feedbackToPollingOption());

  useEffect(() => {
    if (selectedOption) {
      const selectedIndex = optionIds
        ?.map((value) => `${value}`)
        ?.indexOf(`${selectedOption?.choice}`);
      const result = {
        questionId,
        answers: [selectedIndex === -1 ? selectedOption.choice : selectedIndex],
        type: 'poll',
        otherFlag: selectedOption.otherFlag,
      };
      // @ts-ignore
      onFeedback(result);
    }
  }, [selectedOption, onFeedback, optionIds, questionId]);

  const onPoll = async (option: PollingOption) => {
    setSelectedOption(option);
    try {
      const data = await onPostPollChoice({
        questionId: questionId,
        choice: option.choice,
        isOther: option.otherFlag ?? false,
      });
      if (data) {
        setPollingRecord((prev) => ({ ...prev, [questionId]: data }));
      }
    } catch (err) {
      console.error('post fail', err);
    }
  };

  return {
    selectedOption,
    setSelectedOption,
    onPoll,
    pollingResult: pollingRecord[questionId],
  };
};

export default usePolling;
