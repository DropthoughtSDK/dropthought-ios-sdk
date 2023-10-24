import React from 'react';
declare type ChooseIconProps = {
    isMultipleChoice: boolean;
    selected: boolean;
    themeColor: string;
};
export declare const ChooseIcon: ({ isMultipleChoice, selected, themeColor, }: ChooseIconProps) => JSX.Element;
declare type Props = {
    title: string;
    uri: string;
    isMultipleChoice: boolean;
    selected: boolean;
    columnGap: number;
    onPress: () => void;
    index: number;
    themeColor: string;
};
declare const _default: React.MemoExoticComponent<({ title, uri, isMultipleChoice, selected, columnGap, onPress, index, themeColor, }: Props) => JSX.Element>;
export default _default;
