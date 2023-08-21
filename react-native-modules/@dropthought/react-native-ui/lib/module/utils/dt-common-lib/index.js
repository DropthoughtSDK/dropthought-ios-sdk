'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
}); // dummy integration test

exports.Greeter = name => `Nĭ hăo ${name}`;
/**
 * This function is used to evaluate skip logic rule based on the skip authoring rules
 * and the page feedback passed to evaluate and provide the next page index on condition met
 * it will return empty string for conditions not met.
 * @param ruleSet
 * @param pageFeedback
 */


exports.EvaluateRuleSet = (ruleSet, pageFeedback) => {
  let result = '';

  for (const rule of ruleSet) {
    if (rule.condition.indexOf('&&') > -1) {
      const andArr = rule.condition.split('&&');
      let evalCond = '';

      for (const andCond of andArr) {
        const conditionArr = andCond.split('.');
        const filteredFeedback = filterFeedback(pageFeedback, conditionArr[0]);

        if (filteredFeedback.length > 0) {
          // logDetails(conditionArr, filteredFeedback);
          if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
            evalCond = evalCond.length > 0 ? evalCond + ' && ' + true : evalCond + true;
          } else {
            evalCond = evalCond.length > 0 ? evalCond + ' && ' + false : evalCond + false;
          }
        }
      } // console.log('evalCond ' + evalCond);
      // eslint-disable-next-line no-eval


      const e = eval;
      result = e(evalCond) ? rule.toPageId : '';
    } else if (rule.condition.indexOf('||') > -1) {
      const orArr = rule.condition.split('||');

      for (const orCond of orArr) {
        const conditionArr = orCond.split('.');
        const filteredFeedback = filterFeedback(pageFeedback, conditionArr[0]);

        if (filteredFeedback.length > 0) {
          // logDetails(conditionArr, filteredFeedback);
          if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
            result = rule.toPageId;
          }
        }
      }
    } else {
      const conditionArr = rule.condition.split('.');
      const filteredFeedback = filterFeedback(pageFeedback, conditionArr[0]);

      if (filteredFeedback.length > 0) {
        // logDetails(conditionArr, filteredFeedback);
        if (evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].type, filteredFeedback[0])) {
          result = rule.toPageId;
        }
      }
    }

    if (result.length > 0) {
      break;
    }
  }

  return result;
};

const filterFeedback = (pageFeedback, questionId) => {
  return pageFeedback.filter(el => {
    return el.questionId === questionId // && el.textOrIndexArr === (conditionArr.length === 3 ? [conditionArr[2]] : [''])
    ;
  });
}; // eslint-disable-next-line no-unused-vars


const logDetails = (conditionArr, filteredFeedback) => {// console.log('conditionArr[1] => ' + conditionArr[1]);
  // console.log('value=> ' + (conditionArr.length === 3 ? conditionArr[2] : ''));
  // console.log('filteredFeedback=> ' + JSON.stringify(filteredFeedback[0]));
  // console.log('evaluateCondition=> ' + evaluateCondition(conditionArr, filteredFeedback[0].questionId, filteredFeedback[0].textOrIndexArr[0]));
};
/**
 *
 * @param condition
 * @param questionId
 * @param type
 * @param feedback
 */


