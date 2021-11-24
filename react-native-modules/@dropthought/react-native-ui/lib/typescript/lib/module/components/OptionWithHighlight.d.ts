declare var _default: React.MemoExoticComponent<typeof OptionWithHighlight>;
export default _default;
declare function OptionWithHighlight({ type, id: value, containerStyle: containerStyleFromProps, title, checked, checkedColor, onPress }: {
    type?: string | undefined;
    id: any;
    containerStyle: any;
    title: any;
    checked: any;
    checkedColor?: string | undefined;
    onPress?: ((_id: any) => undefined) | undefined;
}): React.CElement<import("react-native").TouchableOpacityProps, TouchableOpacity>;
import * as React from "react";
import { TouchableOpacity } from "react-native";
