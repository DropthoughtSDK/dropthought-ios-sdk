export class Slider extends React.PureComponent<any, any, any> {
    static getDerivedStateFromProps(props: any, state: any): {} | undefined;
    constructor(props: any);
    _previousLeft: any;
    _activeThumbIndex: any;
    _panResponder: import("react-native").PanResponderInstance;
    _getRawValues(values: any): any;
    _handleMoveShouldSetPanResponder(): boolean;
}
export default CustomSlider;
import React from "react";
export function SliderContainer(props: any): React.CElement<import("react-native").ViewProps, View>;
declare function CustomSlider(props: any): React.FunctionComponentElement<any>;
import { View } from "react-native";
