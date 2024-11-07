import React from 'react';
import type { Survey as OriginSurvey } from '../data';
type Survey = OriginSurvey & {
    languages: string[];
};
type Props = {
    onLanguageSelect: (language: string) => void;
    onClose: () => void;
    onStart: () => void;
    survey: Survey;
};
declare const StartScreen: ({ onLanguageSelect, onClose, onStart, survey }: Props) => React.JSX.Element;
export default StartScreen;
//# sourceMappingURL=StartScreen.d.ts.map