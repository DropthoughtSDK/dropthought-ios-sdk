export var __esModule: boolean;
export default _default;
declare function _default(feedback: any, index?: number): {
    metadataTypeKeyboard: (metadataType: any) => "numeric" | "default" | "phone-pad";
    metadataTypeAutoCapitalize: (metadataType: any) => "none" | "words" | "sentences";
    text: any;
    isFocus: boolean;
    hasEdited: boolean;
    onChangeTextHandler: (textInput: any) => void;
    onEndEditingHandler: () => void;
    onFocus: () => void;
    onBlur: () => void;
};
