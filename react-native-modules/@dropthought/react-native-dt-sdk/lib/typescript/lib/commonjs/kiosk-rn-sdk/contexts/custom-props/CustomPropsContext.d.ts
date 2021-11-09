export var __esModule: boolean;
export type CustomProps = {
    onSubmitSuccess: (surveyFeedback: any) => void;
    onSubmit: (surveyFeedback: any, error?: Error) => void;
    metadata: any;
};
export type SurveyFeedback = any;
export function useOnSubmitSuccessCallback(): any;
export function useOnSubmitCallback(): any;
export function useMetadata(): any;
export function CustomPropsContextProvider({ onSubmit, onSubmitSuccess, metadata, children }: {
    onSubmit?: any;
    onSubmitSuccess?: any;
    metadata?: {};
    children: any;
}): any;
