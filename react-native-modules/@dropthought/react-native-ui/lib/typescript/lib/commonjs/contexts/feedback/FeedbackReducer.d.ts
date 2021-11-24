export var __esModule: boolean;
export var FeedbackReducerActionType: {} | undefined;
export let FeedbackReducerActionType: any;
export namespace initialState {
    const answeredQuestionIds: never[];
    const feedbacksMap: {};
}
export function feedbackReducer(state: any, action: any): _ramda.Evolve<any, {
    answeredQuestionIds: typeof _ramda.identity | (<T>(list: readonly T[]) => T[]);
    feedbacksMap: <U>(obj: U) => Record<any, any> & Omit<U, any>;
}> | undefined;
export function reducer(state: any, action: any): _ramda.Evolve<any, {
    answeredQuestionIds: typeof _ramda.identity | (<T>(list: readonly T[]) => T[]);
    feedbacksMap: <U>(obj: U) => Record<any, any> & Omit<U, any>;
}> | undefined;
import _ramda = require("ramda");
