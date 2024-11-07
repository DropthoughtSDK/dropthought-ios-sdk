"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearFeedbacks = clearFeedbacks;
exports.removeSingleFeedback = removeSingleFeedback;
exports.updateFeedback = updateFeedback;
var _FeedbackReducer = require("./FeedbackReducer");
function updateFeedback(dispatch, feedback) {
  dispatch({
    type: _FeedbackReducer.FeedbackReducerActionType.Update,
    payload: {
      feedback
    }
  });
}
function clearFeedbacks(dispatch) {
  dispatch({
    type: _FeedbackReducer.FeedbackReducerActionType.Clear
  });
}
function removeSingleFeedback(dispatch, questionId) {
  dispatch({
    type: _FeedbackReducer.FeedbackReducerActionType.RemoveSingle,
    payload: {
      questionId
    }
  });
}
//# sourceMappingURL=FeedbackHelpers.js.map