import { append, identity, evolve, assoc } from 'ramda';
export let FeedbackReducerActionType = /*#__PURE__*/function (FeedbackReducerActionType) {
  FeedbackReducerActionType["Clear"] = "clear-feedbacks";
  FeedbackReducerActionType["Update"] = "update-feedback";
  FeedbackReducerActionType["RemoveSingle"] = "remove-single-feedback";
  return FeedbackReducerActionType;
}({});
export const initialState = {
  answeredQuestionIds: [],
  feedbacksMap: {}
};
export const feedbackReducer = (state, action) => {
  switch (action.type) {
    case FeedbackReducerActionType.Update:
      return updateFeedbackReducer(state, action);
    case FeedbackReducerActionType.RemoveSingle:
      return removeSingleFeedbackReducer(state, action);
    case FeedbackReducerActionType.Clear:
      return initialState;
  }
};
export const reducer = feedbackReducer;
const updateFeedbackReducer = (state, action) => {
  const feedback = action.payload.feedback;
  const existed = !!state.feedbacksMap[feedback.questionId];
  // @ts-ignore
  return evolve({
    // if the feedback is already existed, return the original array(identity), otherwise, append the question id to the list
    answeredQuestionIds: existed ? identity : append(feedback.questionId),
    // always set the questionId to the feedback object
    feedbacksMap: assoc(feedback.questionId, feedback)
  })(state);
};
const removeSingleFeedbackReducer = (state, action) => {
  const questionId = action.payload.questionId;
  state.answeredQuestionIds = state.answeredQuestionIds.filter(id => id !== questionId);
  delete state.feedbacksMap[questionId];
  return {
    ...state
  };
};
//# sourceMappingURL=FeedbackReducer.js.map