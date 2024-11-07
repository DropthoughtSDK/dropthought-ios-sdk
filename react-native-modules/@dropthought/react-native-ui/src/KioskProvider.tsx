import React from 'react';
import { FeedbackProvider } from './contexts/feedback';
import { ThemeProvider } from './contexts/theme';
import type { ThemeProviderProps } from './contexts/theme';

export interface KioskProviderProps extends ThemeProviderProps {}

export const KioskProvider = ({
  children,
  themeOption,
  appearance,
  hexCode,
  fontColor,
  backgroundColor,
  autoClose,
  autoCloseCountdown,
}: KioskProviderProps) => {
  return (
    <ThemeProvider
      themeOption={themeOption}
      appearance={appearance}
      hexCode={hexCode}
      fontColor={fontColor}
      backgroundColor={backgroundColor}
      autoClose={autoClose}
      autoCloseCountdown={autoCloseCountdown}
    >
      <FeedbackProvider>{children}</FeedbackProvider>
    </ThemeProvider>
  );
};
