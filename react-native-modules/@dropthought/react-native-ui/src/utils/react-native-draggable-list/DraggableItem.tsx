import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';

type DraggableItemProps = {
  children: React.ReactNode;
  index: number;
  onDragStart: () => void;
  onDragGrant: () => void;
  onDrag: (pan: Animated.ValueXY, y: number) => void;
  onDragRelease: () => void;
  onDragEnd: (pan: Animated.ValueXY) => void;
  onLayout: (event: LayoutChangeEvent) => void;
  forceReset: boolean;
  movements: number;
  draggable: boolean;
};

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
  draggable,
}: DraggableItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isDraggingRef = useRef(false);

  const longPressTimeout = useRef<NodeJS.Timeout>();

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
  const panResponder = useRef(
    PanResponder.create({
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
          pan.setOffset({ x: pan.x._value, y: pan.y._value });
          pan.setValue({ x: 0, y: 0 });
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
      },
    })
  );

  const shouldMoveRef = useRef(movements);
  useEffect(() => {
    if (shouldMoveRef.current !== 0 && movements === 0) {
      shouldMoveRef.current = movements;
      Animated.spring(pan, {
        toValue: { x: 0, y: movements },
        useNativeDriver: true,
      }).start();
    } else if (shouldMoveRef.current === 0 && movements !== 0) {
      shouldMoveRef.current = movements;
      Animated.spring(pan, {
        toValue: { x: 0, y: movements },
        useNativeDriver: true,
      }).start();
    }
  }, [pan, movements, index]);

  useEffect(() => {
    if (forceReset) {
      pan.setValue({ x: 0, y: 0 });
    }
  }, [forceReset, pan]);

  const panStyle = {
    transform: pan.getTranslateTransform(),
    zIndex: 0,
  };

  const draggingStyle = {
    zIndex: isDragging ? 2 : 0,
    opacity: isPressed ? 0.3 : 1,
    transform: [
      ...pan.getTranslateTransform(),
      {
        scale: isDragging ? 1.1 : 1,
      },
    ],
  };
  return (
    <Animated.View
      {...panResponder.current.panHandlers}
      style={[panStyle, draggingStyle]}
      onLayout={onLayout}
    >
      {children}
    </Animated.View>
  );
}

export default React.memo(DraggableItem);
