export function useSurveyContext(): SurveyContextValue;
export function useSurvey(): import("../../../data").Survey;
export function SurveyContextProvider({ surveyId, children, defaultLanguage, onClose, }: Props): JSX.Element;
export type SurveyContextValue = {
    survey: Survey;
    changeLanguage: (language: string) => void;
    onClose: () => void;
};
export type Survey = import('../../../data').Survey;
export type Props = import('../../SDKEntry').SDKEntryProps;
