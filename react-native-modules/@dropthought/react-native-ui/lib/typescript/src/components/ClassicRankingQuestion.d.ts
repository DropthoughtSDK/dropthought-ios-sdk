import React from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion } from '../data';
import type { TransformedOption } from '../utils/react-native-draggable-list/DraggableList';
type Feedback = OriginFeedback & {
    listForRankingQuestion: TransformedOption[];
};
type Question = OriginQuestion & {
    options: string[];
    scale: string;
    allowNAForRanking: boolean;
};
type Props = {
    mandatoryErrorMessage: string;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    feedback: Feedback;
    themeColor: string;
    onDragGrant: () => void;
    onDragEnd: () => void;
};
declare const _default: React.MemoExoticComponent<({ mandatoryErrorMessage, question, onFeedback, forgot, feedback, themeColor, onDragGrant, onDragEnd, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=ClassicRankingQuestion.d.ts.map