import type { Survey as OriginSurvey } from '../data';
type Survey = OriginSurvey & {
    languages: string[];
};
type Props = {
    survey: Survey;
    onClose: () => void;
};
export default function EndScreenLayout({ survey, onClose, }: Props): JSX.Element;
export {};
//# sourceMappingURL=EndScreenLayout.d.ts.map