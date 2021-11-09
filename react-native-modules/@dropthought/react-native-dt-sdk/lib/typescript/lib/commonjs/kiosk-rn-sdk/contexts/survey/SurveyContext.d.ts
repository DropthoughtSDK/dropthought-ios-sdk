export var __esModule: boolean;
export type SurveyContextValue = {
    survey: any;
    changeLanguage: (language: string) => void;
    onClose: () => void;
};
export type Survey = any;
export type Props = import('../../SDKEntry').SDKEntryProps;
export function useSurveyContext(): any;
export function useSurvey(): any;
/**
 * @param {Props} param0
 */
export function SurveyContextProvider({ surveyId, children, defaultLanguage, onClose }: Props): any;
