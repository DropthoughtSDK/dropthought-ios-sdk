function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useMemo, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useDraggableFlatListContext } from "../context/draggableFlatListContext";
import { isWeb } from "../constants";
import { useCellTranslate } from "../hooks/useCellTranslate";
import { typedMemo } from "../utils";
import { useRefs } from "../context/refContext";
import { useAnimatedValues } from "../context/animatedValueContext";
import CellProvider from "../context/cellContext";
import { useStableCallback } from "../hooks/useStableCallback";

function CellRendererComponent(props) {
  const {
    item,
    index,
    onLayout,
    children,
    ...rest
  } = props;
  const currentIndexAnim = useSharedValue(index);
  useEffect(() => {
    // If we set the index immediately the newly-ordered data can get out of sync
    // with the activeIndexAnim, and cause the wrong item to momentarily become the
    // "active item", which causes a flicker.
    requestAnimationFrame(() => {
      currentIndexAnim.value = index;
    });
  }, [index]);
  const viewRef = useRef(null);
  const {
    cellDataRef,
    propsRef,
    containerRef
  } = useRefs();
  const {
    horizontalAnim,
    scrollOffset
  } = useAnimatedValues();
  const {
    activeKey,
    keyExtractor,
    horizontal
  } = useDraggableFlatListContext();
  const key = keyExtractor(item, index);
  const offset = useSharedValue(-1);
  const size = useSharedValue(-1);
  const translate = useCellTranslate({
    cellOffset: offset,
    cellSize: size,
    cellIndex: currentIndexAnim
  });
  const indexRef = useRef(index);
  const indexHasChanged = index !== indexRef.current;
  indexRef.current = index;
  const dragInProgress = !!activeKey && !indexHasChanged;
  const isActive = dragInProgress && activeKey === key;
  const animStyle = useAnimatedStyle(() => {
    const _translate = dragInProgress ? translate.value : 0;

    return {
      transform: [horizontalAnim.value ? {
        translateX: _translate
      } : {
        translateY: _translate
      }]
    };
  }, [dragInProgress, translate]);
  const updateCellMeasurements = useStableCallback(() => {
    const onSuccess = (x, y, w, h) => {
      if (isWeb && horizontal) x += scrollOffset.value;
      const cellOffset = horizontal ? x : y;
      const cellSize = horizontal ? w : h;
      cellDataRef.current.set(key, {
        measurements: {
          size: cellSize,
          offset: cellOffset
        }
      });
      size.value = cellSize;
      offset.value = cellOffset;
    };

    const onFail = () => {
      var _propsRef$current;

      if ((_propsRef$current = propsRef.current) !== null && _propsRef$current !== void 0 && _propsRef$current.debug) {
        console.log(`## on measure fail, index: ${index}`);
      }
    };

    const containerNode = containerRef.current;
    const viewNode = viewRef.current;
    const nodeHandle = containerNode;

    if (viewNode && nodeHandle) {
      //@ts-ignore
      viewNode.measureLayout(nodeHandle, onSuccess, onFail);
    }
  });
  useEffect(() => {
    if (isWeb) {
      // onLayout isn't called on web when the cell index changes, so we manually re-measure
      requestAnimationFrame(() => {
        updateCellMeasurements();
      });
    }
  }, [index, updateCellMeasurements]);
  const onCellLayout = useStableCallback(e => {
    updateCellMeasurements();
    if (onLayout) onLayout(e);
  });
  const baseStyle = useMemo(() => {
    return {
      elevation: isActive ? 1 : 0,
      zIndex: isActive ? 999 : 0,
      flexDirection: horizontal ? "row" : "column"
    };
  }, [isActive, horizontal]); // changing zIndex may crash android, but seems to work ok as of RN 68:
  // https://github.com/facebook/react-native/issues/28751

  return /*#__PURE__*/React.createElement(Animated.View, _extends({}, rest, {
    ref: viewRef,
    onLayout: onCellLayout,
    style: [props.style, baseStyle, dragInProgress ? animStyle : {
      transform: []
    }],
    pointerEvents: activeKey ? "none" : "auto"
  }), /*#__PURE__*/React.createElement(CellProvider, {
    isActive: isActive
  }, children));
}

export default typedMemo(CellRendererComponent);
//# sourceMappingURL=CellRendererComponent.js.map