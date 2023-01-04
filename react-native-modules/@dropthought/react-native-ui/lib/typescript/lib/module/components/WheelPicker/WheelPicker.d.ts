export default WheelPicker;
declare function WheelPicker({ selectedIndex, options, onChange, selectedIndicatorStyle, containerStyle, itemStyle, itemTextStyle, itemHeight, rotationFunction, opacityFunction, visibleRest, decelerationRate, containerProps }: {
    selectedIndex: any;
    options: any;
    onChange: any;
    selectedIndicatorStyle?: {} | undefined;
    containerStyle?: {} | undefined;
    itemStyle?: {} | undefined;
    itemTextStyle?: {} | undefined;
    itemHeight?: number | undefined;
    rotationFunction?: ((x: any) => number) | undefined;
    opacityFunction?: ((x: any) => number) | undefined;
    visibleRest?: number | undefined;
    decelerationRate?: string | undefined;
    containerProps?: {} | undefined;
}): React.CElement<import("react-native").ViewProps, View>;
import { View } from "react-native";
import React from "react";
