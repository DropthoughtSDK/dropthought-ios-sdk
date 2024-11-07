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
const getPageIdFromPageIndex = (pageIndex, survey) => {
  const pageId = survey.pageOrder[pageIndex].split('_')[0];
  return pageId;
};

/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */
exports.getPageIdFromPageIndex = getPageIdFromPageIndex;
const getPageIndexFromPageId = (pageId, survey) => {
  const pageIndex = survey.pageOrder.findIndex(value => value.includes(pageId));
  return pageIndex;
};

/**
 * return undefined if survey has no rules or rule not found for page
 * @type {(pageIndex: number, survey: Survey) => ([Rule]|undefined)}
 */
exports.getPageIndexFromPageId = getPageIndexFromPageId;
const getRuleSetFromPageIndex = (pageIndex, survey) => _ramda.default.pipe(() => getPageIdFromPageIndex(pageIndex, survey), _ramda.default.prop(_ramda.default.__, _ramda.default.prop('rules', survey)))(survey);

/**
 * @type {(feedbacks: Feedback[]) => [IQAData]}
 */
const getPageFeedbacks = feedbacks => {
  return feedbacks.map(feedback => {
    return {
      questionId: feedback.questionId,
      textOrIndexArr: feedback.answers ? feedback.answers.map(s => s.toString()) : [''],
      otherFlag: feedback.otherFlag,
      type: feedback.type
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
function nextPage(pageIndex, feedbacks, survey, themeOption) {
  const defaultNextPage = () => pageIndex >= survey.pageOrder.length - 1 ? -1 : pageIndex + 1;
  const currentPageId = survey.pageOrder[pageIndex];
  const defaultNextPageId = survey.pageOrder[pageIndex + 1];

  //check the next page is the same page.
  const checkNextPageIsSamePage = currentPageId.includes(defaultNextPageId === null || defaultNextPageId === void 0 ? void 0 : defaultNextPageId.split('_')[0]);
  const pageRuleSet = getRuleSetFromPageIndex(pageIndex, survey);
  if (!pageRuleSet || _ramda.default.isEmpty(pageRuleSet) || checkNextPageIsSamePage) {
    return defaultNextPage();
  }
  const nextPageId = (0, _index.EvaluateRuleSet)(pageRuleSet, getPageFeedbacks(feedbacks));
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
//# sourceMappingURL=SkipLogic.js.map