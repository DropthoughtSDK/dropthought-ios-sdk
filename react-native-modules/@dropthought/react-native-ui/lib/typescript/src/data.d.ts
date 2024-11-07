import type { QuestionType, QuestionSubType, QuestionBrandType, QuestionMetaDataType, Question, Feedback, Survey, Page, Rule, SurveyProperty, DisplayLogics, DisplayLogicProperty } from './dt-common/types/data';
export type { QuestionType, QuestionSubType, QuestionBrandType, QuestionMetaDataType, Question, Feedback, Survey, Page, Rule, SurveyProperty, DisplayLogics, DisplayLogicProperty, };
export type { IColorSchemesType, IAppearanceType, FontColor, BackgroundColor, IThemeOptionType, } from './contexts/theme';
export type EventAPISourceType = 'api' | 'kiosk' | 'qr' | 'email' | 'sms';
export type RequiredType = 'all' | 'one' | 'none';
export interface Option {
    isOther: boolean;
    title: string;
}
export interface SurveyFeedback {
    surveyId: string;
    feedbacks: Feedback[];
    metadata?: QuestionMetaDataType;
}
export interface ImageFileProps {
    uri: string;
    name: string;
    type: string;
    base64?: string;
}
//# sourceMappingURL=data.d.ts.map