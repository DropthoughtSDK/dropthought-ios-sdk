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
import { assoc } from 'ramda';

type SurveyPageContextValue = {
  mandatoryQuestionTitleRefs: { [questionId: string]: any };
  addMandatoryQuestionTitleRef: (questionId: string, ref: any) => void;
};

const initialValue: SurveyPageContextValue = {
  mandatoryQuestionTitleRefs: {},
  addMandatoryQuestionTitleRef: () => undefined,
};

const SurveyPageContext: React.Context<SurveyPageContextValue> =
  React.createContext(initialValue);

type Props = {
  children: React.ReactNode;
};

export function SurveyPageProvider({ children }: Props) {
  const [mandatoryQuestionTitleRefs, setRefs] = React.useState({});

  const addMandatoryQuestionTitleRef = React.useCallback((questionId, ref) => {
    // update the refs map by setting the questionId to ref
    setRefs(assoc(questionId, ref));
  }, []);

  /** @type {SurveyPageContextValue} */
  const state = React.useMemo(
    () => ({
      mandatoryQuestionTitleRefs,
      addMandatoryQuestionTitleRef,
    }),
    [mandatoryQuestionTitleRefs, addMandatoryQuestionTitleRef]
  );

  return (
    <SurveyPageContext.Provider value={state}>
      {children}
    </SurveyPageContext.Provider>
  );
}

export const useSurveyPageContext = () => {
  return React.useContext(SurveyPageContext);
};

export const useAddMandatoryRef = () => {
  const { addMandatoryQuestionTitleRef } = useSurveyPageContext();
  return addMandatoryQuestionTitleRef;
};
