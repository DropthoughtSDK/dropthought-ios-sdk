import * as React from 'react';

import { FeedbackProvider } from './contexts/feedback';
import {
  ThemeProvider,
  IThemeOptionType,
  IAppearanceType,
  FontColor,
  BackgroundColor,
} from './contexts/theme';

export type KioskProviderProps = {
  children: React.ReactNode;
  themeOption: IThemeOptionType;
  appearance: IAppearanceType;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
};

export const KioskProvider = ({
  children,
  themeOption,
  appearance,
  fontColor,
  backgroundColor,
}: KioskProviderProps) => {
  return (
    <ThemeProvider
      themeOption={themeOption}
      appearance={appearance}
      fontColor={fontColor}
      backgroundColor={backgroundColor}
    >
      <FeedbackProvider>{children}</FeedbackProvider>
    </ThemeProvider>
  );
};
