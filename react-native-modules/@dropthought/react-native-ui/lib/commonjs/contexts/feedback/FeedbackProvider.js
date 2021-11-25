"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackProvider = FeedbackProvider;

var React = _interopRequireWildcard(require("react"));

var _FeedbackContext = require("./FeedbackContext");

var _FeedbackReducer = require("./FeedbackReducer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function FeedbackProvider({
  children
}) {
  const [state, dispatch] = React.useReducer(_FeedbackReducer.reducer, _FeedbackReducer.initialState);
  return /*#__PURE__*/React.createElement(_FeedbackContext.FeedbackStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(_FeedbackContext.FeedbackDispatchContext.Provider, {
    value: dispatch
  }, children));
}
//# sourceMappingURL=FeedbackProvider.js.map