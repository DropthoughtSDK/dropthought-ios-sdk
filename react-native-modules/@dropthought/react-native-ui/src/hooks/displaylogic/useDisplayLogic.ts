// @ts-check
import { useEffect } from 'react';
import { isEmpty } from 'ramda';
import { useStateRef } from './data';

import type {
  Page,
  Feedback,
  DisplayLogics,
  DisplayLogicProperty,
  UseDisplayLogicType,
} from './data';

const useDisplayLogic = ({
  survey,
  feedbacks,
  removeSingleFeedbackHandler,
  subLink,
}: UseDisplayLogicType) => {
  const metadataValidation = (displayLogic: DisplayLogicProperty) => {
    const {
      optionLabel: subLinkName,
      operator,
      arrayOfChoiceNumbers: options,
    } = displayLogic;

    if (subLink) {
      let allowToDisplay = false;
      if (operator === 'eq' || operator === 'answ') {
        const metadataValue = subLink.metadata[subLinkName] || '';
        allowToDisplay = options.includes(metadataValue);
      } else if (operator === 'nasw') {
        const metadataValue = subLink.metadata[subLinkName] || '';
        allowToDisplay = !options.includes(metadataValue);
      } else if (operator === 'gt') {
        const metadataValue = Number(subLink.metadata[subLinkName]);
        allowToDisplay = options
          .map((option) => metadataValue > Number(option))
          .some((value) => value === true);
      } else if (operator === 'gteq') {
        const metadataValue = Number(subLink.metadata[subLinkName]);
        allowToDisplay = options
          .map((option) => metadataValue >= Number(option))
          .some((value) => value === true);
      } else if (operator === 'lt') {
        const metadataValue = Number(subLink.metadata[subLinkName]);
        allowToDisplay = options
          .map((option) => metadataValue < Number(option))
          .some((value) => value === true);
      } else if (operator === 'lteq') {
        const metadataValue = Number(subLink.metadata[subLinkName]);
        allowToDisplay = options
          .map((option) => metadataValue <= Number(option))
          .some((value) => value === true);
      }
      return allowToDisplay;
    } else {
      return true;
    }
  };

  const questionValidation = (
    condition: string,
    displayLogic: DisplayLogicProperty,
    feedback?: Feedback
  ) => {
    const { operator, option, questionType, textMatch } = displayLogic;
    if (operator === 'mtch') {
      if (questionType === 'open') {
        const answer = feedback?.answers?.[0];
        return typeof answer === 'string'
          ? answer.toLowerCase() === option.toLowerCase()
          : false;
      } else if (questionType === 'multipleOpenEnded') {
        const answer = feedback?.answers?.[Number(option)];
        return typeof answer === 'string'
          ? answer.toLowerCase() === textMatch.toLowerCase()
          : false;
      }
    } else if (operator === 'nmtch') {
      if (questionType === 'open') {
        const answer = feedback?.answers?.[0] ?? '';
        return typeof answer === 'string'
          ? answer.toLowerCase() !== option.toLowerCase()
          : false;
      } else if (questionType === 'multipleOpenEnded') {
        const answer = feedback?.answers?.[Number(option)] ?? '';
        return typeof answer === 'string'
          ? answer.toLowerCase() !== textMatch.toLowerCase()
          : false;
      }
    }
    // conditionList length would be 2, 3 or 4
    const conditaionList = condition.split('.');
    let allowToDisplay = false;
    if (conditaionList.length <= 3) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const [_, operator, optionsStr = ''] = conditaionList;
      const options = optionsStr.split(',');

      if (operator === 'answ') {
        feedback?.answers?.forEach((answer) => {
          if (feedback.otherFlag) {
            // this line is for poll, dropdown question
            const checkNormalAnswer =
              typeof answer === 'string' && answer.length > 0;
            const checkPictureChoiceAnswer =
              // @ts-ignore
              answer?.value?.length > 0;
            allowToDisplay =
              (checkNormalAnswer || checkPictureChoiceAnswer) &&
              options.includes('-2');
          } else if (options.includes(`${answer}`)) {
            allowToDisplay = true;
          }
        });
      } else if (operator === 'nasw') {
        if (feedback?.type === 'ratingSlider') {
          let answerMatch = false;
          feedback.answers?.forEach((answer) => {
            answerMatch = options.includes(`${Number(answer) + 1}`); // because the answer is index, so we need to plus 1 to transform the answer to the real number.
          });
          allowToDisplay = !answerMatch;
        } else {
          let answerMatch = false;
          feedback?.answers?.forEach((answer) => {
            if (feedback.otherFlag) {
              // this scope is for poll, dropdown, picture choice question
              const checkNormalAnswer =
                typeof answer === 'string' && answer.length > 0;
              const checkPictureChoiceAnswer =
                feedback.type === 'pictureChoice' &&
                // @ts-ignore
                answer?.value?.length > 0;
              answerMatch =
                (checkNormalAnswer || checkPictureChoiceAnswer) &&
                options.includes('-2');
            } else if (options.includes(`${answer}`)) {
              answerMatch = true;
            }
          });
          allowToDisplay = !answerMatch;
        }
      } else if (operator === 'ansr') {
        let answerExist = false;
        if (feedback) {
          answerExist =
            feedback.answers !== undefined &&
            feedback.answers.length > 0 &&
            !isEmpty(feedback.answers[0]) &&
            feedback.answers[0] !== '-1';

          if (
            answerExist &&
            feedback.type === 'pictureChoice' &&
            feedback.otherFlag
          ) {
            const lastAnswer = feedback.answers[feedback.answers.length - 1];
            // @ts-ignore
            const { image = '', value = '' } = lastAnswer;
            answerExist = image.length > 0 && value.length > 0;
          }
        }
        allowToDisplay = answerExist;
      } else if (operator === 'nasr') {
        let answerExist = false;
        if (feedback) {
          answerExist =
            feedback.answers !== undefined &&
            feedback.answers.length > 0 &&
            !isEmpty(feedback.answers[0]) &&
            feedback.answers[0] !== '-1';

          if (
            answerExist &&
            feedback.type === 'pictureChoice' &&
            feedback.otherFlag
          ) {
            const lastAnswer = feedback.answers[feedback.answers.length - 1];
            // @ts-ignore
            const { image = '', value = '' } = lastAnswer;
            answerExist = image.length > 0 && value.length > 0;
          }
        }
        allowToDisplay = !answerExist;
      } else if (operator === 'viewed') {
        allowToDisplay = feedback !== undefined;
      } else if (operator === 'notViewed') {
        allowToDisplay = feedback === undefined;
      } else {
        let shift = 0;
        if (feedback?.type !== 'rating' && feedback?.type !== 'nps') {
          shift = 1;
        }
        const feedbackNumber = Number(feedback?.answers?.[0]) + shift; // because the answer is index, so we need to plus 1 to transform the answer to the real number.
        const optionNumber = Number(optionsStr);
        switch (operator) {
          case 'gt':
            allowToDisplay = feedbackNumber > optionNumber;
            break;
          case 'gteq':
            allowToDisplay = feedbackNumber >= optionNumber;
            break;
          case 'lt':
            allowToDisplay = feedbackNumber < optionNumber;
            break;
          case 'lteq':
            allowToDisplay = feedbackNumber <= optionNumber;
            break;
          case 'eq':
            allowToDisplay = feedbackNumber === optionNumber;
            break;
          case 'btwn':
            const [start, end] = optionsStr?.split('-') || [];
            allowToDisplay =
              Number(start) < feedbackNumber && feedbackNumber < Number(end);
            break;
        }
      }

      return allowToDisplay;
    } else if (conditaionList.length === 4) {
      // for question type: matrixRating, matrixChoice, ranking, multipleOpenEnded
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const [_, rowStr, operator, optionsStr] = conditaionList;
      const options = optionsStr && optionsStr.split(',');
      if (options !== undefined) {
        const answer = feedback?.answers?.[Number(rowStr)];
        if (operator === 'answ') {
          let answerMatch = false;
          // matrix rating option is using number, matrix choice option is using index
          if (
            feedback?.type === 'matrixRating' ||
            feedback?.type === 'ranking'
          ) {
            if (feedback.type === 'ranking') {
              const rankingAnswer = feedback.answers
                ? feedback.answers.findIndex(
                    (value) => value === Number(rowStr)
                  ) + 1
                : -1;
              answerMatch =
                answer === 'N/A'
                  ? options.includes(`N/A`)
                  : options.includes(`${rankingAnswer}`);
            } else {
              answerMatch = options.includes(`${Number(answer) + 1}`); // because the answer is index, so we need to plus 1 to transform the answer to the real number.
            }
            allowToDisplay =
              answer !== undefined && answer !== -1 && answerMatch;
          } else if (Array.isArray(answer)) {
            answerMatch = answer.some((value) => options.includes(`${value}`));
            allowToDisplay = answer !== undefined && answerMatch;
          }
        } else if (operator === 'nasw') {
          let answerMatch = false;
          // matrix rating option is using number, matrix choice option is using index
          if (displayLogic.questionType === 'matrixRating') {
            answerMatch = options.includes(`${Number(answer) + 1}`); // because the answer is index, so we need to plus 1 to transform the answer to the real number.
            allowToDisplay = !answerMatch;
          } else if (Array.isArray(answer)) {
            if (answer.length === 0) {
              allowToDisplay = false;
            } else {
              answerMatch = answer.some(
                (value) => !options.includes(`${value}`) || value === -1
              );
              allowToDisplay = answer !== undefined && answerMatch;
            }
          }
        } else if (operator === 'ansr') {
          if (Array.isArray(answer)) {
            allowToDisplay =
              !isEmpty(answer) && answer.every((value) => value !== -1);
          } else {
            allowToDisplay =
              answer !== undefined && !isEmpty(answer) && answer !== -1;
          }
        } else if (operator === 'nasr') {
          if (answer === undefined || answer === -1 || answer === '') {
            allowToDisplay = true;
          } else if (Array.isArray(answer)) {
            allowToDisplay = answer[0] === -1;
          }
        } else if (answer === undefined || answer === -1) {
          allowToDisplay = false;
        } else {
          let feedbackNumber = Number(answer) + 1; // because the answer is index, so we need to plus 1 to transform the answer to the real number.
          const optionNumber = Number(optionsStr);
          if (feedback?.type === 'ranking') {
            feedbackNumber = feedback?.answers
              ? feedback.answers.findIndex(
                  (value) => value === Number(rowStr)
                ) + 1
              : -1;
          }
          switch (operator) {
            case 'gt':
              allowToDisplay = feedbackNumber > optionNumber;
              break;
            case 'gteq':
              allowToDisplay = feedbackNumber >= optionNumber;
              break;
            case 'lt':
              allowToDisplay = feedbackNumber < optionNumber;
              break;
            case 'lteq':
              allowToDisplay = feedbackNumber <= optionNumber;
              break;
            case 'eq':
              allowToDisplay = feedbackNumber === optionNumber;
              break;
            case 'btwn':
              const [start, end] = optionsStr?.split('-') || [];
              allowToDisplay =
                Number(start) < feedbackNumber && feedbackNumber < Number(end);
              break;
          }
        }
      }

      return allowToDisplay;
    } else {
      return allowToDisplay;
    }
  };

  const checkAllowToDisplay = (displayLogics?: DisplayLogics) => {
    const { queryCondition, displayLogicArray } = displayLogics || {};
    if (queryCondition && displayLogicArray) {
      const conditions = queryCondition.split('&&');
      for (let i = 0; i < displayLogicArray.length; i++) {
        const displayLogic = displayLogicArray[i];
        const feedback = feedbacks.find(
          // eslint-disable-next-line @typescript-eslint/no-shadow
          (feedback) => feedback.questionId === displayLogic?.questionId
        );
        if (displayLogic?.logicType === 'metadata') {
          const allowToDisplay = metadataValidation(displayLogic);
          if (!allowToDisplay) {
            return false;
          }
        } else {
          const condition = conditions[i];
          const allowToDisplay =
            displayLogic && condition
              ? questionValidation(condition, displayLogic, feedback)
              : true;
          if (!allowToDisplay) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const [displayDictionary, setDisplayDictionary, displayDictionaryRef] =
    useStateRef(() => {
      const result: { [questionId: string]: boolean } = {};
      survey.pages.forEach(({ questions }) => {
        questions.forEach(({ questionId, displayLogics }) => {
          const allowToDisplay = checkAllowToDisplay(displayLogics);
          result[questionId] = allowToDisplay;
        });
      });
      return result;
    });

  useEffect(() => {
    const idsToBeRemoved: string[] = [];

    /** @type {{[questionId: string]: boolean}} */
    const result: { [questionId: string]: boolean } = {};
    survey.pages.forEach(({ questions }) => {
      questions.forEach(({ questionId, displayLogics }) => {
        const allowToDisplay = checkAllowToDisplay(displayLogics);
        result[questionId] = allowToDisplay;

        // if currently display and change to not display, we need to remove exist feedback
        if (displayDictionary[questionId] && !allowToDisplay) {
          idsToBeRemoved.push(questionId);
        }
      });
    });

    setDisplayDictionary(result);

    idsToBeRemoved.forEach((questionId) => {
      removeSingleFeedbackHandler && removeSingleFeedbackHandler(questionId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbacks]);

  const getDisplayStatusForPage = (page: Page) => {
    const { questions } = page;
    const result = questions.map(
      ({ questionId }) => displayDictionary[questionId]
    );
    return result;
  };

  return {
    displayDictionary,
    displayDictionaryRef,
    getDisplayStatusForPage,
    checkAllowToDisplay,
  };
};

export default useDisplayLogic;
