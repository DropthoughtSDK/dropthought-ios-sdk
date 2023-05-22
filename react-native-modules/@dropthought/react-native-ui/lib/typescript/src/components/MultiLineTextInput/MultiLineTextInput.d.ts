import React from 'react';
import { TextInput, KeyboardTypeOptions } from 'react-native';
import type { Question, QuestionMetaDataType as TypeQuestionMetaDataType, Feedback } from '../../data';
export declare const metadataTypeKeyboard: (metadataType: TypeQuestionMetaDataType | undefined) => KeyboardTypeOptions | undefined;
export declare const metadataTypeAutoCapitalize: (metadataType: TypeQuestionMetaDataType | undefined) => "none" | "words" | "sentences";
interface Props {
    onEndEditingHandler?: () => void;
    onChangeTextHandler?: (t: string) => void;
    onBlurHandler?: () => void;
    onFocusHandler?: () => void;
    themeColor: string;
    feedback: Feedback;
    question: Question;
    anonymous?: boolean;
    inputRef?: React.RefObject<TextInput>;
    showErrorHint?: boolean;
    checked?: boolean;
}
declare const MultiLineTextInput: React.FC<Props>;
export default MultiLineTextInput;
