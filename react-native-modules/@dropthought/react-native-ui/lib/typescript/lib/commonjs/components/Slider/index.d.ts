export var __esModule: boolean;
export default _default;
declare const Slider_base: any;
export class Slider extends Slider_base {
    [x: string]: any;
    static getDerivedStateFromProps(props: any, state: any): {} | undefined;
    constructor(props: any);
    _previousLeft: any;
    _activeThumbIndex: any;
    _panResponder: _reactNative.PanResponderInstance;
    state: {
        allMeasured: boolean;
        containerSize: {
            width: number;
            height: number;
        };
        thumbSize: {
            width: number;
            height: number;
        };
        trackMarksValues: any;
        values: any;
    };
    componentDidUpdate(): void;
    _getRawValues(values: any): any;
    _handleMoveShouldSetPanResponder(): boolean;
    render(): any;
}
export function SliderContainer(props: any): any;
declare function _default(props: any): any;
import _reactNative = require("react-native");
