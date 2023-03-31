import React from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';
declare type DraggableItemProps = {
    children: React.ReactNode;
    index: number;
    onDrag: (y: number) => void;
    onDragEnd: (pan: Animated.ValueXY) => void;
    onLayout: (event: LayoutChangeEvent) => void;
    forceReset: boolean;
    movements: number;
};
declare function DraggableItem({ children, index, onDrag, onDragEnd, onLayout, forceReset, movements, }: DraggableItemProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DraggableItem>;
export default _default;
