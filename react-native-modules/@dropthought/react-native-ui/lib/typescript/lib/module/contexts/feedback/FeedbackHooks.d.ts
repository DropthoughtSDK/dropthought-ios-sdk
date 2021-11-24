export function useFeedbackState(): any;
export function useFeedbackByQid(questionId: string): Feedback | undefined;
export function useFeedbackDispatch(): import("react").Context<any>;
export type FeedbackReducerState = import('./FeedbackReducer').FeedbackReducerState;
export type FeedbackReducerDispatch = import('./FeedbackReducer').FeedbackReducerDispatch;
export type Feedback = import('./FeedbackReducer').Feedback;
