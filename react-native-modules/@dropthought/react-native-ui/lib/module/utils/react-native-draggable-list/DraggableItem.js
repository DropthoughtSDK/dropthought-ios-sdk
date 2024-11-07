function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
function DraggableItem({
  children,
  index,
  onDragStart,
  onDragGrant,
  onDrag,
  onDragRelease,
  onDragEnd,
  onLayout,
  forceReset,
  movements,
  draggable
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isDraggingRef = useRef(false);
  const longPressTimeout = useRef();
  const pan = useState(new Animated.ValueXY())[0];
  const onClear = () => {
    setIsPressed(false);
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      onDragRelease && onDragRelease();
    }
    if (isDraggingRef.current) {
      setIsDragging(false);
      isDraggingRef.current = false;
      onDragEnd && onDragEnd(pan);
    }
  };
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return draggable;
    },
    onPanResponderStart: (_e, _gestureState) => {
      setIsPressed(true);
      onDragStart();
    },
    onPanResponderGrant: (_e, _gesture) => {
      longPressTimeout.current = setTimeout(() => {
        onDragGrant && onDragGrant();
        setIsDragging(true);
        isDraggingRef.current = true;
        //@ts-ignore
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pan.setValue({
          x: 0,
          y: 0
        });
      }, 500);
    },
    onPanResponderMove: (_, gesture) => {
      if (isDraggingRef.current) {
        onDrag && onDrag(pan, gesture.dy);
      }
    },
    onPanResponderRelease: (_e, _gesture) => {
      onClear();
    },
    onPanResponderTerminate(_e, _gestureState) {
      onClear();
    }
  }));
  const shouldMoveRef = useRef(movements);
  useEffect(() => {
    if (shouldMoveRef.current !== 0 && movements === 0) {
      shouldMoveRef.current = movements;
      Animated.spring(pan, {
        toValue: {
          x: 0,
          y: movements
        },
        useNativeDriver: true
      }).start();
    } else if (shouldMoveRef.current === 0 && movements !== 0) {
      shouldMoveRef.current = movements;
      Animated.spring(pan, {
        toValue: {
          x: 0,
          y: movements
        },
        useNativeDriver: true
      }).start();
    }
  }, [pan, movements, index]);
  useEffect(() => {
    if (forceReset) {
      pan.setValue({
        x: 0,
        y: 0
      });
    }
  }, [forceReset, pan]);
  const panStyle = {
    transform: pan.getTranslateTransform(),
    zIndex: 0
  };
  const draggingStyle = {
    zIndex: isDragging ? 2 : 0,
    opacity: isPressed ? 0.3 : 1,
    transform: [...pan.getTranslateTransform(), {
      scale: isDragging ? 1.1 : 1
    }]
  };
  return /*#__PURE__*/React.createElement(Animated.View, _extends({}, panResponder.current.panHandlers, {
    style: [panStyle, draggingStyle],
    onLayout: onLayout
  }), children);
}
export default /*#__PURE__*/React.memo(DraggableItem);
//# sourceMappingURL=DraggableItem.js.map