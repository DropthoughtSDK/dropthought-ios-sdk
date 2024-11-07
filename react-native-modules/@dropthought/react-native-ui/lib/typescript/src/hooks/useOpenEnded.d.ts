import type { KeyboardTypeOptions } from 'react-native';
import type { Feedback, QuestionMetaDataType as TypeQuestionMetaDataType } from '../data';
declare const useOpenEnded: (feedback: Feedback, index?: number) => {
    metadataTypeKeyboard: (metadataType: TypeQuestionMetaDataType | undefined) => KeyboardTypeOptions | undefined;
    metadataTypeAutoCapitalize: (metadataType: TypeQuestionMetaDataType | undefined) => "none" | "words" | "sentences";
    text: string;
    isFocus: boolean;
    hasEdited: boolean;
    onChangeTextHandler: (textInput: string) => void;
    onEndEditingHandler: () => void;
    onFocus: () => void;
    onBlur: () => void;
};
export default useOpenEnded;
//# sourceMappingURL=useOpenEnded.d.ts.map