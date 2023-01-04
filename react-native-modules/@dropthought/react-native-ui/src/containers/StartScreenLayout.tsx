import React from 'react';
import { useTheme, THEME_OPTION } from '../contexts/theme';
import StartScreen from './StartScreen';
import ClassicStartScreen from './ClassicStartScreen';
import type { Survey as OriginSurvey } from '../data';

type Survey = OriginSurvey & {
  languages: ('en' | 'ar')[];
};

type Props = {
  onLanguageSelect: (language: string) => void;
  onClose: () => void;
  onStart: () => void;
  survey: Survey;
};

export default function StartScreenLayout({
  onLanguageSelect,
  onClose,
  onStart,
  survey,
}: Props): JSX.Element {
  const { themeOption } = useTheme();

  switch (themeOption) {
    case THEME_OPTION.CLASSIC:
      return (
        <ClassicStartScreen
          survey={survey}
          onLanguageSelect={onLanguageSelect}
          onStart={onStart}
        />
      );
    default:
      return (
        <StartScreen
          survey={survey}
          onLanguageSelect={onLanguageSelect}
          onClose={onClose}
          onStart={onStart}
        />
      );
  }
}
