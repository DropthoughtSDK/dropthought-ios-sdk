import R from 'ramda';
import { EvaluateRuleSet } from './index';
/**
 * return undefined if not existed
 * @type {(pageIndex: number, survey: Survey) => (string|undefined)}
 */

export const getPageIdFromPageIndex = R.curry((pageIndex, survey) => R.pipe( //
R.prop('pageOrder'), R.nth(pageIndex))(survey));
/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */

export const getPageIndexFromPageId = R.curry((pageId, survey) => R.pipe( //
R.prop('pageOrder'), R.findIndex(R.equals(pageId)))(survey));
/**
 * return undefined if survey has no rules or rule not found for page
 * @type {(pageIndex: number, survey: Survey) => ([Rule]|undefined)}
 */

const getRuleSetFromPageIndex = (pageIndex, survey) => R.pipe( // @ts-ignore
getPageIdFromPageIndex(pageIndex), R.prop(R.__, R.prop('rules', survey)))(survey);
/**
 * only keep the feedbacks that belongs to a certain page
 * if a question is not answered => textOrIndexArr: ['']
 * also convert the answers to 0-based
 * @type {(pageIndex: number, survey: Survey, feedbacks: Feedback[]) => [IQAData]}
 */


const getPageFeedbacks = (pageIndex, survey, feedbacks) => {
  // get the default page feedback
  const defaultPageFeedbacks = R.pipe(R.prop('pages'), R.nth(pageIndex), // @ts-ignore
  R.prop('questions'), R.map(question => ({
    questionId: question.questionId,
    textOrIndexArr: ['']
  })))(survey); // if feedback has answers, use it to replace the default

  return defaultPageFeedbacks.map(defaultFeedback => {
    const realFeedback = R.find(f => f.questionId === defaultFeedback.questionId, feedbacks);

    if (realFeedback && !R.isEmpty(realFeedback.answers)) {
      return {
        questionId: defaultFeedback.questionId,
        textOrIndexArr: realFeedback.answers.map(s => s.toString()),
        otherFlag: realFeedback.otherFlag,
        type: realFeedback.type
      };
    }

    return defaultFeedback;
  });
};
/**
 * @param {number} pageIndex
 * @param {Feedback[]} feedbacks
 * @param {Survey} survey
 * @return {number} return -1 means jump to end
 */


export function nextPage(pageIndex, feedbacks, survey) {
  const defaultNextPage = () => pageIndex >= survey.pageOrder.length - 1 ? -1 : pageIndex + 1;

  const pageRuleSet = getRuleSetFromPageIndex(pageIndex, survey);

  if (!pageRuleSet || R.isEmpty(pageRuleSet)) {
    return defaultNextPage();
  }

  const nextPageId = EvaluateRuleSet(pageRuleSet, getPageFeedbacks(pageIndex, survey, feedbacks));

  if (!nextPageId) {
    return defaultNextPage();
  }

  return getPageIndexFromPageId(nextPageId, survey);
}
/** @typedef {import('../types/data').Survey} Survey */

/** @typedef {import('../types/data').Rule} Rule */

/** @typedef {import('../types/data').Feedback} Feedback */

/** @typedef {import('./IfcRule').IQAData} IQAData */
//# sourceMappingURL=SkipLogic.js.map