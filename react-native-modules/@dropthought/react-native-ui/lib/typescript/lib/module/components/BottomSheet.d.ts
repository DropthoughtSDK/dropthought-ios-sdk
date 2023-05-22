export function NavigationComponent({ backgroundColor, disableOnConfirm, onCancel, onConfirm }: {
    backgroundColor?: string | undefined;
    disableOnConfirm?: boolean | undefined;
    onCancel: any;
    onConfirm: any;
}): React.CElement<import("react-native").ViewProps, View>;
export default BottomSheet;
import { View } from "react-native";
import React from "react";
declare function BottomSheet({ coverScreen, title, onBackdropPress, componentInside, componentHeight, navigationComponent, visible, children }: {
    coverScreen?: boolean | undefined;
    title: any;
    onBackdropPress: any;
    componentInside: any;
    componentHeight: any;
    navigationComponent: any;
    visible: any;
    children: any;
}): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.FunctionComponentElement<Animated.AnimatedProps<import("react-native").ViewProps & import("react-native/node_modules/@types/react").RefAttributes<View>>>;
import { Animated } from "react-native";
