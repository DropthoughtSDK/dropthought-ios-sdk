import React from 'react';
import { TextInput } from 'react-native';
import type { Question, Feedback } from '../../data';
interface Props {
    onEndEditingHandler?: () => void;
    onChangeTextHandler?: (t: string) => void;
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
