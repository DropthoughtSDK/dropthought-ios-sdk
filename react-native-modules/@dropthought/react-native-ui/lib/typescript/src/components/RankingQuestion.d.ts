import React from 'react';
import type { Feedback as OriginFeedback, Question as OriginQuestion, Survey } from '../data';
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
    survey: Survey;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    forgot: boolean;
    feedback: Feedback;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ survey, question, onFeedback, forgot, feedback, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=RankingQuestion.d.ts.map