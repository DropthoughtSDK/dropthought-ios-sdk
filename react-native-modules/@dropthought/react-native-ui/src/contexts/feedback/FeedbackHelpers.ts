import { FeedbackReducerActionType } from './FeedbackReducer';
import type { FeedbackReducerDispatch } from './FeedbackReducer';
import type { Feedback } from 'src/data';

export function updateFeedback(
  dispatch: FeedbackReducerDispatch,
  feedback: Feedback
) {
  dispatch({
    type: FeedbackReducerActionType.Update,
    payload: {
      feedback,
    },
  });
}

export function clearFeedbacks(dispatch: FeedbackReducerDispatch) {
  dispatch({
    type: FeedbackReducerActionType.Clear,
  });
}
