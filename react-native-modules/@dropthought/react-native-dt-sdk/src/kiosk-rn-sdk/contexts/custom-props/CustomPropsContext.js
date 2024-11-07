import * as React from 'react';

const defaultCallback = undefined;

/** @type {React.Context<CustomProps>} */
const CustomPropsContext = React.createContext({
  onSubmit: defaultCallback,
  metadata: {},

  // deprecated, use onSubmit
  onSubmitSuccess: defaultCallback,
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
  children,
}) => {
  return (
    <CustomPropsContext.Provider
      value={{
        onSubmit,
        onSubmitSuccess,
        metadata,
      }}
    >
      {children}
    </CustomPropsContext.Provider>
  );
};

/**
 * @typedef {import('../../../data').SurveyFeedback} SurveyFeedback
 * @typedef {import('./CustomPropsContext').CustomProps} CustomProps
 */
