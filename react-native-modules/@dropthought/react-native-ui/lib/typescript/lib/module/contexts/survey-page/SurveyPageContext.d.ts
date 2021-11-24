export function SurveyPageProvider({ children }: {
    children: any;
}): React.FunctionComponentElement<React.ProviderProps<{
    mandatoryQuestionTitleRefs: {};
    addMandatoryQuestionTitleRef: () => undefined;
}>>;
export function useSurveyPageContext(): {
    mandatoryQuestionTitleRefs: {};
    addMandatoryQuestionTitleRef: () => undefined;
};
export function useAddMandatoryRef(): () => undefined;
import * as React from "react";
