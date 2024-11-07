import React from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion } from '../data';
type Feedback = OriginFeedback & {
    answers: string[];
};
type Question = OriginQuestion & {
    options: string[];
    scale: string;
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
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, onFeedback, feedback, forgot, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=ClassicSliderRatingQuestion.d.ts.map