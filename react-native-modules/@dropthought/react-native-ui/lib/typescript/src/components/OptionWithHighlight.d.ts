import * as React from 'react';
import type { ViewStyle } from 'react-native';
export type Props = {
    type?: 'radio' | 'checkbox';
    id: any;
    containerStyle?: ViewStyle;
    title: string | React.ReactNode;
    checked: boolean;
    checkedColor?: string;
    onPress: (id: any) => void;
};
declare function OptionWithHighlight({ type, id: value, containerStyle: containerStyleFromProps, title, checked, checkedColor, onPress, }: Props): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof OptionWithHighlight>;
export default _default;
//# sourceMappingURL=OptionWithHighlight.d.ts.map