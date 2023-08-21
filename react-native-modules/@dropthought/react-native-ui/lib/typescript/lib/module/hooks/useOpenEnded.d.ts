export default useOpenEnded;
declare function useOpenEnded(feedback: any, index?: number): {
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
