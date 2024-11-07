/// <reference types="react" />
import type { BackgroundColor, FontColor, IColorSchemesType, IThemeOptionType } from './theme.const';
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
export declare const ThemeContext: import("react").Context<ThemeContextProps>;
//# sourceMappingURL=ThemeContext.d.ts.map