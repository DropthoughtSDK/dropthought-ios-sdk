import type { Survey as OriginSurvey } from '../data';
declare type Survey = OriginSurvey & {
    languages: string[];
};
declare type Props = {
    onLanguageSelect: (language: string) => void;
    onStart: () => void;
    survey: Survey;
};
declare const ClassicStartScreen: ({ onLanguageSelect, onStart, survey }: Props) => JSX.Element;
export default ClassicStartScreen;