const evaluateCondition = (conditionArr, questionId, type, feedback) => {
  let result = false;
  let targetAnswer;

  if (questionId === conditionArr[0]) {
    if (conditionArr.length === 4) {
      // e.g. 092f3c13-940c-4b52-968d-b852da681858.1.answ.1
      const targetOption = conditionArr[1];
      const skiplogicType = conditionArr[2];
      let selectedAnswer = -1;
      let condition = -1;

      switch (type) {
        case 'ranking':
          {
            selectedAnswer = feedback.textOrIndexArr.findIndex(value => value === targetOption); // can not find index (should be set to 'N/A')

            if (selectedAnswer === -1) return false;
            targetAnswer = parseInt(conditionArr[3], 10);
            condition = targetAnswer - 1;
            break;
          }

        case 'matrixRating':
          {
            // e.g. 092f3c13-940c-4b52-968d-b852da681858.1.answ.1
            const selectedIndex = parseInt(targetOption, 10);
            selectedAnswer = parseInt(feedback.textOrIndexArr[selectedIndex], 10); // e.g. conditionArr[3] => '1', '1-2', '1,2'

            condition = Number(conditionArr[3]) - 1;
            break;
          }

        case 'multipleOpenEnded':
          {
            // e.g. 092f3c13-940c-4b52-968d-b852da681858.1.answ.1
            const selectedIndex = parseInt(targetOption, 10);
            selectedAnswer = feedback.textOrIndexArr[selectedIndex];
            break;
          }

        default:
      }

      switch (skiplogicType) {
        case 'mtch':
          //['5e3480b2-6e4b-475c-a916-1f0bab87033b','5','mtch','amazon.com',]
          // If the answer to this question Contains the text "logic test"
          result = feedback.textOrIndexArr[conditionArr[1]].includes(conditionArr[conditionArr.length - 1]);
          break;

        case 'nmtch':
          {
            //['5e3480b2-6e4b-475c-a916-1f0bab87033b','5','nmtch','amazon.com',]
            // If the answer to this question do not contains the text "logic test"
            if (feedback.textOrIndexArr[conditionArr[1]] === '') {
              result = true;
            } else {
              result = !feedback.textOrIndexArr[conditionArr[1]].includes(conditionArr[conditionArr.length - 1]);
            }

            break;
          }

        case 'answ':
          //['87700a1c-ff7a-43da-9c0a-fca87864a3e5', '1', 'answ', '2,3']
          // e.g. If the answer to this question is Staff Service and is Ranked with "2,3"
          const conditionValueArr = conditionArr[conditionArr.length - 1].split(',').map(value => Number(value) - 1); //[2,3]

          result = conditionValueArr.includes(selectedAnswer);
          break;

        case 'ansr':
          //['ea7072a9-a7fb-4957-8912-5908ff664c69', '0', 'ansr', '']
          //If the answer to this question is Timeliness of Service and is Answered
          result = selectedAnswer !== -1 && selectedAnswer !== '';
          break;

        case 'nasr':
          //['ea7072a9-a7fb-4957-8912-5908ff664c69', '2', 'nasr', '']
          //If the answer to this question is Communication and is Not Answered
          result = selectedAnswer === -1 || selectedAnswer === '';
          break;

        case 'nasw':
          {
            // ['ea7072a9-a7fb-4957-8912-5908ff664c69', '3', 'nasw', '3']
            //first is question index, second is condition
            // e.g. If the answer to this question is Problem Resolution and is Not Answered with "3"
            const conditionValueArr = conditionArr[conditionArr.length - 1].split(',').map(text => parseInt(text, 10) - 1); //[3]

            const isIncludes = conditionValueArr.includes(selectedAnswer);
            result = !isIncludes;
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
            const conditionValueArr = conditionArr[conditionArr.length - 1].split('-').map(value => Number(value)); //[2,5]

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
      let selectedAnswer = parseInt(feedback.textOrIndexArr[0], 10);
      let condition = parseInt(conditionArr[2], 10);

      switch (type) {
        case 'ratingSlider':
          selectedAnswer++;
          break;

        default:
      }

      switch (skiplogicType) {
        case 'mtch':
          //new
          //['8ce47319-7ea2-423b-b322-cac316384314', 'mtch', 'logic test']
          // If the answer to this question Contains the text "logic test"
          result = feedback.textOrIndexArr[0].includes(conditionArr[conditionArr.length - 1]);
          break;

        case 'nmtch':
          {
            //['8ce47319-7ea2-423b-b322-cac316384314', 'nmtch', 'logic test']
            // If the answer to this question do not contains the text "logic test"
            if (feedback.textOrIndexArr[0] === '') {
              result = true;
            } else {
              result = !feedback.textOrIndexArr[0].includes(conditionArr[conditionArr.length - 1]);
            }

            break;
          }

        case 'ansr':
          //['48218a84-1fbe-413e-af15-502669199623', 'ansr']
          //If the answer to this question is Answered
          result = feedback.textOrIndexArr[0].trim().length > 0;
          break;

        case 'nasr':
          result = feedback.textOrIndexArr[0].trim().length === 0;
          break;

        case 'answ':
          {
            //['382b3998-25c5-4d02-bc3b-8d5153efa7fe', 'answ', '1,-2']
            //If the answer to this question is Answered with "False,Other"
            const conditionValueArr = conditionArr[2].split(',').map(text => Number(text)); //1,-2

            const feedbackAnswers = feedback.textOrIndexArr.map(text => Number(text));
            feedbackAnswers.forEach(value => {
              if (feedback.otherFlag) {
                // check "other" case
                result = feedback.otherFlag;
              } else if (!result) {
                // check if any answer contains the target answer
                result = conditionValueArr.includes(value);
              }
            });
            break;
          }

        case 'nasw':
          {
            // e.g. is Not Answered with "1,2"
            // skip target answer check, if user doesn't have any feedback (skip optional question)
            if (feedback.textOrIndexArr[0].trim().length === 0) {
              //if user didn't answer the question, and it will be judged as not answering to the assigned answer.
              result = true;
              break;
            }

            const conditionValueArr = conditionArr[2].split(',').map(text => parseInt(text, 10)); //[1,3]

            const feedbackArr = feedback.textOrIndexArr[0].split(',').map(text => parseInt(text, 10));

            switch (type) {
              case 'ratingSlider':
                result = !conditionValueArr.includes(selectedAnswer);
                break;

              case 'multiChoice':
                const multiChoiceFeedbackArr = feedback.textOrIndexArr.map(text => parseInt(text, 10));
                result = conditionValueArr.every(condition => !multiChoiceFeedbackArr.includes(condition));
                break;

              default:
                result = feedbackArr.every(feedback => !conditionValueArr.includes(feedback));
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
            const conditionValueArr = conditionArr[conditionArr.length - 1].split('-').map(value => Number(value)); //[3,8]

            result = selectedAnswer > conditionValueArr[0] && selectedAnswer < conditionValueArr[1];
            break;
          }
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
//# sourceMappingURL=index.js.map