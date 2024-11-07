import * as React from 'react';
import type { TouchableOpacityProps, ViewStyle } from 'react-native';
interface Props {
    title: string;
    width?: number;
    color?: string;
    containerStyle?: ViewStyle;
    disabled?: boolean;
}
declare const Button: ({ title, disabled, width, containerStyle, color, ...props }: Props & TouchableOpacityProps) => React.JSX.Element;
export default Button;
//# sourceMappingURL=Button.d.ts.map