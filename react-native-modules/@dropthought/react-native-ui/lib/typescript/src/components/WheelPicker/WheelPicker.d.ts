import React from 'react';
import type { StyleProp, TextStyle, ViewStyle, ViewProps } from 'react-native';
interface Props {
    selectedIndex: number;
    options: string[];
    onChange: (index: number) => void;
    selectedIndicatorStyle?: StyleProp<ViewStyle>;
    itemTextStyle?: StyleProp<TextStyle>;
    itemStyle?: ViewStyle;
    itemHeight?: number;
    containerStyle?: ViewStyle;
    containerProps?: Omit<ViewProps, 'style'>;
    rotationFunction?: (x: number) => number;
    opacityFunction?: (x: number) => number;
    visibleRest?: number;
    decelerationRate?: 'normal' | 'fast' | number;
}
declare const WheelPicker: React.FC<Props>;
export default WheelPicker;
//# sourceMappingURL=WheelPicker.d.ts.map