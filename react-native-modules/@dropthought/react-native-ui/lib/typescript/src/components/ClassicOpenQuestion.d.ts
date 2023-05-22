import { KeyboardTypeOptions } from 'react-native';
import type { QuestionMetaDataType as TypeQuestionMetaDataType, Question, Feedback } from '../data';
export declare const metadataTypeKeyboard: (metadataType: TypeQuestionMetaDataType | undefined) => KeyboardTypeOptions | undefined;
export declare const metadataTypeAutoCapitalize: (metadataType: TypeQuestionMetaDataType | undefined) => "none" | "words" | "sentences";
declare type Props = {
    anonymous: boolean;
    question: Question;
    onFeedback: (feedback: Feedback) => void;
    feedback: Feedback;
    forgot: boolean;
    themeColor: string;
};
declare const OpenQuestion: ({ anonymous, question, onFeedback, feedback, forgot, themeColor, }: Props) => JSX.Element;
export default OpenQuestion;
