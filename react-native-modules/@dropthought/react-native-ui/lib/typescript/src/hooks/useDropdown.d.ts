/// <reference types="react" />
import type { Question, Feedback } from '../data';
declare const useDropdown: (question: Question, feedback: Feedback, onFeedback: (feedback: Feedback) => void) => {
    selectedOptionIndexCache: number | undefined;
    setSelectedOptionIndexCache: import("react").Dispatch<import("react").SetStateAction<number | undefined>>;
    currentSelectedOption: import("../utils/data").TransformOptionType | undefined;
    invalidMessage: string | undefined;
    bottomSheetVisible: boolean;
    optionLabel: string;
    renderList: import("../utils/data").TransformOptionType[];
    otherText: string;
    onChangeOtherText: (text: string) => void;
    onChangeSearchText: (text: string) => void;
    onCloseBottomSheet: () => void;
    onOpenBottomSheet: () => void;
    onConfirm: () => void;
    onCancel: () => void;
};
export default useDropdown;
