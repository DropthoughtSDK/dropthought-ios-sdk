import { createContext } from 'react';
import { initialState } from './FeedbackReducer';
/** @type {React.Context<FeedbackReducerState>} */

export const FeedbackStateContext = /*#__PURE__*/createContext(initialState);
/** @type {React.Context<FeedbackReducerDispatch>} */

export const FeedbackDispatchContext = /*#__PURE__*/createContext(() => undefined);
/** @typedef {import('./FeedbackReducer').FeedbackReducerState} FeedbackReducerState */

/** @typedef {import('./FeedbackReducer').FeedbackReducerDispatch} FeedbackReducerDispatch */
//# sourceMappingURL=FeedbackContext.js.map