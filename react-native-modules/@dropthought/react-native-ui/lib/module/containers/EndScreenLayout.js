import React from 'react';
import { useTheme, THEME_OPTION } from '../contexts/theme';
import EndScreen from './EndScreen';
import ClassicEndScreen from './ClassicEndScreen';
export default function EndScreenLayout({
  survey,
  onClose
}) {
  const {
    themeOption
  } = useTheme();
  switch (themeOption) {
    case THEME_OPTION.CLASSIC:
    case THEME_OPTION.BIJLIRIDE:
      return /*#__PURE__*/React.createElement(ClassicEndScreen, {
        survey: survey,
        onClose: onClose
      });
    default:
      return /*#__PURE__*/React.createElement(EndScreen, {
        survey: survey,
        onClose: onClose
      });
  }
}
//# sourceMappingURL=EndScreenLayout.js.map