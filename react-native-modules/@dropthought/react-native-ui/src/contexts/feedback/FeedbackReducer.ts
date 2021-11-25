import { append, identity, evolve, assoc } from 'ramda';
import type { Feedback } from 'src/data';

export type FeedbackReducerState = {
  answeredQuestionIds: string[];
  feedbacksMap: { [questionId: string]: Feedback };
};

export enum FeedbackReducerActionType {
  Clear = 'clear-feedbacks',
  Update = 'update-feedback',
}

export type IFeedbackReducerActionType =
  | FeedbackReducerActionType.Clear
  | FeedbackReducerActionType.Update;

export type ClearFeedbacksAction = {
  type: FeedbackReducerActionType.Clear;
};

export type UpdateFeedbackAction = {
  type: FeedbackReducerActionType.Update;
  payload: { feedback: Feedback };
};

export type FeedbackReducerAction = ClearFeedbacksAction | UpdateFeedbackAction;

export type FeedbackReducerDispatch = (action: FeedbackReducerAction) => void;

export const initialState: FeedbackReducerState = {
  answeredQuestionIds: [],
  feedbacksMap: {},
};

export const feedbackReducer = (
  state: FeedbackReducerState,
  action: FeedbackReducerAction
): FeedbackReducerState => {
  switch (action.type) {
    case FeedbackReducerActionType.Update:
      return updateFeedbackReducer(state, action);
    case FeedbackReducerActionType.Clear:
      return initialState;
  }
};
export const reducer = feedbackReducer;

const updateFeedbackReducer = (
  state: FeedbackReducerState,
  action: UpdateFeedbackAction
): FeedbackReducerState => {
  const feedback = action.payload.feedback;
  const existed = !!state.feedbacksMap[feedback.questionId];
  // @ts-ignore
  return evolve({
    // if the feedback is already existed, return the original array(identity), otherwise, append the question id to the list
    answeredQuestionIds: existed ? identity : append(feedback.questionId),

    // always set the questionId to the feedback object
    feedbacksMap: assoc(feedback.questionId, feedback),
  })(state);
};