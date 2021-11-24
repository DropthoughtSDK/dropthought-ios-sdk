import * as React from 'react';
import { ViewStyle } from 'react-native';
export declare type Props = {
    type?: 'radio' | 'checkbox';
    id: any;
    containerStyle?: ViewStyle;
    title: string | React.ReactNode;
    checked: boolean;
    checkedColor?: string;
    onPress: (id: any) => void;
};
declare function OptionWithHighlight({ type, id: value, containerStyle: containerStyleFromProps, title, checked, checkedColor, onPress, }: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof OptionWithHighlight>;
export default _default;
