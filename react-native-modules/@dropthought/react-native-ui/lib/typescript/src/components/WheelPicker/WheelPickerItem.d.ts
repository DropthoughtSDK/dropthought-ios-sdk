import React from 'react';
import { Animated } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
interface ItemProps {
    textStyle: StyleProp<TextStyle>;
    style: StyleProp<ViewStyle>;
    option: string | null;
    height: number;
    index: number;
    currentScrollIndex: Animated.AnimatedAddition<number>;
    visibleRest: number;
    rotationFunction: (x: number) => number;
    opacityFunction: (x: number) => number;
}
declare const _default: React.NamedExoticComponent<ItemProps>;
export default _default;
//# sourceMappingURL=WheelPickerItem.d.ts.map