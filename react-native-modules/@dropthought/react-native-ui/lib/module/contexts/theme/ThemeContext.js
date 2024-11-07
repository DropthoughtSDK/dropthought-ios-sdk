import { createContext } from 'react';
import { Colors } from '../../styles';
import { COLOR_SCHEMES, THEME_OPTION } from './theme.const';
export const ThemeContext = /*#__PURE__*/createContext({
  themeOption: THEME_OPTION.CLASSIC,
  hexCode: '',
  colorScheme: COLOR_SCHEMES.light,
  fontColor: Colors.fontColorLight,
  backgroundColor: Colors.backgroundColorLight,
  customFontColor: '',
  customBackgroundColor: '',
  autoClose: false,
  autoCloseCountdown: 3000
});
//# sourceMappingURL=ThemeContext.js.map