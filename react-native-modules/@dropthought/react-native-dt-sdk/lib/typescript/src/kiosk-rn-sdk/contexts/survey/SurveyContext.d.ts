export function useSurveyContext(): SurveyContextValue;
export function useSurvey(): import("../../../data").Survey;
export function SurveyContextProvider({ visibilityId, surveyId, children, defaultLanguage, onClose, themeOption, appearance, fontColor, backgroundColor, }: Props): JSX.Element;
export type Props = import('../../SDKEntry').SDKEntryProps;
export type SurveyContextValue = {
    survey: Survey;
    changeLanguage: (language: string) => void;
    onClose: () => void;
};
export type Survey = import('../../../data').Survey;
export type Visibility = import('../../../data').Visibility;
export type ThemeData = import('../../../data').ThemeData;
