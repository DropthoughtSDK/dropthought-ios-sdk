"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DraggableItem({
  children,
  index,
  onDragStart,
  onDrag,
  onDragEnd,
  onLayout,
  forceReset,
  movements,
  draggable
}) {
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const isDraggingRef = (0, _react.useRef)(false);
  const longPressTimeout = (0, _react.useRef)();
  const pan = (0, _react.useState)(new _reactNative.Animated.ValueXY())[0];
  const panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return draggable;
    },
    onPanResponderStart: (_e, _gestureState) => {
      onDragStart();
    },
    onPanResponderGrant: (_e, _gesture) => {
      longPressTimeout.current = setTimeout(() => {
        setIsDragging(true);
        isDraggingRef.current = true; //@ts-ignore

        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pan.setValue({
          x: 0,
          y: 0
        });
      }, 200);
    },
    onPanResponderMove: (_, gesture) => {
      if (isDraggingRef.current) {
        onDrag && onDrag(pan, gesture.dy);
      }
    },
    onPanResponderRelease: (_e, _gesture) => {
      if (longPressTimeout.current) {
        clearTimeout(longPressTimeout.current);
      }

      if (isDraggingRef.current) {
        setIsDragging(false);
        isDraggingRef.current = false;
        onDragEnd && onDragEnd(pan);
      }
    },

    onPanResponderTerminate(_e, _gestureState) {
      if (longPressTimeout.current) {
        clearTimeout(longPressTimeout.current);
      }
    }

  }));
  const shouldMoveRef = (0, _react.useRef)(movements);
  (0, _react.useEffect)(() => {
    if (shouldMoveRef.current !== 0 && movements === 0) {
      shouldMoveRef.current = movements;

      _reactNative.Animated.spring(pan, {
        toValue: {
          x: 0,
          y: movements
        },
        useNativeDriver: true
      }).start();
    } else if (shouldMoveRef.current === 0 && movements !== 0) {
      shouldMoveRef.current = movements;

      _reactNative.Animated.spring(pan, {
        toValue: {
          x: 0,
          y: movements
        },
        useNativeDriver: true
      }).start();
    }
  }, [pan, movements, index]);
  (0, _react.useEffect)(() => {
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
    opacity: isDragging ? 0.3 : 1
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({}, panResponder.current.panHandlers, {
    style: [panStyle, draggingStyle, {
      transform: pan.getTranslateTransform()
    }],
    onLayout: onLayout
  }), children);
}

var _default = /*#__PURE__*/_react.default.memo(DraggableItem);

exports.default = _default;
//# sourceMappingURL=DraggableItem.js.map