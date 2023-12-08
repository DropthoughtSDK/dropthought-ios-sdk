import React from 'react';
import { useTheme, THEME_OPTION } from '../contexts/theme';
import StartScreen from './StartScreen';
import ClassicStartScreen from './ClassicStartScreen';
export default function StartScreenLayout({
  onLanguageSelect,
  onClose,
  onStart,
  survey
}) {
  const {
    themeOption
  } = useTheme();

  switch (themeOption) {
    case THEME_OPTION.CLASSIC:
    case THEME_OPTION.BIJLIRIDE:
      return /*#__PURE__*/React.createElement(ClassicStartScreen, {
        survey: survey,
        onLanguageSelect: onLanguageSelect,
        onStart: onStart
      });

    default:
      return /*#__PURE__*/React.createElement(StartScreen, {
        survey: survey,
        onLanguageSelect: onLanguageSelect,
        onClose: onClose,
        onStart: onStart
      });
  }
}
//# sourceMappingURL=StartScreenLayout.js.map