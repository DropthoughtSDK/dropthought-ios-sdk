import type { FeedbackReducerDispatch } from './FeedbackReducer';
import type { Feedback } from 'src/data';
export declare function updateFeedback(dispatch: FeedbackReducerDispatch, feedback: Feedback): void;
export declare function clearFeedbacks(dispatch: FeedbackReducerDispatch): void;
