import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import type { LayoutChangeEvent, PanResponderInstance, ViewStyle } from 'react-native';
import type { Dimensions, SliderProps, SliderState, CustomSliderProps, SliderContainerProps } from './types';
/**
 * @description  source code refrence: https://github.com/miblanchard/react-native-slider
 */
type RectReturn = {
    containsPoint: (nativeX: number, nativeY: number) => boolean;
    height: number;
    trackDistanceToPoint: (nativeX: number) => number;
    width: number;
    x: number;
    y: number;
};
export declare class Slider extends PureComponent<SliderProps, SliderState> {
    constructor(props: SliderProps);
    static defaultProps: {
        animationType: string;
        debugTouchArea: boolean;
        trackMarks: never[];
        maximumTrackTintColor: string;
        maximumValue: number;
        minimumTrackTintColor: string;
        minimumValue: number;
        step: number;
        thumbTintColor: string;
        trackClickable: boolean;
        value: number;
        vertical: boolean;
        startFromZero: boolean;
    };
    static getDerivedStateFromProps(props: SliderProps, state: SliderState): SliderState | undefined;
    componentDidUpdate(): void;
    _getRawValues(values: Array<Animated.Value> | Array<Animated.AnimatedInterpolation<number>>): any[];
    _handleStartShouldSetPanResponder: (e: any) => boolean;
    _handleMoveShouldSetPanResponder(): boolean;
    _handlePanResponderGrant: (e: {
        nativeEvent: any;
    }) => void;
    _handlePanResponderMove: (_e: any, gestureState: any) => void;
    _handlePanResponderRequestEnd: () => boolean;
    _handlePanResponderEnd: (_e: any, gestureState: any) => void;
    _measureContainer: (e: LayoutChangeEvent) => void;
    _measureTrack: (e: LayoutChangeEvent) => void;
    _measureThumb: (e: LayoutChangeEvent) => void;
    _handleMeasure: (name: '_containerSize' | '_trackSize' | '_thumbSize', e: LayoutChangeEvent) => void;
    _getRatio: (value: number) => number;
    _getThumbLeft: (value: number) => number;
    _getValue: (gestureState: {
        dx: number;
        dy: number;
    }) => number;
    _getCurrentValue: (thumbIndex?: number) => any;
    _setCurrentValue: (value: number, thumbIndex: number | null | undefined, callback?: () => void) => void;
    _setCurrentValueAnimated: (value: number, thumbIndex?: number) => void;
    _getTouchOverflowSize: () => {
        width: number;
        height: number;
    };
    _getTouchOverflowStyle: () => ViewStyle;
    _thumbHitTest: (e: {
        nativeEvent: any;
    }) => boolean;
    _getThumbTouchRect: (thumbIndex?: number) => RectReturn;
    _activeThumbIndex: number;
    _containerSize: Dimensions | null | undefined;
    _panResponder: PanResponderInstance;
    _previousLeft: number;
    _thumbSize: Dimensions | null | undefined;
    _trackSize: Dimensions | null | undefined;
    _renderDebugThumbTouchRect: (thumbLeft: Animated.AnimatedInterpolation<number>, index: number) => React.JSX.Element;
    _renderThumbImage: (thumbIndex?: number) => React.JSX.Element | null;
    render(): React.JSX.Element;
}
declare const SliderContainer: (props: SliderContainerProps) => React.JSX.Element;
declare const CustomSlider: (props: CustomSliderProps) => React.JSX.Element;
export { SliderContainer };
export default CustomSlider;
//# sourceMappingURL=index.d.ts.map