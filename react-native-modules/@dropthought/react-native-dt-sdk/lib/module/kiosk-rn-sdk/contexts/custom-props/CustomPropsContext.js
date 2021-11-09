import * as React from 'react';
const defaultCallback = undefined;
/** @type {React.Context<CustomProps>} */

const CustomPropsContext = /*#__PURE__*/React.createContext({
  onSubmit: defaultCallback,
  metadata: {},
  // deprecated, use onSubmit
  onSubmitSuccess: defaultCallback
});
export const useOnSubmitSuccessCallback = () => {
  return React.useContext(CustomPropsContext).onSubmitSuccess;
};
export const useOnSubmitCallback = () => {
  return React.useContext(CustomPropsContext).onSubmit;
};
export const useMetadata = () => {
  return React.useContext(CustomPropsContext).metadata;
};
/**
 * @param {CustomProps} param0
 */

export const CustomPropsContextProvider = ({
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
//# sourceMappingURL=CustomPropsContext.js.map