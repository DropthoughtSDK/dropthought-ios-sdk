export function useKeyboardListener(keyboardChangeHandler?: () => void): void;
export function useKeyboardAvoidingFocusedInputView(parentViewRef: any, extraAvoidingSpace?: number, insetBottom?: number): {
    keyboardHeight: number;
    handleScrollViewLayout: (event: any) => void;
    handleScrollViewContentSizeChange: (contentWidth: any, contentHeight: any) => void;
    handleScrollViewScroll: (event: any) => void;
};
/** @type {React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>} */
export const KeyboardAvoidingScrollView: React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>;
export default KeyboardAvoidingView;
export type KeyboardAvoidingProps = {
    contentContainerStyle: ViewStyle;
    style: ViewStyle;
    /**
     * - optional, the default behavior of this keyboard avoiding is to avoid the whole input box, but if you wish to have extra space to avoid
     */
    extraAvoidingSpace?: number | undefined;
};
export type ViewStyle = import('react-native').StyleProp<import('react-native').ViewStyle>;
export type ViewProps = import('react-native').ViewProps;
export type ScrollViewProps = import('react-native').ScrollViewProps;
import React from "react";
/**
 * @type {React.FunctionComponent<KeyboardAvoidingProps & ViewProps>}
 * @param {KeyboardAvoidingProps & ViewProps} param0
 */
declare const KeyboardAvoidingView: React.FunctionComponent<KeyboardAvoidingProps & ViewProps>;
