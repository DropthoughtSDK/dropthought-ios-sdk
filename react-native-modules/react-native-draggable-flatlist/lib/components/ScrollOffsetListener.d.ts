import Animated from "react-native-reanimated";
declare type Props = {
    scrollOffset: Animated.Value<number>;
    onScrollOffsetChange: (offset: readonly number[]) => void;
};
declare const _default: ({ scrollOffset, onScrollOffsetChange, }: Props) => null;
export default _default;
