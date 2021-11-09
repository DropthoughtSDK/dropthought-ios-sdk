export function submitFeedback([surveyFeedback]: [SurveyFeedback]): Promise<any>;
export function saveFeedback(surveyFeedback: SurveyFeedback): Promise<void>;
export type Feedback = import('../data').Feedback;
export type SurveyFeedback = import('../data').SurveyFeedback;
