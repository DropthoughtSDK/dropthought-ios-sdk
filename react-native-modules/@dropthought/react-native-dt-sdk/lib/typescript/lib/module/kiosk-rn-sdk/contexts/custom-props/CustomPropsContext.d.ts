export function useOnSubmitSuccessCallback(): (surveyFeedback: any) => void;
export function useOnSubmitCallback(): (surveyFeedback: any, error?: Error) => void;
export function useMetadata(): any;
export function CustomPropsContextProvider({ onSubmit, onSubmitSuccess, metadata, children }: CustomProps): React.FunctionComponentElement<React.ProviderProps<CustomProps>>;
export type CustomProps = {
    onSubmitSuccess: (surveyFeedback: any) => void;
    onSubmit: (surveyFeedback: any, error?: Error) => void;
    metadata: any;
};
export type SurveyFeedback = any;
import * as React from "react";
