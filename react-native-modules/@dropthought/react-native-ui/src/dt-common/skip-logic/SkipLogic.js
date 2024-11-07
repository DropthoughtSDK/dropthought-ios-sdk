import R from 'ramda';
import { EvaluateRuleSet } from './index';

/**
 * return undefined if not existed
 * @type {(pageIndex: number, survey: Survey) => (string|undefined)}
 */
export const getPageIdFromPageIndex = (pageIndex, survey) => {
  const pageId = survey.pageOrder[pageIndex].split('_')[0];
  return pageId;
};

/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */
export const getPageIndexFromPageId = (pageId, survey) => {
  const pageIndex = survey.pageOrder.findIndex((value) =>
    value.includes(pageId)
  );
  return pageIndex;
};

/**
 * return undefined if survey has no rules or rule not found for page
 * @type {(pageIndex: number, survey: Survey) => ([Rule]|undefined)}
 */
const getRuleSetFromPageIndex = (pageIndex, survey) =>
  R.pipe(
    () => getPageIdFromPageIndex(pageIndex, survey),
    R.prop(R.__, R.prop('rules', survey))
  )(survey);

/**
 * @type {(feedbacks: Feedback[]) => [IQAData]}
 */
const getPageFeedbacks = (feedbacks) => {
  return feedbacks.map((feedback) => {
    return {
      questionId: feedback.questionId,
      textOrIndexArr: feedback.answers
        ? feedback.answers.map((s) => s.toString())
        : [''],
      otherFlag: feedback.otherFlag,
      type: feedback.type,
    };
  });
};

/**
 * @param {number} pageIndex
 * @param {Feedback[]} feedbacks
 * @param {Survey} survey
 * @param {IThemeOptionType} themeOption
 * @return {number} return -1 means jump to end
 */
export function nextPage(pageIndex, feedbacks, survey, themeOption) {
  const defaultNextPage = () =>
    pageIndex >= survey.pageOrder.length - 1 ? -1 : pageIndex + 1;
  const currentPageId = survey.pageOrder[pageIndex];
  const defaultNextPageId = survey.pageOrder[pageIndex + 1];

  //check the next page is the same page.
  const checkNextPageIsSamePage = currentPageId.includes(
    defaultNextPageId?.split('_')[0]
  );

  const pageRuleSet = getRuleSetFromPageIndex(pageIndex, survey);
  if (!pageRuleSet || R.isEmpty(pageRuleSet) || checkNextPageIsSamePage) {
    return defaultNextPage();
  }

  const nextPageId = EvaluateRuleSet(pageRuleSet, getPageFeedbacks(feedbacks));

  if (!nextPageId) {
    return defaultNextPage();
  }
  return getPageIndexFromPageId(nextPageId, survey);
}

/** @typedef {import('../types/data').Survey} Survey */
/** @typedef {import('../types/data').Rule} Rule */
/** @typedef {import('../types/data').Feedback} Feedback */
/** @typedef {import('./IfcRule').IQAData} IQAData */
/** @typedef {import('../../contexts/theme/theme.const').IThemeOptionType} IThemeOptionType */
