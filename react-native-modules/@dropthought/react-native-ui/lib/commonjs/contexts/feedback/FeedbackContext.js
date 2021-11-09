"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackStateContext = exports.FeedbackDispatchContext = void 0;

var _react = require("react");

var _FeedbackReducer = require("./FeedbackReducer");

/** @type {React.Context<FeedbackReducerState>} */
const FeedbackStateContext = /*#__PURE__*/(0, _react.createContext)(_FeedbackReducer.initialState);
/** @type {React.Context<FeedbackReducerDispatch>} */

exports.FeedbackStateContext = FeedbackStateContext;
const FeedbackDispatchContext = /*#__PURE__*/(0, _react.createContext)(() => undefined);
/** @typedef {import('./FeedbackReducer').FeedbackReducerState} FeedbackReducerState */

/** @typedef {import('./FeedbackReducer').FeedbackReducerDispatch} FeedbackReducerDispatch */

exports.FeedbackDispatchContext = FeedbackDispatchContext;
//# sourceMappingURL=FeedbackContext.js.map