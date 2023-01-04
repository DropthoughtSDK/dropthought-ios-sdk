import * as React from 'react';
import { IThemeOptionType, IAppearanceType, FontColor, BackgroundColor } from './contexts/theme';
export declare type KioskProviderProps = {
    children: React.ReactNode;
    themeOption: IThemeOptionType;
    appearance: IAppearanceType;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
};
export declare const KioskProvider: ({ children, themeOption, appearance, fontColor, backgroundColor, }: KioskProviderProps) => JSX.Element;
