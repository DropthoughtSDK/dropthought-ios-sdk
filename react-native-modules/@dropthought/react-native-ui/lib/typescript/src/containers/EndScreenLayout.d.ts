import type { Survey as OriginSurvey } from '../data';
declare type Survey = OriginSurvey & {
    languages: string[];
};
declare type Props = {
    survey: Survey;
    onClose: () => void;
};
export default function EndScreenLayout({ survey, onClose, }: Props): JSX.Element;
export {};
