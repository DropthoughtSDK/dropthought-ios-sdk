export function useOnSubmitSuccessCallback(): (surveyFeedback: SurveyFeedback) => void;
export function useOnSubmitCallback(): (surveyFeedback: SurveyFeedback, error?: Error) => void;
export function useMetadata(): any;
export function CustomPropsContextProvider({ onSubmit, onSubmitSuccess, metadata, children, }: CustomProps): JSX.Element;
export type CustomProps = {
    onSubmitSuccess: (surveyFeedback: SurveyFeedback) => void;
    onSubmit: (surveyFeedback: SurveyFeedback, error?: Error) => void;
    metadata: any;
};
export type SurveyFeedback = import('../../../data').SurveyFeedback;
