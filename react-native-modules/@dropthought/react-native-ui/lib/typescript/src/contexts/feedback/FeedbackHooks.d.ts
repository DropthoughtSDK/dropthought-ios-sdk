/**
 * @returns {FeedbackReducerState}
 */
export declare const useFeedbackState: () => import("./FeedbackReducer").FeedbackReducerState;
/**
 * given the question id, return the feedback
 * @param {string} questionId
 * @returns {Feedback|undefined}
 */
export declare const useFeedbackByQid: (questionId: string) => import("@dropthought/dt-common/lib/types/data").Feedback;
/**
 * @returns {FeedbackDispatchContext}
 */
export declare const useFeedbackDispatch: () => () => undefined;
/** @typedef {import('./FeedbackReducer').FeedbackReducerState} FeedbackReducerState */
/** @typedef {import('./FeedbackReducer').FeedbackReducerDispatch} FeedbackReducerDispatch */
/** @typedef {import('./FeedbackReducer').Feedback} Feedback */
