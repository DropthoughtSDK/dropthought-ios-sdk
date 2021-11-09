"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFeedbackState = exports.useFeedbackDispatch = exports.useFeedbackByQid = void 0;

var _react = require("react");

var _FeedbackContext = require("./FeedbackContext");

/**
 * @returns {FeedbackReducerState}
 */
const useFeedbackState = () => {
  const context = (0, _react.useContext)(_FeedbackContext.FeedbackStateContext);
  return context;
};
/**
 * given the question id, return the feedback
 * @param {string} questionId
 * @returns {Feedback|undefined}
 */


exports.useFeedbackState = useFeedbackState;

const useFeedbackByQid = questionId => {
  const feedbackState = useFeedbackState();
  return feedbackState.feedbacksMap[questionId];
};
/**
 * @returns {FeedbackDispatchContext}
 */


exports.useFeedbackByQid = useFeedbackByQid;

const useFeedbackDispatch = () => {
  const dispatch = (0, _react.useContext)(_FeedbackContext.FeedbackDispatchContext);
  return dispatch;
};
/** @typedef {import('./FeedbackReducer').FeedbackReducerState} FeedbackReducerState */

/** @typedef {import('./FeedbackReducer').FeedbackReducerDispatch} FeedbackReducerDispatch */

/** @typedef {import('./FeedbackReducer').Feedback} Feedback */


exports.useFeedbackDispatch = useFeedbackDispatch;
//# sourceMappingURL=FeedbackHooks.js.map