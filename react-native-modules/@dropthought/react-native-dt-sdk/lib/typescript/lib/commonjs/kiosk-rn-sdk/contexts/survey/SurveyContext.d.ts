export var __esModule: boolean;
export type Props = import('../../SDKEntry').SDKEntryProps;
export type SurveyContextValue = {
    survey: any;
    changeLanguage: (language: string) => void;
    onClose: () => void;
};
export type Survey = any;
export type Visibility = any;
export type ThemeData = any;
export function useSurveyContext(): any;
export function useSurvey(): any;
/**
 * @param {Props} param0
 */
export function SurveyContextProvider({ baseURL, apiKey, visibilityId, surveyId, children, defaultLanguage, onClose, themeOption, appearance, fontColor, backgroundColor, timezone }: Props): any;
