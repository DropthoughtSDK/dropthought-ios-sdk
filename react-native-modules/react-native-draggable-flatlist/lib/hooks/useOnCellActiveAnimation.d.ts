import Animated from "react-native-reanimated";
declare type Params = {
    animationConfig: Partial<Animated.SpringConfig>;
};
export declare function useOnCellActiveAnimation({ animationConfig }?: Params): {
    isActive: boolean;
    onActiveAnim: Animated.Value<number>;
};
export {};
