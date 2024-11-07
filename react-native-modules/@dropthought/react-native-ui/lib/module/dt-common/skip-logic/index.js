/* eslint-disable no-shadow */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// dummy integration test
exports.Greeter = name => `Nĭ hăo ${name}`;
/**
 * This function is used to evaluate skip logic rule based on the skip authoring rules
 * and the page feedback passed to evaluate and provide the next page index on condition met
 * it will return empty string for conditions not met.
 * @param {Rule[]} ruleSet
 * @param {IQAData[]} pageFeedback
 */
exports.EvaluateRuleSet = (ruleSet, pageFeedback) => {
  let result = '';
  for (const rule of ruleSet) {
    if (rule.condition.indexOf('&&') > -1) {
      const andArr = rule.condition.split('&&');
      /** @type {boolean[]} */
      const evalCond = [];
      for (const andCond of andArr) {
        const filteredFeedback = filterFeedback(pageFeedback, andCond.split('.')[0]);
        if (filteredFeedback.length > 0) {
          const conditionArr = handleSplit(andCond, filteredFeedback[0].type);
          logDetails(conditionArr, filteredFeedback);
          if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
            evalCond.push(true);
          } else {
            evalCond.push(false);
          }
        } else if (rule.condition.includes('.nasr')) {
          evalCond.push(true);
        } else if (rule.condition.includes('.nasw.')) {
          evalCond.push(true);
        } else if (rule.condition.includes('.nmtch.')) {
          evalCond.push(true);
        } else {
          evalCond.push(false);
        }
      }
      result = evalCond.every(value => value === true) ? rule.toPageId : '';
    } else if (rule.condition.indexOf('||') > -1) {
      const orArr = rule.condition.split('||');
      for (const orCond of orArr) {
        const filteredFeedback = filterFeedback(pageFeedback, orCond.split('.')[0]);
        if (filteredFeedback.length > 0) {
          const conditionArr = handleSplit(orCond, filteredFeedback[0].type);
          logDetails(conditionArr, filteredFeedback);
          if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
            result = rule.toPageId;
          }
        } else if (rule.condition.includes('.nasr')) {
          result = rule.toPageId;
        } else if (rule.condition.includes('.nasw.')) {
          result = rule.toPageId;
        } else if (rule.condition.includes('.nmtch.')) {
          result = rule.toPageId;
        }
      }
    } else {
      const filteredFeedback = filterFeedback(pageFeedback, rule.condition.split('.')[0]);
      if (filteredFeedback.length > 0) {
        const conditionArr = handleSplit(rule.condition, filteredFeedback[0].type);
        logDetails(conditionArr, filteredFeedback);
        if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
          result = rule.toPageId;
        }
      } else if (rule.condition.includes('.nasr')) {
        result = rule.toPageId;
      } else if (rule.condition.includes('.nasw.')) {
        result = rule.toPageId;
      } else if (rule.condition.includes('.nmtch.')) {
        result = rule.toPageId;
      }
    }
    if (result.length > 0) {
      break;
    }
  }
  return result;
};

/**
 * @param {IQAData[]} pageFeedback
 * @param {string} questionId
 */
const filterFeedback = (pageFeedback, questionId) => {
  return pageFeedback.filter(el => {
    return el.questionId === questionId
    // && el.textOrIndexArr === (conditionArr.length === 3 ? [conditionArr[2]] : [''])
    ;
  });
};
const logDetails = (conditionArr, filteredFeedback) => {
  // console.log('conditionArr[1] => ' + conditionArr[1]);
  // console.log('value=> ' + (conditionArr.length === 3 ? conditionArr[2] : ''));
  // console.log('filteredFeedback=> ' + JSON.stringify(filteredFeedback[0]));
  // console.log('evaluateCondition=> ' + evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].textOrIndexArr[0]));
};
/**
 * @param {string} condition
 * @param {QuestionType} type
 * @returns
 */
