"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _ramda = require("ramda");
var _data = require("./data");
// @ts-check

const useDisplayLogic = ({
  survey,
  feedbacks,
  removeSingleFeedbackHandler,
  subLink
}) => {
  const metadataValidation = displayLogic => {
    const {
      optionLabel: subLinkName,
      operator,
      arrayOfChoiceNumbers: options
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
        allowToDisplay = options.map(option => metadataValue > Number(option)).some(value => value === true);
      } else if (operator === 'gteq') {
        const metadataValue = Number(subLink.metadata[subLinkName]);
        allowToDisplay = options.map(option => metadataValue >= Number(option)).some(value => value === true);
      } else if (operator === 'lt') {
        const metadataValue = Number(subLink.metadata[subLinkName]);
        allowToDisplay = options.map(option => metadataValue < Number(option)).some(value => value === true);
      } else if (operator === 'lteq') {
        const metadataValue = Number(subLink.metadata[subLinkName]);
        allowToDisplay = options.map(option => metadataValue <= Number(option)).some(value => value === true);
      }
      return allowToDisplay;
    } else {
      return true;
    }
  };
  const questionValidation = (condition, displayLogic, feedback) => {
    const {
      operator,
      option,
      questionType,
      textMatch
    } = displayLogic;
    if (operator === 'mtch') {
      if (questionType === 'open') {
        var _feedback$answers;
        const answer = feedback === null || feedback === void 0 || (_feedback$answers = feedback.answers) === null || _feedback$answers === void 0 ? void 0 : _feedback$answers[0];
        return typeof answer === 'string' ? answer.toLowerCase() === option.toLowerCase() : false;
      } else if (questionType === 'multipleOpenEnded') {
        var _feedback$answers2;
        const answer = feedback === null || feedback === void 0 || (_feedback$answers2 = feedback.answers) === null || _feedback$answers2 === void 0 ? void 0 : _feedback$answers2[Number(option)];
        return typeof answer === 'string' ? answer.toLowerCase() === textMatch.toLowerCase() : false;
      }
    } else if (operator === 'nmtch') {
      if (questionType === 'open') {
        var _feedback$answers3;
        const answer = (feedback === null || feedback === void 0 || (_feedback$answers3 = feedback.answers) === null || _feedback$answers3 === void 0 ? void 0 : _feedback$answers3[0]) ?? '';
        return typeof answer === 'string' ? answer.toLowerCase() !== option.toLowerCase() : false;
      } else if (questionType === 'multipleOpenEnded') {
        var _feedback$answers4;
        const answer = (feedback === null || feedback === void 0 || (_feedback$answers4 = feedback.answers) === null || _feedback$answers4 === void 0 ? void 0 : _feedback$answers4[Number(option)]) ?? '';
        return typeof answer === 'string' ? answer.toLowerCase() !== textMatch.toLowerCase() : false;
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
        var _feedback$answers5;
        feedback === null || feedback === void 0 || (_feedback$answers5 = feedback.answers) === null || _feedback$answers5 === void 0 || _feedback$answers5.forEach(answer => {
          if (feedback.otherFlag) {
            var _answer$value;
            // this line is for poll, dropdown question
            const checkNormalAnswer = typeof answer === 'string' && answer.length > 0;
            const checkPictureChoiceAnswer =
            // @ts-ignore
            (answer === null || answer === void 0 || (_answer$value = answer.value) === null || _answer$value === void 0 ? void 0 : _answer$value.length) > 0;
            allowToDisplay = (checkNormalAnswer || checkPictureChoiceAnswer) && options.includes('-2');
          } else if (options.includes(`${answer}`)) {
            allowToDisplay = true;
          }
        });
      } else if (operator === 'nasw') {
        if ((feedback === null || feedback === void 0 ? void 0 : feedback.type) === 'ratingSlider') {
          var _feedback$answers6;
          let answerMatch = false;
          (_feedback$answers6 = feedback.answers) === null || _feedback$answers6 === void 0 || _feedback$answers6.forEach(answer => {
            answerMatch = options.includes(`${Number(answer) + 1}`); // because the answer is index, so we need to plus 1 to transform the answer to the real number.
          });
          allowToDisplay = !answerMatch;
        } else {
          var _feedback$answers7;
          let answerMatch = false;
          feedback === null || feedback === void 0 || (_feedback$answers7 = feedback.answers) === null || _feedback$answers7 === void 0 || _feedback$answers7.forEach(answer => {
            if (feedback.otherFlag) {
              var _answer$value2;
              // this scope is for poll, dropdown, picture choice question
              const checkNormalAnswer = typeof answer === 'string' && answer.length > 0;
              const checkPictureChoiceAnswer = feedback.type === 'pictureChoice' &&
              // @ts-ignore
              (answer === null || answer === void 0 || (_answer$value2 = answer.value) === null || _answer$value2 === void 0 ? void 0 : _answer$value2.length) > 0;
              answerMatch = (checkNormalAnswer || checkPictureChoiceAnswer) && options.includes('-2');
            } else if (options.includes(`${answer}`)) {
              answerMatch = true;
            }
          });
          allowToDisplay = !answerMatch;
        }
      } else if (operator === 'ansr') {
        let answerExist = false;
        if (feedback) {
          answerExist = feedback.answers !== undefined && feedback.answers.length > 0 && !(0, _ramda.isEmpty)(feedback.answers[0]) && feedback.answers[0] !== '-1';
          if (answerExist && feedback.type === 'pictureChoice' && feedback.otherFlag) {
            const lastAnswer = feedback.answers[feedback.answers.length - 1];
            // @ts-ignore
            const {
              image = '',
              value = ''
            } = lastAnswer;
            answerExist = image.length > 0 && value.length > 0;
          }
        }
        allowToDisplay = answerExist;
      } else if (operator === 'nasr') {
        let answerExist = false;
        if (feedback) {
          answerExist = feedback.answers !== undefined && feedback.answers.length > 0 && !(0, _ramda.isEmpty)(feedback.answers[0]) && feedback.answers[0] !== '-1';
          if (answerExist && feedback.type === 'pictureChoice' && feedback.otherFlag) {
            const lastAnswer = feedback.answers[feedback.answers.length - 1];
            // @ts-ignore
            const {
              image = '',
              value = ''
            } = lastAnswer;
            answerExist = image.length > 0 && value.length > 0;
          }
        }
        allowToDisplay = !answerExist;
      } else if (operator === 'viewed') {
        allowToDisplay = feedback !== undefined;
      } else if (operator === 'notViewed') {
        allowToDisplay = feedback === undefined;
      } else {
        var _feedback$answers8;
        let shift = 0;
        if ((feedback === null || feedback === void 0 ? void 0 : feedback.type) !== 'rating' && (feedback === null || feedback === void 0 ? void 0 : feedback.type) !== 'nps') {
          shift = 1;
        }
        const feedbackNumber = Number(feedback === null || feedback === void 0 || (_feedback$answers8 = feedback.answers) === null || _feedback$answers8 === void 0 ? void 0 : _feedback$answers8[0]) + shift; // because the answer is index, so we need to plus 1 to transform the answer to the real number.
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
            const [start, end] = (optionsStr === null || optionsStr === void 0 ? void 0 : optionsStr.split('-')) || [];
            allowToDisplay = Number(start) < feedbackNumber && feedbackNumber < Number(end);
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
        var _feedback$answers9;
        const answer = feedback === null || feedback === void 0 || (_feedback$answers9 = feedback.answers) === null || _feedback$answers9 === void 0 ? void 0 : _feedback$answers9[Number(rowStr)];
        if (operator === 'answ') {
          let answerMatch = false;
          // matrix rating option is using number, matrix choice option is using index
          if ((feedback === null || feedback === void 0 ? void 0 : feedback.type) === 'matrixRating' || (feedback === null || feedback === void 0 ? void 0 : feedback.type) === 'ranking') {
            if (feedback.type === 'ranking') {
              const rankingAnswer = feedback.answers ? feedback.answers.findIndex(value => value === Number(rowStr)) + 1 : -1;
              answerMatch = answer === 'N/A' ? options.includes(`N/A`) : options.includes(`${rankingAnswer}`);
            } else {
              answerMatch = options.includes(`${Number(answer) + 1}`); // because the answer is index, so we need to plus 1 to transform the answer to the real number.
            }
            allowToDisplay = answer !== undefined && answer !== -1 && answerMatch;
          } else if (Array.isArray(answer)) {
            answerMatch = answer.some(value => options.includes(`${value}`));
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
              answerMatch = answer.some(value => !options.includes(`${value}`) || value === -1);
              allowToDisplay = answer !== undefined && answerMatch;
            }
          }
        } else if (operator === 'ansr') {
          if (Array.isArray(answer)) {
            allowToDisplay = !(0, _ramda.isEmpty)(answer) && answer.every(value => value !== -1);
          } else {
            allowToDisplay = answer !== undefined && !(0, _ramda.isEmpty)(answer) && answer !== -1;
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
          if ((feedback === null || feedback === void 0 ? void 0 : feedback.type) === 'ranking') {
            feedbackNumber = feedback !== null && feedback !== void 0 && feedback.answers ? feedback.answers.findIndex(value => value === Number(rowStr)) + 1 : -1;
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
              const [start, end] = (optionsStr === null || optionsStr === void 0 ? void 0 : optionsStr.split('-')) || [];
              allowToDisplay = Number(start) < feedbackNumber && feedbackNumber < Number(end);
              break;
          }
        }
      }
      return allowToDisplay;
    } else {
      return allowToDisplay;
    }
  };
  const checkAllowToDisplay = displayLogics => {
    const {
      queryCondition,
      displayLogicArray
    } = displayLogics || {};
    if (queryCondition && displayLogicArray) {
      const conditions = queryCondition.split('&&');
      for (let i = 0; i < displayLogicArray.length; i++) {
        const displayLogic = displayLogicArray[i];
        const feedback = feedbacks.find(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        feedback => feedback.questionId === (displayLogic === null || displayLogic === void 0 ? void 0 : displayLogic.questionId));
        if ((displayLogic === null || displayLogic === void 0 ? void 0 : displayLogic.logicType) === 'metadata') {
          const allowToDisplay = metadataValidation(displayLogic);
          if (!allowToDisplay) {
            return false;
          }
        } else {
          const condition = conditions[i];
          const allowToDisplay = displayLogic && condition ? questionValidation(condition, displayLogic, feedback) : true;
          if (!allowToDisplay) {
            return false;
          }
        }
      }
    }
    return true;
  };
  const [displayDictionary, setDisplayDictionary, displayDictionaryRef] = (0, _data.useStateRef)(() => {
    const result = {};
    survey.pages.forEach(({
      questions
    }) => {
      questions.forEach(({
        questionId,
        displayLogics
      }) => {
        const allowToDisplay = checkAllowToDisplay(displayLogics);
        result[questionId] = allowToDisplay;
      });
    });
    return result;
  });
  (0, _react.useEffect)(() => {
    const idsToBeRemoved = [];

    /** @type {{[questionId: string]: boolean}} */
    const result = {};
    survey.pages.forEach(({
      questions
    }) => {
      questions.forEach(({
        questionId,
        displayLogics
      }) => {
        const allowToDisplay = checkAllowToDisplay(displayLogics);
        result[questionId] = allowToDisplay;

        // if currently display and change to not display, we need to remove exist feedback
        if (displayDictionary[questionId] && !allowToDisplay) {
          idsToBeRemoved.push(questionId);
        }
      });
    });
    setDisplayDictionary(result);
    idsToBeRemoved.forEach(questionId => {
      removeSingleFeedbackHandler && removeSingleFeedbackHandler(questionId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbacks]);
  const getDisplayStatusForPage = page => {
    const {
      questions
    } = page;
    const result = questions.map(({
      questionId
    }) => displayDictionary[questionId]);
    return result;
  };
  return {
    displayDictionary,
    displayDictionaryRef,
    getDisplayStatusForPage,
    checkAllowToDisplay
  };
};
var _default = exports.default = useDisplayLogic;
//# sourceMappingURL=useDisplayLogic.js.map