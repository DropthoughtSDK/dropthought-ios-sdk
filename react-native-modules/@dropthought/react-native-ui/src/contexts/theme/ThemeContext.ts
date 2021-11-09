import { createContext } from 'react';
import { Colors } from '../../styles';

export const ThemeContext = createContext({
  colorScheme: 'light',
  fontColor: Colors.fontColorLight,
  backgroundColor: Colors.backgroundColorLight,
});
