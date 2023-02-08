function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedReaction, useAnimatedScrollHandler, useSharedValue, withSpring } from "react-native-reanimated";
import CellRendererComponent from "./CellRendererComponent";
import { DEFAULT_PROPS, isWeb } from "../constants";
import PlaceholderItem from "./PlaceholderItem";
import RowItem from "./RowItem";
import PropsProvider from "../context/propsContext";
import AnimatedValueProvider, { useAnimatedValues } from "../context/animatedValueContext";
import RefProvider, { useRefs } from "../context/refContext";
import DraggableFlatListProvider from "../context/draggableFlatListContext";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { useStableCallback } from "../hooks/useStableCallback";
import ScrollOffsetListener from "./ScrollOffsetListener";
import { typedMemo } from "../utils";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function DraggableFlatListInner(props) {
  const {
    cellDataRef,
    containerRef,
    flatlistRef,
    keyToIndexRef,
    propsRef,
    animationConfigRef
  } = useRefs();
  const {
    activeCellOffset,
    activeCellSize,
    activeIndexAnim,
    containerSize,
    scrollOffset,
    scrollViewSize,
    spacerIndexAnim,
    horizontalAnim,
    placeholderOffset,
    touchTranslate,
    autoScrollDistance,
    panGestureState,
    isTouchActiveNative,
    disabled
  } = useAnimatedValues();
  const {
    dragHitSlop = DEFAULT_PROPS.dragHitSlop,
    scrollEnabled = DEFAULT_PROPS.scrollEnabled,
    activationDistance: activationDistanceProp = DEFAULT_PROPS.activationDistance
  } = props;
  const [activeKey, setActiveKey] = useState(null);
  const keyExtractor = useStableCallback((item, index) => {
    if (!props.keyExtractor) {
      throw new Error("You must provide a keyExtractor to DraggableFlatList");
    }

    return props.keyExtractor(item, index);
  });
  useLayoutEffect(() => {
    props.data.forEach((d, i) => {
      const key = keyExtractor(d, i);
      keyToIndexRef.current.set(key, i);
    });
  }, [props.data, keyExtractor, keyToIndexRef]); // Reset hover state whenever data changes

  useMemo(() => {
    requestAnimationFrame(() => {
      activeIndexAnim.value = -1;
      spacerIndexAnim.value = -1;
      touchTranslate.value = 0;
      activeCellSize.value = -1;
      activeCellOffset.value = -1;
    });
  }, [props.data]);
  const drag = useStableCallback(activeKey => {
    if (disabled.value) return;
    const index = keyToIndexRef.current.get(activeKey);
    const cellData = cellDataRef.current.get(activeKey);

    if (cellData) {
      activeCellOffset.value = cellData.measurements.offset;
      activeCellSize.value = cellData.measurements.size;
    }

    const {
      onDragBegin
    } = propsRef.current;

    if (index !== undefined) {
      spacerIndexAnim.value = index;
      activeIndexAnim.value = index;
      setActiveKey(activeKey);
      onDragBegin === null || onDragBegin === void 0 ? void 0 : onDragBegin(index);
    }
  });

  const onContainerLayout = _ref => {
    var _props$onContainerLay;

    let {
      nativeEvent: {
        layout
      }
    } = _ref;
    const {
      width,
      height
    } = layout;
    containerSize.value = props.horizontal ? width : height;
    (_props$onContainerLay = props.onContainerLayout) === null || _props$onContainerLay === void 0 ? void 0 : _props$onContainerLay.call(props, {
      layout,
      containerRef
    });
  };

  const onListContentSizeChange = (w, h) => {
    var _props$onContentSizeC;

    scrollViewSize.value = props.horizontal ? w : h;
    (_props$onContentSizeC = props.onContentSizeChange) === null || _props$onContentSizeC === void 0 ? void 0 : _props$onContentSizeC.call(props, w, h);
  };

  const onContainerTouchStart = () => {
    if (!disabled.value) {
      isTouchActiveNative.value = true;
    }

    return false;
  };

  const onContainerTouchEnd = () => {
    isTouchActiveNative.value = false;
  };

  const extraData = useMemo(() => ({
    activeKey,
    extraData: props.extraData
  }), [activeKey, props.extraData]);
  const renderItem = useCallback(_ref2 => {
    let {
      item,
      index
    } = _ref2;
    const key = keyExtractor(item, index);

    if (index !== keyToIndexRef.current.get(key)) {
      keyToIndexRef.current.set(key, index);
    }

    return /*#__PURE__*/React.createElement(RowItem, {
      item: item,
      itemKey: key,
      renderItem: props.renderItem,
      drag: drag,
      extraData: props.extraData
    });
  }, [props.renderItem, props.extraData, drag, keyExtractor]);
  const onRelease = useStableCallback(index => {
    var _props$onRelease;

    (_props$onRelease = props.onRelease) === null || _props$onRelease === void 0 ? void 0 : _props$onRelease.call(props, index);
  });
  const onDragEnd = useStableCallback(_ref3 => {
    let {
      from,
      to
    } = _ref3;
    const {
      onDragEnd,
      data
    } = props;

    if (onDragEnd) {
      const newData = [...data];

      if (from !== to) {
        newData.splice(from, 1);
        newData.splice(to, 0, data[from]);
      }

      onDragEnd({
        from,
        to,
        data: newData
      });

      if (isWeb) {
        // prevent flicker
        setActiveKey(null);
      } else {
        requestAnimationFrame(() => {
          setActiveKey(null);
        });
      }
    }
  }); // Handle case where user ends drag without moving their finger.

  useAnimatedReaction(() => {
    return isTouchActiveNative.value;
  }, (cur, prev) => {
    if (cur !== prev && !cur) {
      const hasMoved = !!touchTranslate.value;

      if (!hasMoved && activeIndexAnim.value >= 0 && !disabled.value) {
        runOnJS(onDragEnd)({
          from: activeIndexAnim.value,
          to: spacerIndexAnim.value
        });
      }
    }
  }, [isTouchActiveNative, onDragEnd]);
  const gestureDisabled = useSharedValue(false);
  const panGesture = Gesture.Pan().onBegin(evt => {
    gestureDisabled.value = disabled.value;
    if (gestureDisabled.value) return;
    panGestureState.value = evt.state;
  }).onUpdate(evt => {
    if (gestureDisabled.value) return;
    panGestureState.value = evt.state;
    const translation = horizontalAnim.value ? evt.translationX : evt.translationY;
    touchTranslate.value = translation;
  }).onEnd(evt => {
    if (gestureDisabled.value) return; // Set touch val to current translate val

    isTouchActiveNative.value = false;
    const translation = horizontalAnim.value ? evt.translationX : evt.translationY;
    touchTranslate.value = translation + autoScrollDistance.value;
    panGestureState.value = evt.state; // Only call onDragEnd if actually dragging a cell

    if (activeIndexAnim.value === -1 || disabled.value) return;
    disabled.value = true;
    runOnJS(onRelease)(activeIndexAnim.value);
    const springTo = placeholderOffset.value - activeCellOffset.value;
    touchTranslate.value = withSpring(springTo, animationConfigRef.current, () => {
      runOnJS(onDragEnd)({
        from: activeIndexAnim.value,
        to: spacerIndexAnim.value
      });
      disabled.value = false;
    });
  }).onTouchesDown(() => {
    runOnJS(onContainerTouchStart)();
  }).onTouchesUp(() => {
    // Turning this into a worklet causes timing issues. We want it to run
    // just after the finger lifts.
    runOnJS(onContainerTouchEnd)();
  });
  if (props.hitSlop) panGesture.hitSlop(props.hitSlop);

  if (activationDistanceProp) {
    const activeOffset = [-activationDistanceProp, activationDistanceProp];

    if (props.horizontal) {
      panGesture.activeOffsetX(activeOffset);
    } else {
      panGesture.activeOffsetY(activeOffset);
    }
  }

  const onScroll = useStableCallback(scrollOffset => {
    var _props$onScrollOffset;

    (_props$onScrollOffset = props.onScrollOffsetChange) === null || _props$onScrollOffset === void 0 ? void 0 : _props$onScrollOffset.call(props, scrollOffset);
  });
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: evt => {
      scrollOffset.value = horizontalAnim.value ? evt.contentOffset.x : evt.contentOffset.y;
      runOnJS(onScroll)(scrollOffset.value);
    }
  }, [horizontalAnim]);
  useAutoScroll();
  return /*#__PURE__*/React.createElement(DraggableFlatListProvider, {
    activeKey: activeKey,
    keyExtractor: keyExtractor,
    horizontal: !!props.horizontal
  }, /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: panGesture
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: props.containerStyle,
    ref: containerRef,
    onLayout: onContainerLayout
  }, props.renderPlaceholder && /*#__PURE__*/React.createElement(PlaceholderItem, {
    renderPlaceholder: props.renderPlaceholder
  }), /*#__PURE__*/React.createElement(AnimatedFlatList, _extends({}, props, {
    data: props.data,
    CellRendererComponent: CellRendererComponent,
    ref: flatlistRef,
    onContentSizeChange: onListContentSizeChange,
    scrollEnabled: !activeKey && scrollEnabled,
    renderItem: renderItem,
    extraData: extraData,
    keyExtractor: keyExtractor,
    onScroll: scrollHandler,
    scrollEventThrottle: 16,
    simultaneousHandlers: props.simultaneousHandlers,
    removeClippedSubviews: false
  })), !!props.onScrollOffsetChange && /*#__PURE__*/React.createElement(ScrollOffsetListener, {
    onScrollOffsetChange: props.onScrollOffsetChange,
    scrollOffset: scrollOffset
  }))));
}

function DraggableFlatList(props, ref) {
  return /*#__PURE__*/React.createElement(PropsProvider, props, /*#__PURE__*/React.createElement(AnimatedValueProvider, null, /*#__PURE__*/React.createElement(RefProvider, {
    flatListRef: ref
  }, /*#__PURE__*/React.createElement(MemoizedInner, props))));
}

const MemoizedInner = typedMemo(DraggableFlatListInner); // Generic forwarded ref type assertion taken from:
// https://fettblog.eu/typescript-react-generic-forward-refs/#option-1%3A-type-assertion

export default /*#__PURE__*/React.forwardRef(DraggableFlatList);
//# sourceMappingURL=DraggableFlatList.js.map