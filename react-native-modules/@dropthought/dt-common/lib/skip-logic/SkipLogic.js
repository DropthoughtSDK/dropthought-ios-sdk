import R from 'ramda';
import { EvaluateRuleSet } from './index';
export const getPageIdFromPageIndex = R.curry((pageIndex, survey) => R.pipe(R.prop('pageOrder'), R.nth(pageIndex))(survey));
export const getPageIndexFromPageId = R.curry((pageId, survey) => R.pipe(R.prop('pageOrder'), R.findIndex(R.equals(pageId)))(survey));
const getRuleSetFromPageIndex = (pageIndex, survey) => R.pipe(getPageIdFromPageIndex(pageIndex), R.prop(R.__, R.prop('rules', survey)))(survey);
const getPageFeedbacks = (pageIndex, survey, feedbacks) => {
    const defaultPageFeedbacks = R.pipe(R.prop('pages'), R.nth(pageIndex), R.prop('questions'), R.map(question => ({
        questionId: question.questionId,
        textOrIndexArr: [''],
    })))(survey);
    return defaultPageFeedbacks.map(defaultFeedback => {
        const realFeedback = R.find(f => f.questionId === defaultFeedback.questionId, feedbacks);
        if (realFeedback && !R.isEmpty(realFeedback.answers)) {
            return {
                questionId: defaultFeedback.questionId,
                textOrIndexArr: realFeedback.answers.map(s => s.toString()),
                otherFlag: realFeedback.otherFlag,
                type: realFeedback.type,
            };
        }
        return defaultFeedback;
    });
};
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
