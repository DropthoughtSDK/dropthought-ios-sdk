import React from 'react';
import type { Question } from '../data';
declare type Props = {
    visible: boolean;
    question: Question;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    themeColor: string;
};
declare const ClassicDropdownOtherOptionInput: React.FC<Props>;
export default ClassicDropdownOtherOptionInput;
