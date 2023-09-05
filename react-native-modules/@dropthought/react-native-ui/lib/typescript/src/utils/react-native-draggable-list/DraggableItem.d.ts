import React from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';
declare type DraggableItemProps = {
    children: React.ReactNode;
    index: number;
    onDragStart: () => void;
    onDragGrant: () => void;
    onDrag: (pan: Animated.ValueXY, y: number) => void;
    onDragRelease: () => void;
    onDragEnd: (pan: Animated.ValueXY) => void;
    onLayout: (event: LayoutChangeEvent) => void;
    forceReset: boolean;
    movements: number;
    draggable: boolean;
};
declare function DraggableItem({ children, index, onDragStart, onDragGrant, onDrag, onDragRelease, onDragEnd, onLayout, forceReset, movements, draggable, }: DraggableItemProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DraggableItem>;
export default _default;
