import React from 'react';
import type { Question, Feedback } from '../data';
import type { onPostPollChoiceType } from '../containers/SurveyScreenLayout';
type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback?: Feedback;
    forgot: boolean;
    onPostPollChoice: onPostPollChoiceType;
    isPostingPollChoice?: boolean;
};
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, feedback, onFeedback, forgot, onPostPollChoice, isPostingPollChoice, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=ClassicPollingQuestion.d.ts.map