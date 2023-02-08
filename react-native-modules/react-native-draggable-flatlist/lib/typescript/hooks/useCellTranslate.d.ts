import Animated from "react-native-reanimated";
declare type Params = {
    cellIndex: Animated.SharedValue<number>;
    cellSize: Animated.SharedValue<number>;
    cellOffset: Animated.SharedValue<number>;
};
export declare function useCellTranslate({ cellIndex, cellSize, cellOffset }: Params): Readonly<Animated.SharedValue<number>>;
export {};
