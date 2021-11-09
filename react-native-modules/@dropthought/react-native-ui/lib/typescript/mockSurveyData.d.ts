/** @type {import('./data').Survey} */
export declare const singlePageSurvey: {
    anonymous: boolean;
    kiosk: number;
    language: string;
    languages: string[];
    pageOrder: string[];
    pages: {
        pageId: string;
        pageTitle: string;
        questions: ({
            category: string;
            mandatory: boolean;
            metaDataType: null;
            options: string[];
            questionBrand: string;
            questionId: string;
            questionTitle: string;
            scale: string;
            subType: string;
            type: string;
        } | {
            mandatory: boolean;
            metaDataType: string;
            questionBrand: string;
            questionId: string;
            questionTitle: string;
            scale: string;
            type: string;
            category?: undefined;
            options?: undefined;
            subType?: undefined;
        } | {
            mandatory: boolean;
            metaDataType: string;
            options: string[];
            questionBrand: string;
            questionId: string;
            questionTitle: string;
            scale: string;
            type: string;
            category?: undefined;
            subType?: undefined;
        } | {
            mandatory: boolean;
            metaDataType: null;
            options: string[];
            questionBrand: string;
            questionId: string;
            questionTitle: string;
            scale: string;
            type: string;
            category?: undefined;
            subType?: undefined;
        })[];
    }[];
    rules: {};
    state: string;
    surveyEndDate: string;
    surveyId: string;
    surveyName: string;
    surveyProperty: {
        image: string;
        hexCode: string;
        fileName: string;
        imageBase64: string;
    };
    surveyStartDate: string;
    surveyStatus: string;
    thankYouText: string;
    timezone: string;
    welcomeText: null;
};
/** @type {import('./data').Survey} */
export declare const multiPagesLogicSurvey: {
    anonymous: boolean;
    kiosk: number;
    language: string;
    languages: string[];
    pageOrder: string[];
    pages: ({
        pageId: string;
        pageTitle: string;
        questions: {
            mandatory: boolean;
            metaDataType: string;
            options: string[];
            questionBrand: string;
            questionId: string;
            questionTitle: string;
            scale: string;
            subType: string;
            type: string;
        }[];
    } | {
        pageId: string;
        pageTitle: string;
        questions: {
            mandatory: boolean;
            metaDataType: string;
            questionBrand: string;
            questionId: string;
            questionTitle: string;
            scale: string;
            type: string;
        }[];
    } | {
        pageId: string;
        pageTitle: string;
        questions: {
            mandatory: boolean;
            metaDataType: string;
            options: string[];
            questionBrand: string;
            questionId: string;
            questionTitle: string;
            scale: string;
            type: string;
        }[];
    })[];
    rules: {
        '39c30b98-6ced-43e6-8be6-657c45e02d61': {
            id: string;
            toPageId: string;
            condition: string;
            ruleIndex: number;
            mode: string;
        }[];
        '150b0287-7a4d-42de-add3-257e73dda86e': {
            id: string;
            toPageId: string;
            condition: string;
            ruleIndex: number;
            mode: string;
        }[];
    };
    state: string;
    surveyEndDate: string;
    surveyId: string;
    surveyName: string;
    surveyProperty: {
        image: string;
        hexCode: string;
        fileName: string;
        imageBase64: string;
    };
    surveyStartDate: string;
    surveyStatus: string;
    thankYouText: string;
    timezone: string;
    welcomeText: string;
};
