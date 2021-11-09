import type { Feedback } from 'src/data';
export declare type FeedbackReducerState = {
    answeredQuestionIds: string[];
    feedbacksMap: {
        [questionId: string]: Feedback;
    };
};
export declare enum FeedbackReducerActionType {
    Clear = "clear-feedbacks",
    Update = "update-feedback"
}
export declare type IFeedbackReducerActionType = FeedbackReducerActionType.Clear | FeedbackReducerActionType.Update;
export declare type ClearFeedbacksAction = {
    type: FeedbackReducerActionType.Clear;
};
export declare type UpdateFeedbackAction = {
    type: FeedbackReducerActionType.Update;
    payload: {
        feedback: Feedback;
    };
};
export declare type FeedbackReducerAction = ClearFeedbacksAction | UpdateFeedbackAction;
export declare type FeedbackReducerDispatch = (action: FeedbackReducerAction) => void;
export declare const initialState: FeedbackReducerState;
export declare const feedbackReducer: (state: FeedbackReducerState, action: FeedbackReducerAction) => FeedbackReducerState;
export declare const reducer: (state: FeedbackReducerState, action: FeedbackReducerAction) => FeedbackReducerState;
