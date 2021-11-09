import type { Survey as OriginSurvey } from '../data';
declare type Survey = OriginSurvey & {
    languages: ('en' | 'ar')[];
};
declare type Props = {
    onLanguageSelect: (language: string) => void;
    onStart: () => void;
    survey: Survey;
};
declare const StartScreen: ({ onLanguageSelect, onStart, survey }: Props) => JSX.Element;
export default StartScreen;
