import { useRef, useCallback } from "react"; // Utility hook that returns a function that never has stale dependencies, but
// without changing identity, as a useCallback with dep array would.
// Useful for functions that depend on external state, but
// should not trigger effects when that external state changes.

export function useStableCallback(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const identityRetainingFn = useCallback(function () {
    return fnRef.current(...arguments);
  }, []);
  return identityRetainingFn;
}
//# sourceMappingURL=useStableCallback.js.map