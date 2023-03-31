declare var _default: React.MemoExoticComponent<typeof DraggableItem>;
export default _default;
declare function DraggableItem({ children, index, onDrag, onDragEnd, onLayout, forceReset, movements }: {
    children: any;
    index: any;
    onDrag: any;
    onDragEnd: any;
    onLayout: any;
    forceReset: any;
    movements: any;
}): React.FunctionComponentElement<Animated.AnimatedProps<import("react-native").ViewProps & import("react-native/node_modules/@types/react").RefAttributes<import("react-native").View>>>;
import React from "react";
import { Animated } from "react-native";
