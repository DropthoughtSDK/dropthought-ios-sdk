import * as React from 'react';
import { IAppearanceType, FontColor, BackgroundColor, IThemeOptionType } from './theme.const';
declare type Props = {
    children: React.ReactNode;
    themeOption: IThemeOptionType;
    appearance: IAppearanceType;
    hexCode: string;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
};
export declare function ThemeProvider({ children, themeOption, appearance, hexCode, fontColor, backgroundColor, }: Props): JSX.Element;
export {};
