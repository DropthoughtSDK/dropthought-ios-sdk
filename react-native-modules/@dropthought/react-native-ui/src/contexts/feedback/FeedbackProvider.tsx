import * as React from 'react';

import {
  FeedbackStateContext,
  FeedbackDispatchContext,
} from './FeedbackContext';
import { reducer, initialState } from './FeedbackReducer';

type Props = {
  children: React.ReactNode;
};

export function FeedbackProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <FeedbackStateContext.Provider value={state}>
      {/* @ts-ignore */}
      <FeedbackDispatchContext.Provider value={dispatch}>
        {children}
      </FeedbackDispatchContext.Provider>
    </FeedbackStateContext.Provider>
  );
}
