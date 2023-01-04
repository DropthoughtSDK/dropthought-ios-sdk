import * as React from 'react';
import { IAppearanceType, FontColor, BackgroundColor, IThemeOptionType } from './theme.const';
declare type Props = {
    children: React.ReactNode;
    themeOption: IThemeOptionType;
    appearance: IAppearanceType;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
};
export declare function ThemeProvider({ children, themeOption, appearance, fontColor, backgroundColor, }: Props): JSX.Element;
export {};
