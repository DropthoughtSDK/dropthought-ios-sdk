import Animated from "react-native-reanimated";
declare type Params = {
    cellIndex: Animated.Value<number>;
    cellSize: Animated.Value<number>;
    cellOffset: Animated.Value<number>;
};
export declare function useCellTranslate({ cellIndex, cellSize, cellOffset }: Params): Animated.Value<number>;
export {};
