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
declare const StartScreen: ({ onLanguageSelect, onClose, onStart, survey }: Props) => JSX.Element;
export default StartScreen;
