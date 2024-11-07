import React from 'react';
import type { ViewStyle } from 'react-native';
import type { Question } from '../data';
type Props = {
    forgot?: boolean;
    invalidMessage?: string;
    mandatoryErrorMessage: string;
    question: Question;
    subTitleMessage?: string;
    style?: ViewStyle;
};
declare const ClassicMandatoryTitle: ({ forgot, invalidMessage, mandatoryErrorMessage, question, subTitleMessage, style, }: Props) => React.JSX.Element;
export default ClassicMandatoryTitle;
//# sourceMappingURL=ClassicMandatoryTitle.d.ts.map