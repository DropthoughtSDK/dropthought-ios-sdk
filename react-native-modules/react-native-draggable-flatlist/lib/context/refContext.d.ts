import React from "react";
import { FlatList, PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { CellData, DraggableFlatListProps } from "../types";
declare type RefContextValue<T> = {
    propsRef: React.MutableRefObject<DraggableFlatListProps<T>>;
    animationConfigRef: React.MutableRefObject<Animated.SpringConfig>;
    cellDataRef: React.MutableRefObject<Map<string, CellData>>;
    keyToIndexRef: React.MutableRefObject<Map<string, number>>;
    containerRef: React.RefObject<Animated.View>;
    flatListRef: React.RefObject<FlatList<T>> | React.ForwardedRef<FlatList<T>>;
    panGestureHandlerRef: React.RefObject<PanGestureHandler>;
    scrollOffsetRef: React.MutableRefObject<number>;
    isTouchActiveRef: React.MutableRefObject<{
        native: Animated.Value<number>;
        js: boolean;
    }>;
};
export default function RefProvider<T>({ children, flatListRef, }: {
    children: React.ReactNode;
    flatListRef: React.ForwardedRef<FlatList<T>>;
}): JSX.Element;
export declare function useRefs<T>(): RefContextValue<T>;
export {};
