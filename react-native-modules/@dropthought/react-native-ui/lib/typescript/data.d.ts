export type { IColorSchemesType, IThemeOptionsType, FontColor, BackgroundColor, } from './contexts/theme';
export declare type QuestionType = 'rating' | 'open' | 'multiChoice' | 'singleChoice' | 'nps';
export declare type QuestionSubType = 'smiley' | 'slider';
export declare type QuestionBrandType = 'other';
export declare type QuestionMetaDataType = 'Name' | 'Email' | 'Phone' | 'Number' | 'Date' | 'String';
export declare type ProgramStateType = 'expired' | 'drafts' | 'active' | 'scheduled';
export declare type EventAPISourceType = 'api' | 'kiosk' | 'qr' | 'email' | 'sms';
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
    options?: string[];
    type: QuestionType;
    subType?: QuestionSubType;
    scale?: number;
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
}
export interface ProgramInterface {
    anonymous: boolean;
    surveyId: string;
    surveyName: string;
    language: string;
    languages: string[];
    pageOrder: string[];
    pages: Page[];
    rules: {
        [questionId: string]: Rule[];
    };
    surveyProperty: SurveyProperty;
    thankYouText?: string;
    welcomeText?: string;
    timezone: string;
}
export interface Survey extends ProgramInterface {
    state: ProgramStateType;
    qrCode?: string;
    surveyEndDate: string;
    surveyStartDate: string;
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
    answers: (string | number | undefined)[];
    type: QuestionType;
    otherFlag?: boolean;
}
export interface SurveyFeedback {
    surveyId: string;
    feedbacks: Feedback[];
    metadata?: any;
}
