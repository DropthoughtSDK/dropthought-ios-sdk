import React from 'react';
import type { Survey as OriginSurvey } from '../data';
type Survey = OriginSurvey & {
    languages: string[];
};
type Props = {
    onLanguageSelect: (language: string) => void;
    onStart: () => void;
    survey: Survey;
};
declare const ClassicStartScreen: ({ onLanguageSelect, onStart, survey }: Props) => React.JSX.Element;
export default ClassicStartScreen;
//# sourceMappingURL=ClassicStartScreen.d.ts.map