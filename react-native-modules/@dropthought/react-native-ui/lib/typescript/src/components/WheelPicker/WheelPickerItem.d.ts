import React from 'react';
import { StyleProp, TextStyle, Animated, ViewStyle } from 'react-native';
interface ItemProps {
    textStyle: StyleProp<TextStyle>;
    style: StyleProp<ViewStyle>;
    option: string | null;
    height: number;
    index: number;
    currentScrollIndex: Animated.AnimatedAddition;
    visibleRest: number;
    rotationFunction: (x: number) => number;
    opacityFunction: (x: number) => number;
}
declare const _default: React.NamedExoticComponent<ItemProps>;
export default _default;
