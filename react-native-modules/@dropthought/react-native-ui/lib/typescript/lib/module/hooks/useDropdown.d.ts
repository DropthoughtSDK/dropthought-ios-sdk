export default useDropdown;
declare function useDropdown(question: any, feedback: any, onFeedback: any): {
    selectedOptionIndexCache: undefined;
    setSelectedOptionIndexCache: import("react").Dispatch<import("react").SetStateAction<undefined>>;
    currentSelectedOption: any;
    invalidMessage: any;
    bottomSheetVisible: boolean;
    optionLabel: any;
    renderList: any;
    otherText: string;
    onChangeOtherText: (text: any) => void;
    onChangeSearchText: (text: any) => void;
    onCloseBottomSheet: () => void;
    onOpenBottomSheet: () => void;
    onConfirm: () => void;
    onCancel: () => void;
};
