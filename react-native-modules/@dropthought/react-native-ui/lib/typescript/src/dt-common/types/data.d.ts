export declare type RatingIconType = 'smiley' | 'star' | 'heart' | 'thumb';
export declare type QuestionSubType = 'smiley' | 'slider' | 'short' | 'long' | 'multiChoice' | RatingIconType;
export declare type QuestionBrandType = 'other';
export declare type QuestionMetaDataType = 'Name' | 'Email' | 'Phone' | 'Number' | 'Date' | 'String';
export declare type QuestionType = 'nps' | 'rating' | 'multiChoice' | 'singleChoice' | 'open' | 'multipleOpenEnded' | 'ranking' | 'ratingSlider' | 'dropdown' | 'matrixRating' | 'matrixChoice' | 'pictureChoice';
export declare type ProgramStateType = 'expired' | 'drafts' | 'active' | 'scheduled';
export interface Question {
    category: string;
    mandatory: boolean;
    options: string[];
    questionId: string;
    questionTitle: string;
    type: QuestionType;
    questionBrand?: QuestionBrandType | string;
    metaDataType?: QuestionMetaDataType;
    subType?: QuestionSubType;
    scale?: string;
    errorText?: string;
    questionIds?: string[];
    metaDataTypeList?: QuestionMetaDataType[];
    responseErrorText: string;
    responseErrorTextList?: string[];
    otherText?: string;
    exampleMetadataText?: string;
    exampleMetadataTextList?: string[];
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
export declare type SurveyState = 'drafts' | 'scheduled' | 'active' | 'expired' | 'inactive';
export interface SurveyProperty {
    image: string;
    hexCode: string;
    fileName?: string;
    imageBase64?: string;
    width?: number;
    height?: number;
    themeName?: string;
}
export interface ProgramContent {
    pageUUID: string;
    collaborators: string[];
    pageTitle: string;
}
export interface Survey {
    status: SurveyState;
    hide?: boolean;
    hidden?: boolean;
    anonymous: boolean;
    language: string;
    languages: string[];
    pages: Page[];
    rules: {
        [questionId: string]: Rule[];
    };
    endDate: string;
    surveyId: string;
    surveyName: string;
    surveyProperty: SurveyProperty;
    timezone: string;
    startDate: string;
    thankYouText?: string;
    thankYouTextPlain?: string;
    welcomeText?: string;
    welcomeTextPlain?: string;
    backPage: string;
    nextPage: string;
    submitSurvey: string;
    characterCountIndicator?: string;
    inactiveSurveyText?: string;
    metaDataPlaceHolders?: object;
    metaDataQuestions?: object;
    qrCode?: string;
    surveyStatus: SurveyState;
    surveyStartDate: string;
    surveyEndDate: string;
    mandatoryErrorMessage: string;
    contents?: ProgramContent[];
    surveyType: number;
    pageOrder: string[];
    state: ProgramStateType;
    takeSurvey: string;
}
export interface TransformedOption {
    option: string;
    index: number;
    isNA: boolean;
}
export interface PictureChoiceOtherAnswer {
    image: string;
    value: string;
}
export interface Feedback {
    questionId: string;
    answers: (string | number | PictureChoiceOtherAnswer | undefined)[];
    type: string;
    subType?: string;
    otherFlag?: boolean;
    listForRankingQuestion?: TransformedOption[];
}
