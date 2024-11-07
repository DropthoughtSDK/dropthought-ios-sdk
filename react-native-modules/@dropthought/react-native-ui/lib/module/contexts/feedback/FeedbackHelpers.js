import { FeedbackReducerActionType } from './FeedbackReducer';
export function updateFeedback(dispatch, feedback) {
  dispatch({
    type: FeedbackReducerActionType.Update,
    payload: {
      feedback
    }
  });
}
export function clearFeedbacks(dispatch) {
  dispatch({
    type: FeedbackReducerActionType.Clear
  });
}
export function removeSingleFeedback(dispatch, questionId) {
  dispatch({
    type: FeedbackReducerActionType.RemoveSingle,
    payload: {
      questionId
    }
  });
}
//# sourceMappingURL=FeedbackHelpers.js.map