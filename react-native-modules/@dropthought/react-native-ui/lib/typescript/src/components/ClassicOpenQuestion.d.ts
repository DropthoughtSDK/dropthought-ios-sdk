import React from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import type { QuestionMetaDataType as TypeQuestionMetaDataType, Question, Feedback } from '../data';
export declare const metadataTypeKeyboard: (metadataType: TypeQuestionMetaDataType | undefined) => KeyboardTypeOptions | undefined;
export declare const metadataTypeAutoCapitalize: (metadataType: TypeQuestionMetaDataType | undefined) => "none" | "words" | "sentences";
type Props = {
    mandatoryErrorMessage: string;
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const OpenQuestion: ({ mandatoryErrorMessage, anonymous, question, onFeedback, feedback, forgot, themeColor, }: Props) => React.JSX.Element;
export default OpenQuestion;
//# sourceMappingURL=ClassicOpenQuestion.d.ts.map