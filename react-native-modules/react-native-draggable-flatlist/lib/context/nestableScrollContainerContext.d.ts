import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
export declare function NestableScrollContainerProvider({ children, }: {
    children: React.ReactNode;
}): JSX.Element;
export declare function useNestableScrollContainerContext(): {
    outerScrollEnabled: boolean;
    setOuterScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    outerScrollOffset: Animated.Value<number>;
    scrollViewSize: Animated.Value<number>;
    scrollableRef: React.RefObject<ScrollView>;
    containerRef: React.RefObject<Animated.View>;
    containerSize: Animated.Value<number>;
};
