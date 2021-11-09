"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomPropsContextProvider = exports.useMetadata = exports.useOnSubmitCallback = exports.useOnSubmitSuccessCallback = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @typedef {object} CustomProps
 * @property {(surveyFeedback: SurveyFeedback) => void} onSubmitSuccess
 * @property {(surveyFeedback: SurveyFeedback, error?: Error) => void} onSubmit
 * @property {any} metadata
 */

/**
 * @typedef {import('../../../data').SurveyFeedback} SurveyFeedback
 */


exports.CustomPropsContextProvider = CustomPropsContextProvider;
//# sourceMappingURL=CustomPropsContext.js.map