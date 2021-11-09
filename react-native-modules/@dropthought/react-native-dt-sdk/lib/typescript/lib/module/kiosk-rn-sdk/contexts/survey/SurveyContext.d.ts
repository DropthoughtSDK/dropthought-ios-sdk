export function useSurveyContext(): SurveyContextValue;
export function useSurvey(): any;
export function SurveyContextProvider({ surveyId, children, defaultLanguage, onClose }: Props): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.FunctionComponentElement<React.ProviderProps<SurveyContextValue>>;
export type SurveyContextValue = {
    survey: any;
    changeLanguage: (language: string) => void;
    onClose: () => void;
};
export type Survey = any;
export type Props = import('../../SDKEntry').SDKEntryProps;
import * as React from "react";
