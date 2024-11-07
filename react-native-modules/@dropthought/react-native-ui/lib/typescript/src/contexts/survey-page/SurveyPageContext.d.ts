/**
 * @description
 * this context keep the mandatory question title ref of a single survey page
 * they are saved in the mandatoryQuestionTitleRefs, as map:
 * {
 *     'question-id-1': ref1,
 *     'question-id-3': ref3,
 * }
 */
import * as React from 'react';
type SurveyPageContextValue = {
    mandatoryQuestionTitleRefs: {
        [questionId: string]: any;
    };
    addMandatoryQuestionTitleRef: (questionId: string, ref: any) => void;
};
type Props = {
    children: React.ReactNode;
};
export declare function SurveyPageProvider({ children }: Props): React.JSX.Element;
export declare const useSurveyPageContext: () => SurveyPageContextValue;
export declare const useAddMandatoryRef: () => (questionId: string, ref: any) => void;
export {};
//# sourceMappingURL=SurveyPageContext.d.ts.map