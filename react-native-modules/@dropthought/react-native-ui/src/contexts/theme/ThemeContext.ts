import { createContext } from 'react';
import { Colors } from '../../styles';
import { THEME_OPTION } from './theme.const';

export const ThemeContext = createContext({
  themeOption: THEME_OPTION.CLASSIC,
  hexCode: '',
  colorScheme: 'light',
  fontColor: Colors.fontColorLight,
  backgroundColor: Colors.backgroundColorLight,
  customFontColor: '',
  customBackgroundColor: '',
});
