export var __esModule: boolean;
export default _default;
export type KeyboardAvoidingProps = {
    contentContainerStyle?: ViewStyle | undefined;
    style: ViewStyle;
    /**
     * - optional, the default behavior of this keyboard avoiding is to avoid the whole input box, but if you wish to have extra space to avoid
     */
    extraAvoidingSpace?: number | undefined;
};
export type ViewStyle = import('react-native').StyleProp<import('react-native').ViewStyle>;
export type ViewProps = import('react-native').ViewProps;
export type ScrollViewProps = import('react-native').ScrollViewProps;
export function useKeyboardListener(keyboardChangeHandler?: () => void): void;
export function useKeyboardAvoidingFocusedInputView(parentViewRef: any, extraAvoidingSpace?: number, insetBottom?: number): {
    keyboardHeight: any;
    handleScrollViewLayout: (event: any) => void;
    handleScrollViewContentSizeChange: (contentWidth: any, contentHeight: any) => void;
    handleScrollViewScroll: (event: any) => void;
};
/** @type {React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>} */
export const KeyboardAvoidingScrollView: React.FunctionComponent<KeyboardAvoidingProps & ScrollViewProps>;
declare function _default({ children, style, contentContainerStyle, extraAvoidingSpace, ...props }: {
    [x: string]: any;
    children: any;
    style: any;
    contentContainerStyle: any;
    extraAvoidingSpace?: number | undefined;
}): any;
