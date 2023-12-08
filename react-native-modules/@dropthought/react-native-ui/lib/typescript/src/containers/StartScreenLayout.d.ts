import type { Survey as OriginSurvey } from '../data';
declare type Survey = OriginSurvey & {
    languages: string[];
};
declare type Props = {
    onLanguageSelect: (language: string) => void;
    onClose: () => void;
    onStart: () => void;
    survey: Survey;
};
export default function StartScreenLayout({ onLanguageSelect, onClose, onStart, survey, }: Props): JSX.Element;
export {};
