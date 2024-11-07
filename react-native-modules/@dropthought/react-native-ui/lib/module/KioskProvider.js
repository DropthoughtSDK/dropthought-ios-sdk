import React from 'react';
import { FeedbackProvider } from './contexts/feedback';
import { ThemeProvider } from './contexts/theme';
export const KioskProvider = ({
  children,
  themeOption,
  appearance,
  hexCode,
  fontColor,
  backgroundColor,
  autoClose,
  autoCloseCountdown
}) => {
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    themeOption: themeOption,
    appearance: appearance,
    hexCode: hexCode,
    fontColor: fontColor,
    backgroundColor: backgroundColor,
    autoClose: autoClose,
    autoCloseCountdown: autoCloseCountdown
  }, /*#__PURE__*/React.createElement(FeedbackProvider, null, children));
};
//# sourceMappingURL=KioskProvider.js.map