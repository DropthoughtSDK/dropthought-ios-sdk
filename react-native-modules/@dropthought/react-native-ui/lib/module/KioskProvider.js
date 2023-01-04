import * as React from 'react';
import { FeedbackProvider } from './contexts/feedback';
import { ThemeProvider } from './contexts/theme';
export const KioskProvider = ({
  children,
  themeOption,
  appearance,
  fontColor,
  backgroundColor
}) => {
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    themeOption: themeOption,
    appearance: appearance,
    fontColor: fontColor,
    backgroundColor: backgroundColor
  }, /*#__PURE__*/React.createElement(FeedbackProvider, null, children));
};
//# sourceMappingURL=KioskProvider.js.map