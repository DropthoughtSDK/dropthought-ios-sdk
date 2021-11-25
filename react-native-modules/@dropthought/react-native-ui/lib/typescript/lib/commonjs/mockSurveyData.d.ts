export var __esModule: boolean;
/** @type {import('./data').Survey} */
export const singlePageSurvey: any;
export namespace multiPagesLogicSurvey {
    const anonymous: boolean;
    const kiosk: number;
    const language: string;
    const languages: string[];
    const pageOrder: string[];
    const pages: ({
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
    const rules: {
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
    const state: string;
    const surveyEndDate: string;
    const surveyId: string;
    const surveyName: string;
    namespace surveyProperty {
        const image: string;
        const hexCode: string;
        const fileName: string;
        const imageBase64: string;
    }
    const surveyStartDate: string;
    const surveyStatus: string;
    const thankYouText: string;
    const timezone: string;
    const welcomeText: string;
}
