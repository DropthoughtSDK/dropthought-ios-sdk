/** @type {React.Context<FeedbackReducerState>} */
export const FeedbackStateContext: React.Context<FeedbackReducerState>;
/** @type {React.Context<FeedbackReducerDispatch>} */
export const FeedbackDispatchContext: React.Context<FeedbackReducerDispatch>;
export type FeedbackReducerState = import('./FeedbackReducer').FeedbackReducerState;
export type FeedbackReducerDispatch = import('./FeedbackReducer').FeedbackReducerDispatch;
