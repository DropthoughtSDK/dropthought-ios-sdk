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
export default function StartScreenLayout({ onLanguageSelect, onClose, onStart, survey, }: Props): JSX.Element;
export {};
//# sourceMappingURL=StartScreenLayout.d.ts.map