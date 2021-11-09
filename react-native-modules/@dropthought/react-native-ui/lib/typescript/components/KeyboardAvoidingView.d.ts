import React from 'react';
import { View, ViewProps, ScrollViewProps, ViewStyle } from 'react-native';
export declare const useKeyboardAvoidingFocusedInputView: (parentViewRef: {
    current?: View;
}, extraAvoidingSpace?: number) => {
    bottomHeight: number;
};
interface KeyboardAvoidingViewProps extends ViewProps {
    extraAvoidingSpace: number;
}
declare const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps>;
/**
 * @param {KeyboardAvoidingProps & ScrollViewProps} param0
 * @param {*} ref
 */
interface KeyboardAvoidingScrollViewProps extends ScrollViewProps {
    contentContainerStyle: ViewStyle;
    style: any;
    extraAvoidingSpace: number;
}
/** @type {React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>} */
export declare const KeyboardAvoidingScrollView: React.ForwardRefExoticComponent<KeyboardAvoidingScrollViewProps & React.RefAttributes<unknown>>;
export default KeyboardAvoidingView;
/**
 * @typedef {object} KeyboardAvoidingProps
 * @property {ViewStyle} contentContainerStyle
 * @property {ViewStyle} style
 * @property {number=} extraAvoidingSpace - optional, the default behavior of this keyboard avoiding is to avoid the whole input box, but if you wish to have extra space to avoid
 */
