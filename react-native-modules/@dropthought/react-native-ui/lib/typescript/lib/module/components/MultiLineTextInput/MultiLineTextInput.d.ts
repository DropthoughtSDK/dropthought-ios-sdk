export function metadataTypeKeyboard(metadataType: any): string;
export function metadataTypeAutoCapitalize(metadataType: any): "none" | "words" | "sentences";
export default MultiLineTextInput;
declare function MultiLineTextInput({ onEndEditingHandler, onChangeTextHandler, themeColor, feedback, question, anonymous, inputRef, showErrorHint, checked, onBlurHandler, onFocusHandler }: {
    onEndEditingHandler: any;
    onChangeTextHandler: any;
    themeColor: any;
    feedback: any;
    question: any;
    anonymous: any;
    inputRef: any;
    showErrorHint?: boolean | undefined;
    checked?: boolean | undefined;
    onBlurHandler?: (() => void) | undefined;
    onFocusHandler?: (() => void) | undefined;
}): React.FunctionComponentElement<{}>;
import React from "react";
