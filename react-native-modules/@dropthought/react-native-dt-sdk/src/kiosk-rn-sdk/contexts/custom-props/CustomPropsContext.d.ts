export interface CustomProps {
  onSubmitSuccess?: (surveyFeedback: SurveyFeedback) => void;
  onSubmit?: (surveyFeedback: SurveyFeedback, error?: Error) => void;
  metadata?: any;
}
