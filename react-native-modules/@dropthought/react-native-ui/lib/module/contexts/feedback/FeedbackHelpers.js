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
//# sourceMappingURL=FeedbackHelpers.js.map