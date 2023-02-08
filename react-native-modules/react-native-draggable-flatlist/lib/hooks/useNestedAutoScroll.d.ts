import Animated from "react-native-reanimated";
import { State as GestureState } from "react-native-gesture-handler";
export declare function useNestedAutoScroll({ activeCellSize, autoscrollSpeed, autoscrollThreshold, hoverAnim, isDraggingCell, panGestureState, }: {
    activeCellSize?: Animated.Node<number>;
    autoscrollSpeed?: number;
    autoscrollThreshold?: number;
    hoverAnim?: Animated.Node<number>;
    isDraggingCell?: Animated.Node<number>;
    panGestureState?: Animated.Node<GestureState | number>;
}): Animated.Node<number>;
