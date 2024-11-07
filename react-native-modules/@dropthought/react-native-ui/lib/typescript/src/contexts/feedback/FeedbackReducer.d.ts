import type { Feedback } from '../../data';
export type FeedbackReducerState = {
    answeredQuestionIds: string[];
    feedbacksMap: {
        [questionId: string]: Feedback;
    };
};
export declare enum FeedbackReducerActionType {
    Clear = "clear-feedbacks",
    Update = "update-feedback",
    RemoveSingle = "remove-single-feedback"
}
export type IFeedbackReducerActionType = FeedbackReducerActionType.Clear | FeedbackReducerActionType.Update | FeedbackReducerActionType.RemoveSingle;
export type ClearFeedbacksAction = {
    type: FeedbackReducerActionType.Clear;
};
export type UpdateFeedbackAction = {
    type: FeedbackReducerActionType.Update;
    payload: {
        feedback: Feedback;
    };
};
export type RemoveSingleFeedbackAction = {
    type: FeedbackReducerActionType.RemoveSingle;
    payload: {
        questionId: string;
    };
};
export type FeedbackReducerAction = ClearFeedbacksAction | UpdateFeedbackAction | RemoveSingleFeedbackAction;
export type FeedbackReducerDispatch = (action: FeedbackReducerAction) => void;
export declare const initialState: FeedbackReducerState;
export declare const feedbackReducer: (state: FeedbackReducerState, action: FeedbackReducerAction) => FeedbackReducerState;
export declare const reducer: (state: FeedbackReducerState, action: FeedbackReducerAction) => FeedbackReducerState;
//# sourceMappingURL=FeedbackReducer.d.ts.map