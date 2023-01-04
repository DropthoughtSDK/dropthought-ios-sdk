export function useSurveyContext(): SurveyContextValue;
export function useSurvey(): any;
export function SurveyContextProvider({ visibilityId, surveyId, children, defaultLanguage, onClose, themeOption, appearance, fontColor, backgroundColor }: Props): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.FunctionComponentElement<React.ProviderProps<SurveyContextValue>>;
export type Props = import('../../SDKEntry').SDKEntryProps;
export type SurveyContextValue = {
    survey: any;
    changeLanguage: (language: string) => void;
    onClose: () => void;
};
export type Survey = any;
export type Visibility = any;
export type ThemeData = any;
import * as React from "react";
