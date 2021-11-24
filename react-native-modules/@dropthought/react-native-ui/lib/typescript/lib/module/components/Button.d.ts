export default Button;
declare function Button({ title, disabled, width, containerStyle, color, ...props }: {
    [x: string]: any;
    title: any;
    disabled?: boolean | undefined;
    width: any;
    containerStyle: any;
    color?: string | undefined;
}): React.CElement<import("react-native").ViewProps, View>;
import { View } from "react-native";
import * as React from "react";
