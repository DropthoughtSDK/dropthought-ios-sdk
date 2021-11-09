"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearFeedbacks = clearFeedbacks;
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
//# sourceMappingURL=FeedbackHelpers.js.map