"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
function useStateRef(defaultValue) {
  const [state, setState] = (0, _react.useState)(defaultValue);
  const ref = (0, _react.useRef)(state);
  const dispatch = (0, _react.useCallback)(
  /**
   * @param {any} value
   */
  value => {
    ref.current = typeof value === 'function' ? value(ref.current) : value;
    setState(ref.current);
  }, []);
  return [state, dispatch, ref];
}
var _default = exports.default = useStateRef;
//# sourceMappingURL=useStateRef.js.map