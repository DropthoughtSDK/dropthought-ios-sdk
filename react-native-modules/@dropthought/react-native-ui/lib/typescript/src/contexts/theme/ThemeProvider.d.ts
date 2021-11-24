import * as React from 'react';
import { IThemeOptionsType, FontColor, BackgroundColor } from './theme.const';
declare type Props = {
    children: React.ReactNode;
    theme: IThemeOptionsType;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
};
export declare function ThemeProvider({ children, theme, fontColor, backgroundColor, }: Props): JSX.Element;
export {};
