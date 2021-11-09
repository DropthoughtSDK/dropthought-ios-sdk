"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = exports.feedbackReducer = exports.FeedbackReducerActionType = void 0;

var _ramda = require("ramda");

let FeedbackReducerActionType;
exports.FeedbackReducerActionType = FeedbackReducerActionType;

(function (FeedbackReducerActionType) {
  FeedbackReducerActionType["Clear"] = "clear-feedbacks";
  FeedbackReducerActionType["Update"] = "update-feedback";
})(FeedbackReducerActionType || (exports.FeedbackReducerActionType = FeedbackReducerActionType = {}));

const initialState = {
  answeredQuestionIds: [],
  feedbacksMap: {}
};
exports.initialState = initialState;

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case FeedbackReducerActionType.Update:
      return updateFeedbackReducer(state, action);

    case FeedbackReducerActionType.Clear:
      return initialState;
  }
};

exports.feedbackReducer = feedbackReducer;
const reducer = feedbackReducer;
exports.reducer = reducer;

const updateFeedbackReducer = (state, action) => {
  const feedback = action.payload.feedback;
  const existed = !!state.feedbacksMap[feedback.questionId]; // @ts-ignore

  return (0, _ramda.evolve)({
    // if the feedback is already existed, return the original array(identity), otherwise, append the question id to the list
    answeredQuestionIds: existed ? _ramda.identity : (0, _ramda.append)(feedback.questionId),
    // always set the questionId to the feedback object
    feedbacksMap: (0, _ramda.assoc)(feedback.questionId, feedback)
  })(state);
};
//# sourceMappingURL=FeedbackReducer.js.map