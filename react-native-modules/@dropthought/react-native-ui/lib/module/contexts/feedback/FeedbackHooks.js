import { useContext } from 'react';
import { FeedbackDispatchContext, FeedbackStateContext } from './FeedbackContext';

/**
 * @returns {FeedbackReducerState}
 */
export const useFeedbackState = () => {
  const context = useContext(FeedbackStateContext);
  return context;
};

/**
 * given the question id, return the feedback
 * @param {string} questionId
 * @returns {Feedback|undefined}
 */
export const useFeedbackByQid = questionId => {
  const feedbackState = useFeedbackState();
  return feedbackState.feedbacksMap[questionId];
};

/**
 * @returns {FeedbackDispatchContext}
 */
export const useFeedbackDispatch = () => {
  const dispatch = useContext(FeedbackDispatchContext);
  return dispatch;
};

/** @typedef {import('./FeedbackReducer').FeedbackReducerState} FeedbackReducerState */
/** @typedef {import('./FeedbackReducer').FeedbackReducerDispatch} FeedbackReducerDispatch */
/** @typedef {import('./FeedbackReducer').Feedback} Feedback */
//# sourceMappingURL=FeedbackHooks.js.map