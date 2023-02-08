import Animated, { Clock } from "react-native-reanimated";
declare type Params = {
    config: Partial<Animated.SpringConfig>;
};
export declare function useSpring({ config: configParam }?: Params): {
    clock: Clock;
    state: {
        finished: Animated.Value<number>;
        velocity: Animated.Value<number>;
        position: Animated.Value<number>;
        time: Animated.Value<number>;
    };
    config: Animated.SpringConfig;
};
export {};