const handleSplit = (condition, type) => {
  const conditionArr = condition.split('.');
  let conditionArrMax;
  // if the condition include '.' text, we need to merge the condition
  if (type === 'open') {
    // open's array length is 4
    conditionArrMax = 3;
  } else if (type === 'multipleOpenEnded') {
    // multipleOpenEnded's array length is 4
    conditionArrMax = 4;
  }
  if (typeof conditionArrMax === 'number' && conditionArr.length > conditionArrMax) {
    let lastString = '';
    for (let i = conditionArrMax - 1; i < conditionArr.length; i++) {
      lastString = lastString + conditionArr[i] + (i !== conditionArr.length - 1 ? '.' : '');
    }
    conditionArr[conditionArrMax - 1] = lastString;
    conditionArr.length = conditionArrMax;
    return conditionArr;
  }
  return conditionArr;
};
/**
 *
 * @param {string[]} conditionArr
 * @param {string} questionId
 * @param {QuestionType} type
 * @param {IQAData} feedback
 */
export const evaluateCondition = (conditionArr, questionId, type, feedback) => {
  var _feedback$textOrIndex;
  let result = false;
  let targetAnswer;
  const lastIndex = conditionArr.length - 1;
  if (questionId === conditionArr[0]) {
    if (conditionArr.length === 4) {
      // e.g. 092f3c13-940c-4b52-968d-b852da681858.1.answ.1
      const targetOption = conditionArr[1];
      const skiplogicType = conditionArr[2];
      let selectedAnswer = -1;
      /** @type {number[]} */
      let selectedMatrix = [-1];
      /** @type {number[]} */
      let conditionMatrixArr = [];
      let condition = -1;
      switch (type) {
        case 'ranking':
          {
            selectedAnswer = feedback.textOrIndexArr.findIndex(value => value === targetOption);
            // can not find index (should be set to 'N/A')
            if (selectedAnswer === -1) return false;
            targetAnswer = parseInt(conditionArr[3], 10);
            condition = targetAnswer - 1;
            break;
          }
        case 'matrixRating':
          {
            // e.g. 092f3c13-940c-4b52-968d-b852da681858.1.answ.1
            const selectedIndex = parseInt(targetOption, 10);
            const textOrIndexArr = `${feedback.textOrIndexArr[selectedIndex]}`;
            selectedAnswer = parseInt(textOrIndexArr, 10);
            // e.g. conditionArr[3] => '1', '1-2', '1,2'
            condition = Number(conditionArr[3]) - 1;
            break;
          }
        case 'matrixChoice':
          {
            const selectedIndex = parseInt(targetOption, 10);
            const textOrIndexArr = `${feedback.textOrIndexArr[selectedIndex]}`;
            conditionMatrixArr = conditionArr[3].split(',').map(condition => parseInt(condition, 10));
            selectedMatrix = textOrIndexArr.split(',').map(selected => parseInt(selected, 10));
            break;
          }
        case 'multipleOpenEnded':
          {
            // e.g. 092f3c13-940c-4b52-968d-b852da681858.1.answ.1
            const selectedIndex = parseInt(targetOption, 10);
            const textOrIndexArr = `${feedback.textOrIndexArr[selectedIndex]}`;
            if (textOrIndexArr.length === 0) {
              selectedAnswer = -1;
            } else {
              selectedAnswer = parseInt(textOrIndexArr, 10);
            }
            break;
          }
        default:
      }
      switch (skiplogicType) {
        case 'mtch':
          //['5e3480b2-6e4b-475c-a916-1f0bab87033b','5','mtch','amazon.com',]
          // If the answer to this question Contains the text "logic test"
          result = ((_feedback$textOrIndex = feedback.textOrIndexArr[conditionArr[1]]) === null || _feedback$textOrIndex === void 0 ? void 0 : _feedback$textOrIndex.toLowerCase()) === conditionArr[lastIndex].toLowerCase();
          break;
        case 'nmtch':
          {
            //['5e3480b2-6e4b-475c-a916-1f0bab87033b','5','nmtch','amazon.com',]
            // If the answer to this question do not contains the text "logic test"
            if (feedback.textOrIndexArr[conditionArr[1]] === '') {
              result = true;
            } else {
              var _feedback$textOrIndex2;
              result = ((_feedback$textOrIndex2 = feedback.textOrIndexArr[conditionArr[1]]) === null || _feedback$textOrIndex2 === void 0 ? void 0 : _feedback$textOrIndex2.toLowerCase()) !== conditionArr[lastIndex].toLowerCase();
            }
            break;
          }
        case 'answ':
          //['87700a1c-ff7a-43da-9c0a-fca87864a3e5', '1', 'answ', '2,3']
          // e.g. If the answer to this question is Staff Service and is Ranked with "2,3"
          switch (type) {
            case 'matrixChoice':
              {
                result = conditionMatrixArr.some(condition => selectedMatrix.includes(condition));
                break;
              }
            default:
              {
                const conditionValueArr = conditionArr[lastIndex].split(',').map(value => Number(value) - 1); //[2,3]
                result = conditionValueArr.includes(selectedAnswer);
                break;
              }
          }
          break;
        case 'ansr':
          //['ea7072a9-a7fb-4957-8912-5908ff664c69', '0', 'ansr', '']
          //If the answer to this question is Timeliness of Service and is Answered
          switch (type) {
            case 'matrixChoice':
              result = selectedMatrix[0] !== -1;
              break;
            default:
              result = selectedAnswer !== -1;
              break;
          }
          break;
        case 'nasr':
          //['ea7072a9-a7fb-4957-8912-5908ff664c69', '2', 'nasr', '']
          //If the answer to this question is Communication and is Not Answered
          result = selectedAnswer === -1;
          switch (type) {
            case 'matrixChoice':
              result = selectedMatrix[0] === -1;
              break;
            default:
              result = selectedAnswer === -1;
              break;
          }
          break;
        case 'nasw':
          {
            // ['ea7072a9-a7fb-4957-8912-5908ff664c69', '3', 'nasw', '3']
            //first is question index, second is condition
            // e.g. If the answer to this question is Problem Resolution and is Not Answered with "3"
            switch (type) {
              case 'matrixChoice':
                {
                  const isIncluding = conditionMatrixArr.some(condition => selectedMatrix.includes(condition));
                  result = !isIncluding;
                  break;
                }
              default:
                {
                  const conditionValueArr = conditionArr[lastIndex].split(',').map(text => parseInt(text, 10) - 1); //[3]
                  const isIncluding = conditionValueArr.includes(selectedAnswer);
                  result = !isIncluding;
                  break;
                }
            }
            break;
          }
        case 'eq':
          //['4f643963-e6fe-4111-aaf9-5008ce9af3a2', '0', 'eq', '3']
          // e.g. If the answer to this question is Availability of Resources and is Equal to "3"
          result = selectedAnswer === condition;
          break;
        case 'btwn':
          {
            //['4f643963-e6fe-4111-aaf9-5008ce9af3a2', '2', 'btwn', '2-5']
            // e.g. If the answer to this question is Staff Friendliness and is Between "2-5"
            // between is not include the first and the last
            const conditionValueArr = conditionArr[lastIndex].split('-').map(value => Number(value)); //[2,5]
            result = selectedAnswer > conditionValueArr[0] - 1 && selectedAnswer < conditionValueArr[1] - 1;
            break;
          }
        case 'lt':
          result = selectedAnswer < condition;
          break;
        case 'lteq':
          result = selectedAnswer <= condition;
          break;
        case 'gt':
          result = selectedAnswer > condition;
          break;
        case 'gteq':
          result = selectedAnswer >= condition;
          break;
      }
    } else {
      // For other type of questions
      // e.g. 69e6aab5-6433-4a8f-a6d8-5c79d7e0d7df.btwn.3-8
      const skiplogicType = conditionArr[1];
      let selectedAnswer = parseInt(`${feedback.textOrIndexArr[0]}`, 10);
      let condition = parseInt(conditionArr[2], 10);
      switch (type) {
        case 'ratingSlider':
          selectedAnswer++;
          break;
        default:
      }
      switch (skiplogicType) {
        case 'mtch':
          {
            //new
            //['8ce47319-7ea2-423b-b322-cac316384314', 'mtch', 'logic test']
            // If the answer to this question Contains the text "logic test"
            const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
            result = textOrIndexArr.toLowerCase() === conditionArr[lastIndex].toLowerCase();
            break;
          }
        case 'nmtch':
          {
            //['8ce47319-7ea2-423b-b322-cac316384314', 'nmtch', 'logic test']
            // If the answer to this question do not contains the text "logic test"
            const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
            if (textOrIndexArr === '') {
              result = true;
            } else {
              result = textOrIndexArr.toLowerCase() !== conditionArr[lastIndex].toLowerCase();
            }
            break;
          }
        case 'ansr':
          {
            //['48218a84-1fbe-413e-af15-502669199623', 'ansr']
            //If the answer to this question is Answered
            const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
            result = textOrIndexArr.trim().length > 0;
            break;
          }
        case 'nasr':
          {
            const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
            result = textOrIndexArr.trim().length === 0;
            break;
          }
        case 'answ':
          {
            //['382b3998-25c5-4d02-bc3b-8d5153efa7fe', 'answ', '1,-2']
            //If the answer to this question is Answered with "False,Other"
            const conditionValueArr = conditionArr[2].split(',');
            const feedbackAnswers = feedback.textOrIndexArr.map(feedback => `${feedback}`);
            conditionValueArr.forEach(condition => {
              if (!result) {
                // check "other" case
                if (condition === '-2') {
                  if (feedback.otherFlag) {
                    result = true;
                  }
                } else {
                  const isIncluding = feedbackAnswers.includes(condition);
                  if (isIncluding) {
                    result = true;
                  }
                }
              }
            });
            break;
          }
        case 'nasw':
          {
            const textOrIndexArr = `${feedback.textOrIndexArr[0]}`;
            // e.g. is Not Answered with "1,2"
            // skip target answer check, if user doesn't have any feedback (skip optional question)
            if (textOrIndexArr.trim().length === 0) {
              //if user didn't answer the question, and it will be judged as not answering to the assigned answer.
              result = true;
              break;
            }
            const conditionValueArr = conditionArr[2].split(',').map(text => parseInt(text, 10)); //[1,3]
            const feedbackArr = textOrIndexArr.split(',').map(text => parseInt(text, 10));
            switch (type) {
              case 'ratingSlider':
                result = !conditionValueArr.includes(selectedAnswer);
                break;
              case 'multiChoice':
                if (conditionValueArr.includes(-2) && feedback.otherFlag) {
                  result = false;
                } else {
                  const multiChoiceFeedbackArr = feedback.textOrIndexArr.map(text => parseInt(text, 10));
                  result = conditionValueArr.every(condition => !multiChoiceFeedbackArr.includes(condition));
                }
                break;
              case 'pictureChoice':
                if (conditionValueArr.includes(-2) && feedback.otherFlag) {
                  result = false;
                } else {
                  const pictureChoiceFeedbackArr = feedback.textOrIndexArr.map(text => parseInt(text, 10));
                  result = conditionValueArr.every(condition => !pictureChoiceFeedbackArr.includes(condition));
                }
                break;
              default:
                if (conditionValueArr.includes(-2) && feedback.otherFlag) {
                  result = false;
                } else {
                  result = conditionValueArr.every(feedback => !feedbackArr.includes(feedback));
                }
                break;
            }
            break;
          }
        case 'btwn':
          {
            //new
            //ratingSlider
            //['69e6aab5-6433-4a8f-a6d8-5c79d7e0d7df', 'btwn', '3-8']
            // e.g. If the answer to the question "Q17. Slider rating 6, no custom label and center label, 1 to 10, not required" is Between "3-8"
            // between is not include the first and the last
            const conditionValueArr = conditionArr[lastIndex].split('-').map(value => Number(value)); //[3,8]
            result = selectedAnswer > conditionValueArr[0] && selectedAnswer < conditionValueArr[1];
            break;
          }
        case 'viewed':
          result = true;
          break;
        //ratingSlider
        case 'eq':
          result = selectedAnswer === condition;
          break;
        case 'lt':
          result = selectedAnswer < condition;
          break;
        case 'lteq':
          result = selectedAnswer <= condition;
          break;
        case 'gt':
          result = selectedAnswer > condition;
          break;
        case 'gteq':
          result = selectedAnswer >= condition;
          break;
      }
    }
  }
  return result;
};

/** @typedef {import('../types/data').Rule} Rule */
/** @typedef {import('../types/data').QuestionType} QuestionType */
/** @typedef {import('./IfcRule').IQAData} IQAData */

export * from './SkipLogic';
export * from './IfcRule';
//# sourceMappingURL=index.js.map