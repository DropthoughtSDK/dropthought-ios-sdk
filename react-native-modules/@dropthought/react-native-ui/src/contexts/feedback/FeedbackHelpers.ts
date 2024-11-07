import { FeedbackReducerActionType } from './FeedbackReducer';
import type { FeedbackReducerDispatch } from './FeedbackReducer';
import type { Feedback } from '../../data';

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

export function removeSingleFeedback(
  dispatch: FeedbackReducerDispatch,
  questionId: string
) {
  dispatch({
    type: FeedbackReducerActionType.RemoveSingle,
    payload: {
      questionId,
    },
  });
}
