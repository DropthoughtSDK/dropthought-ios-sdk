"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useWindowDimensions = _interopRequireDefault(require("./useWindowDimensions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DefaultScreenWrapper = ({
  children,
  visible,
  isOnTop,
  rtl
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
  const pageVector = rtl ? [width, -1 * width] : [-1 * width, width];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill,
    collapsable: false,
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.flexOne, styles.whiteBackground, {
      transform: [{
        translateX: animatedValueRef.current.interpolate({
          inputRange: [-1, 1],
          outputRange: pageVector,
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
var _default = exports.default = _reactNative.Platform.select({
  android: AndroidScreenWrapper,
  default: DefaultScreenWrapper
});
const styles = _reactNative.StyleSheet.create({
  flexOne: {
    flex: 1
  },
  whiteBackground: {
    backgroundColor: 'white'
  }
});
//# sourceMappingURL=ScreenWrapper.js.map