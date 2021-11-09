import * as React from 'react';

import { FeedbackProvider } from './contexts/feedback';
import {
  ThemeProvider,
  IThemeOptionsType,
  FontColor,
  BackgroundColor,
} from './contexts/theme';

type Props = {
  children: React.ReactNode;
  theme: IThemeOptionsType;
  fontColor: FontColor;
  backgroundColor: BackgroundColor;
};

export const KioskProvider = ({
  children,
  theme,
  fontColor,
  backgroundColor,
}: Props) => {
  return (
    <ThemeProvider
      theme={theme}
      fontColor={fontColor}
      backgroundColor={backgroundColor}
    >
      <FeedbackProvider>{children}</FeedbackProvider>
    </ThemeProvider>
  );
};
