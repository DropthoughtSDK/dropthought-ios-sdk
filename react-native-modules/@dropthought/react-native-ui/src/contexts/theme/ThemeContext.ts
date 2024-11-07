import { createContext } from 'react';
import { Colors } from '../../styles';
import { COLOR_SCHEMES, THEME_OPTION } from './theme.const';
import type {
  BackgroundColor,
  FontColor,
  IColorSchemesType,
  IThemeOptionType,
} from './theme.const';

export interface ThemeContextProps {
  themeOption: IThemeOptionType;
  hexCode: string;
  colorScheme: IColorSchemesType;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
  customFontColor: FontColor;
  customBackgroundColor: BackgroundColor;
  autoClose: boolean;
  autoCloseCountdown: number;
}
export const ThemeContext = createContext<ThemeContextProps>({
  themeOption: THEME_OPTION.CLASSIC,
  hexCode: '',
  colorScheme: COLOR_SCHEMES.light,
  fontColor: Colors.fontColorLight,
  backgroundColor: Colors.backgroundColorLight,
  customFontColor: '',
  customBackgroundColor: '',
  autoClose: false,
  autoCloseCountdown: 3000,
});
