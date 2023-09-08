import type {
  QuestionType,
  QuestionSubType,
  QuestionBrandType,
  QuestionMetaDataType,
  Question,
  Feedback,
  Survey,
  Page,
  Rule,
  SurveyProperty,
} from './dt-common/types/data';

export type {
  QuestionType,
  QuestionSubType,
  QuestionBrandType,
  QuestionMetaDataType,
  Question,
  Feedback,
  Survey,
  Page,
  Rule,
  SurveyProperty,
};

export type {
  IColorSchemesType,
  IAppearanceType,
  FontColor,
  BackgroundColor,
  IThemeOptionType,
} from './contexts/theme';

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
