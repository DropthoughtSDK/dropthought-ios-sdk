"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _useWindowDimensions = _interopRequireDefault(require("./useWindowDimensions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DefaultScreenWrapper = ({
  children,
  visible,
  isOnTop
}) => {
  const [localVisible, setLocalVisible] = React.useState(visible);
  const {
    width
  } = (0, _useWindowDimensions.default)();
  const animatedValueRef = React.useRef(new _reactNative.Animated.Value(visible ? 0 : 1));
  React.useEffect(() => {
    _reactNative.Animated.timing(animatedValueRef.current, {
      toValue: visible ? isOnTop ? 0 : -0.3 : 1,
      duration: 300,
      useNativeDriver: true,
      easing: _reactNative.Easing.quad
    }).start(() => {
      setLocalVisible(visible);
    });
  }, [visible, isOnTop]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill,
    collapsable: false,
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.flexOne, styles.whiteBackground, {
      transform: [{
        translateX: animatedValueRef.current.interpolate({
          inputRange: [-1, 1],
          outputRange: [-1 * width, width],
          extrapolate: 'clamp'
        })
      }]
    }],
    collapsable: false
  }, visible || localVisible ? children : null));
};

const AndroidScreenWrapper = ({
  children,
  visible,
  isOnTop
}) => {
  const [localVisible, setLocalVisible] = React.useState(visible);
  const {
    height
  } = (0, _useWindowDimensions.default)();
  const animatedValueRef = React.useRef(new _reactNative.Animated.Value(visible ? 0 : 1));
  React.useEffect(() => {
    _reactNative.Animated.timing(animatedValueRef.current, {
      toValue: visible || isOnTop ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
      easing: _reactNative.Easing.quad
    }).start(() => {
      setLocalVisible(visible);
    });
  }, [visible, isOnTop]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill,
    collapsable: false,
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.flexOne, styles.whiteBackground, {
      transform: [{
        translateY: animatedValueRef.current.interpolate({
          inputRange: [-1, 1],
          outputRange: [-1 * height, height],
          extrapolate: 'clamp'
        })
      }]
    }],
    collapsable: false
  }, visible || localVisible ? children : null));
};

var _default = _reactNative.Platform.select({
  android: AndroidScreenWrapper,
  default: DefaultScreenWrapper
});

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  flexOne: {
    flex: 1
  },
  whiteBackground: {
    backgroundColor: 'white'
  }
});
//# sourceMappingURL=ScreenWrapper.js.map