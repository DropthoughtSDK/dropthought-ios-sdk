"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageIndexFromPageId = exports.getPageIdFromPageIndex = void 0;
exports.nextPage = nextPage;

var _ramda = _interopRequireDefault(require("ramda"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * return undefined if not existed
 * @type {(pageIndex: number, survey: Survey) => (string|undefined)}
 */
const getPageIdFromPageIndex = _ramda.default.curry((pageIndex, survey) => _ramda.default.pipe( //
_ramda.default.prop('pageOrder'), _ramda.default.nth(pageIndex))(survey));
/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */


exports.getPageIdFromPageIndex = getPageIdFromPageIndex;

const getPageIndexFromPageId = _ramda.default.curry((pageId, survey) => _ramda.default.pipe( //
_ramda.default.prop('pageOrder'), _ramda.default.findIndex(_ramda.default.equals(pageId)))(survey));
/**
 * return undefined if survey has no rules or rule not found for page
 * @type {(pageIndex: number, survey: Survey) => ([Rule]|undefined)}
 */


exports.getPageIndexFromPageId = getPageIndexFromPageId;

const getRuleSetFromPageIndex = (pageIndex, survey) => _ramda.default.pipe( // @ts-ignore
getPageIdFromPageIndex(pageIndex), _ramda.default.prop(_ramda.default.__, _ramda.default.prop('rules', survey)))(survey);
/**
 * only keep the feedbacks that belongs to a certain page
 * if a question is not answered => textOrIndexArr: ['']
 * also convert the answers to 0-based
 * @type {(pageIndex: number, survey: Survey, feedbacks: Feedback[]) => [IQAData]}
 */


const getPageFeedbacks = (pageIndex, survey, feedbacks) => {
  // get the default page feedback
  const defaultPageFeedbacks = _ramda.default.pipe(_ramda.default.prop('pages'), _ramda.default.nth(pageIndex), // @ts-ignore
  _ramda.default.prop('questions'), _ramda.default.map(question => ({
    questionId: question.questionId,
    textOrIndexArr: ['']
  })))(survey); // if feedback has answers, use it to replace the default


  return defaultPageFeedbacks.map(defaultFeedback => {
    const realFeedback = _ramda.default.find(f => f.questionId === defaultFeedback.questionId, feedbacks);

    if (realFeedback && !_ramda.default.isEmpty(realFeedback.answers)) {
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


function nextPage(pageIndex, feedbacks, survey) {
  const defaultNextPage = () => pageIndex >= survey.pageOrder.length - 1 ? -1 : pageIndex + 1;

  const pageRuleSet = getRuleSetFromPageIndex(pageIndex, survey);

  if (!pageRuleSet || _ramda.default.isEmpty(pageRuleSet)) {
    return defaultNextPage();
  }

  const nextPageId = (0, _index.EvaluateRuleSet)(pageRuleSet, getPageFeedbacks(pageIndex, survey, feedbacks));

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