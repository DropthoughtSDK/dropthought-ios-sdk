import React from 'react';
type ChooseIconProps = {
    isMultipleChoice: boolean;
    selected: boolean;
    themeColor: string;
};
export declare const ChooseIcon: ({ isMultipleChoice, selected, themeColor, }: ChooseIconProps) => React.JSX.Element;
type Props = {
    title: string;
    uri: string;
    isMultipleChoice: boolean;
    selected: boolean;
    columnGap: number;
    onPress: () => void;
    index: number;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ title, uri, isMultipleChoice, selected, columnGap, onPress, index, themeColor, }: Props) => React.JSX.Element>;
export default _default;
//# sourceMappingURL=PictureChoiceItem.d.ts.map