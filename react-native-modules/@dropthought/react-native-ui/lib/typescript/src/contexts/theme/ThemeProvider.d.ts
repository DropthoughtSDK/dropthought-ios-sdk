import * as React from 'react';
import type { IAppearanceType, FontColor, BackgroundColor, IThemeOptionType } from './theme.const';
export interface useThemeProps {
    themeOption: IThemeOptionType;
    appearance: IAppearanceType;
    hexCode: string;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
    autoClose: boolean;
    autoCloseCountdown: number;
}
export interface ThemeProviderProps extends useThemeProps {
    children: React.ReactNode;
}
export declare function ThemeProvider({ children, themeOption, appearance, hexCode, fontColor, backgroundColor, autoClose, autoCloseCountdown, }: ThemeProviderProps): React.JSX.Element;
//# sourceMappingURL=ThemeProvider.d.ts.map