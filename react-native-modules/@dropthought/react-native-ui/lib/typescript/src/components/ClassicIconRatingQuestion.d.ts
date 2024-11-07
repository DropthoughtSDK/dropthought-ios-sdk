import React from 'react';
import type { Feedback as OriginFeedback, Question } from '../data';
type Feedback = OriginFeedback & {
    answers: string[];
};
type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    onFeedback: ({ questionId, answers, type, }: {
        questionId: string;
        answers: number[];
        type: string;
    }) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, feedback, forgot, onFeedback, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=ClassicIconRatingQuestion.d.ts.map