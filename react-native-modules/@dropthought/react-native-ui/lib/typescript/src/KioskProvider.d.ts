import * as React from 'react';
import { IThemeOptionType, IAppearanceType, FontColor, BackgroundColor } from './contexts/theme';
export declare type KioskProviderProps = {
    children: React.ReactNode;
    themeOption: IThemeOptionType;
    appearance: IAppearanceType;
    hexCode: string;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
};
export declare const KioskProvider: ({ children, themeOption, appearance, hexCode, fontColor, backgroundColor, }: KioskProviderProps) => JSX.Element;
