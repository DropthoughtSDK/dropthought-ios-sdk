import { createContext } from 'react';
import { initialState } from './FeedbackReducer';

/** @type {React.Context<FeedbackReducerState>} */
export const FeedbackStateContext = createContext(initialState);

/** @type {React.Context<FeedbackReducerDispatch>} */
export const FeedbackDispatchContext = createContext(() => undefined);

/** @typedef {import('./FeedbackReducer').FeedbackReducerState} FeedbackReducerState */
/** @typedef {import('./FeedbackReducer').FeedbackReducerDispatch} FeedbackReducerDispatch */
