export type QuestionType =
  | 'rating'
  | 'open'
  | 'multiChoice'
  | 'singleChoice'
  | 'nps';

export type QuestionSubType = 'smiley' | 'slider';

export type QuestionBrandType = 'other';

export type QuestionMetaDataType =
  | 'Name'
  | 'Email'
  | 'Phone'
  | 'Number'
  | 'Date'
  | 'String';

export type ProgramStateType = 'expired' | 'drafts' | 'active' | 'scheduled';

export type EventAPISourceType = 'api' | 'kiosk' | 'qr' | 'email' | 'sms';

export interface Option {
  isOther: boolean;
  title: string;
}

export interface Question {
  questionId: string;
  questionTitle: string;
  questionBrand?: QuestionBrandType;
  metaDataType?: QuestionMetaDataType;
  mandatory: boolean;
  options: string[];
  type: QuestionType;
  subType?: QuestionSubType;
  scale?: string;
  category: string;
  responseErrorText: string;
  questionTitles: string[];
  optionsForMatrix: string[][];
  optional: boolean;
  phiData: boolean;
  phiDataList: boolean[];
  optionImages: string[];
  otherTextLabel: string;
}

export interface Page {
  pageId: string;
  pageTitle: string;
  questions: Question[];
}

export interface Rule {
  id: string;
  toPageId: string;
  condition: string;
  ruleIndex: number;
  mode: string;
}

export interface SurveyProperty {
  image: string;
  hexCode: string;
  fileName?: string;
  imageBase64?: string;
  width?: number;
  height?: number;
  themeName?: string;
}

export interface ProgramInterface {
  anonymous: boolean;
  surveyId: string;
  surveyName: string;
  language: string;
  languages: string[];
  pageOrder: string[];
  pages: Page[];
  rules: { [questionId: string]: Rule[] };
  surveyProperty: SurveyProperty;
  thankYouText?: string;
  welcomeText?: string;
  timezone: string;
}

export declare type SurveyState =
  | 'drafts'
  | 'scheduled'
  | 'active'
  | 'expired'
  | 'inactive';
export interface Survey extends ProgramInterface {
  state: ProgramStateType;
  qrCode: string;
  surveyEndDate: string;
  surveyStartDate: string;
  status: SurveyState;
  endDate: string;
  startDate: string;
  backPage: string;
  nextPage: string;
  submitSurvey: string;
  surveyStatus: SurveyState;
  mandatoryErrorMessage: string;
  surveyType: number;
  takeSurvey: string;
}

export interface SurveyWithQRCode extends Survey {
  qrCode: string;
}

export interface SurveyLangMaps {
  [language: string]: Survey | SurveyWithQRCode;
}

/**
 * Feedback types
 */
export interface Feedback {
  questionId: string;
  answers: [string | number];
  type: QuestionType;
  otherFlag?: boolean;
}

export interface SurveyFeedback {
  surveyId: string;
  feedbacks: Feedback[];
  metadata?: any;
  createdTime: string;
  timeZone: string;
}

export interface Visibility {
  visibilityId: string;
  pageName: string;
  elementName: string;
  appearance: 'system' | 'light' | 'dark';
  themeOption:
    | 'classic'
    | 'option1'
    | 'option2'
    | 'option3'
    | 'option4'
    | 'option6'
    | 'bijliride';
  fontColor: string;
  backgroundColor: string;
  backgroundImage: string;
  program: VisibilityProgram;
  autoClose?: boolean;
  autoCloseCountdown?: number;
}

export interface VisibilityProgram {
  programId: string;
}

export interface ThemeData {
  themeOption:
    | 'classic'
    | 'option1'
    | 'option2'
    | 'option3'
    | 'option4'
    | 'option6'
    | 'bijliride';
  appearance: 'system' | 'light' | 'dark';
  fontColor: string;
  backgroundColor: string;
  autoClose?: boolean;
  autoCloseCountdown?: number;
}

export interface APIGetProgramByIdParam {
  programId: string;
  language?: string;
  timezone?: string;
}

export interface APIGetProgramTokenByIdParam {
  programId: string;
}

export interface PostPollingChoiceFnParams {
  programToken: string;
  questionId: string;
  choice?: string;
  isOther: boolean;
}
export interface PostPollingChoiceResponse {
  result: {
    [key: string]: number;
  };
  success: boolean;
}
