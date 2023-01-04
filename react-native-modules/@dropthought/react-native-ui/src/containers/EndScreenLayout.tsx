import React from 'react';
import { useTheme, THEME_OPTION } from '../contexts/theme';
import EndScreen from './EndScreen';
import ClassicEndScreen from './ClassicEndScreen';
import type { Survey as OriginSurvey } from '../data';

type Survey = OriginSurvey & {
  languages: ('en' | 'ar')[];
};

type Props = {
  survey: Survey;
  onClose: () => void;
};

export default function EndScreenLayout({
  survey,
  onClose,
}: Props): JSX.Element {
  const { themeOption } = useTheme();

  switch (themeOption) {
    case THEME_OPTION.CLASSIC:
      return <ClassicEndScreen survey={survey} />;
    default:
      return <EndScreen survey={survey} onClose={onClose} />;
  }
}
