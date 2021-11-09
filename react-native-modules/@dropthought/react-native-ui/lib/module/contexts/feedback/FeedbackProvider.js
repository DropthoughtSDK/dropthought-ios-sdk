import * as React from 'react';
import { FeedbackStateContext, FeedbackDispatchContext } from './FeedbackContext';
import { reducer, initialState } from './FeedbackReducer';
export function FeedbackProvider({
  children
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return /*#__PURE__*/React.createElement(FeedbackStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(FeedbackDispatchContext.Provider, {
    value: dispatch
  }, children));
}
//# sourceMappingURL=FeedbackProvider.js.map