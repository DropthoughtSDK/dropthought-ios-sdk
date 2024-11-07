/**
 * @returns {FeedbackReducerState}
 */
export declare const useFeedbackState: () => import("./FeedbackReducer").FeedbackReducerState;
/**
 * given the question id, return the feedback
 * @param {string} questionId
 * @returns {Feedback|undefined}
 */
export declare const useFeedbackByQid: (questionId: string) => import("../..").Feedback | undefined;
/**
 * @returns {FeedbackDispatchContext}
 */
export declare const useFeedbackDispatch: () => () => undefined;
/** @typedef {import('./FeedbackReducer').FeedbackReducerState} FeedbackReducerState */
/** @typedef {import('./FeedbackReducer').FeedbackReducerDispatch} FeedbackReducerDispatch */
/** @typedef {import('./FeedbackReducer').Feedback} Feedback */
//# sourceMappingURL=FeedbackHooks.d.ts.map