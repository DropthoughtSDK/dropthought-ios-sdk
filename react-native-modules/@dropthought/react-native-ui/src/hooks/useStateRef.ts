import { useCallback, useRef, useState } from 'react';

function useStateRef(defaultValue: any) {
  const [state, setState] = useState(defaultValue);
  const ref = useRef(state);

  const dispatch = useCallback(
    /**
     * @param {any} value
     */
    (value) => {
      ref.current = typeof value === 'function' ? value(ref.current) : value;
      setState(ref.current);
    },
    []
  );

  return [state, dispatch, ref];
}

export default useStateRef;
