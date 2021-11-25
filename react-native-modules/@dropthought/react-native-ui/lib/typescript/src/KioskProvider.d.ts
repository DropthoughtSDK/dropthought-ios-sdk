import * as React from 'react';
import { IThemeOptionsType, FontColor, BackgroundColor } from './contexts/theme';
declare type Props = {
    children: React.ReactNode;
    theme: IThemeOptionsType;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
};
export declare const KioskProvider: ({ children, theme, fontColor, backgroundColor, }: Props) => JSX.Element;
export {};
