"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOnSubmitSuccessCallback = exports.useOnSubmitCallback = exports.useMetadata = exports.CustomPropsContextProvider = void 0;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const defaultCallback = undefined;

/** @type {React.Context<CustomProps>} */
const CustomPropsContext = /*#__PURE__*/React.createContext({
  onSubmit: defaultCallback,
  metadata: {},
  // deprecated, use onSubmit
  onSubmitSuccess: defaultCallback
});
const useOnSubmitSuccessCallback = () => {
  return React.useContext(CustomPropsContext).onSubmitSuccess;
};
exports.useOnSubmitSuccessCallback = useOnSubmitSuccessCallback;
const useOnSubmitCallback = () => {
  return React.useContext(CustomPropsContext).onSubmit;
};
exports.useOnSubmitCallback = useOnSubmitCallback;
const useMetadata = () => {
  return React.useContext(CustomPropsContext).metadata;
};

/**
 * @param {CustomProps} param0
 */
exports.useMetadata = useMetadata;
const CustomPropsContextProvider = ({
  onSubmit = defaultCallback,
  onSubmitSuccess = defaultCallback,
  metadata = {},
  children
}) => {
  return /*#__PURE__*/React.createElement(CustomPropsContext.Provider, {
    value: {
      onSubmit,
      onSubmitSuccess,
      metadata
    }
  }, children);
};

/**
 * @typedef {import('../../../data').SurveyFeedback} SurveyFeedback
 * @typedef {import('./CustomPropsContext').CustomProps} CustomProps
 */
exports.CustomPropsContextProvider = CustomPropsContextProvider;
//# sourceMappingURL=CustomPropsContext.js.map