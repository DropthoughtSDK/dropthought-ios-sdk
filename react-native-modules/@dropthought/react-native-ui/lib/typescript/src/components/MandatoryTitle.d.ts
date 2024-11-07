import type { ViewStyle } from 'react-native';
import * as React from 'react';
import type { Question } from '../data';
type Props = {
    forgot?: boolean;
    invalidMessage?: string;
    mandatoryErrorMessage: string;
    question: Question;
    subTitleMessage?: string;
    style?: ViewStyle;
};
declare const MandatoryTitle: ({ forgot, invalidMessage, mandatoryErrorMessage, question, subTitleMessage, style, }: Props) => React.JSX.Element;
export default MandatoryTitle;
//# sourceMappingURL=MandatoryTitle.d.ts.map