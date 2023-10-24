export function ChooseIcon({ isMultipleChoice, selected, themeColor }: {
    isMultipleChoice: any;
    selected: any;
    themeColor: any;
}): React.CElement<import("react-native").ViewProps, View> | React.CElement<import("react-native").ImageProps, Image>;
declare var _default: React.MemoExoticComponent<({ title, uri, isMultipleChoice, selected, columnGap, onPress, index, themeColor }: {
    title: any;
    uri: any;
    isMultipleChoice: any;
    selected: any;
    columnGap: any;
    onPress: any;
    index: any;
    themeColor: any;
}) => React.CElement<import("react-native").TouchableOpacityProps, TouchableOpacity>>;
export default _default;
import { View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
