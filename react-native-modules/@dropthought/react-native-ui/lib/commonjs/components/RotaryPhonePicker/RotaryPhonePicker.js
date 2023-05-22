"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _RotaryPhonePicker = _interopRequireDefault(require("./RotaryPhonePicker.styles"));

var _lottieReactNative = _interopRequireDefault(require("lottie-react-native"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RotaryPhonePicker = ({
  list,
  scale = '5',
  selectedIndex,
  updateScore
}) => {
  const numberScale = Number(scale);
  const listLength = list.length;
  const deltaTheta = -360 / listLength;
  const radiusOfOrbiting = 30;
  const [radiusOfCenter, setRadiusOfCenter] = (0, _react.useState)(0);
  const [container, setContainer] = (0, _react.useState)({
    height: 0,
    width: 0
  });
  let renderAnim = (0, _react.useRef)(new _reactNative.Animated.Value(selectedIndex * -45)).current;
  const renderAnimValue = (0, _react.useRef)(selectedIndex * -45);
  let tempAnim = (0, _react.useRef)(selectedIndex * -45).current;

  const offset = () => Math.trunc(container.width / 2) - radiusOfOrbiting;

  const panResponder = _reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      tempAnim = renderAnimValue.current;
    },
    onPanResponderMove: (_event, gestureState) => {
      renderAnimValue.current = tempAnim + gestureState.dx;
      renderAnim.setValue(tempAnim + gestureState.dx);
    },
    onPanResponderRelease: () => {
      renderAnim.flattenOffset();
      const selectedCircle = Math.round(renderAnimValue.current / (360 / listLength));
      const circleValue = selectedCircle * 360 / listLength;
      const panSelectedIndex = selectedCircle * -1;
      const isOutOfScoreRange = panSelectedIndex <= 0 || panSelectedIndex > numberScale;
      const isAtCoverPage = selectedIndex === 0;

      if (isAtCoverPage && panSelectedIndex > 0) {
        updateScore(panSelectedIndex);
      } else if (!isOutOfScoreRange) {
        updateScore(panSelectedIndex);
      }

      let resetValue = 0;

      if (panSelectedIndex <= 0) {
        updateScore(1);
        resetValue = -45;
        renderAnimValue.current = resetValue;
      } else if (panSelectedIndex > numberScale) {
        updateScore(numberScale);
        resetValue = -45 * numberScale;
        renderAnimValue.current = resetValue;
      }

      _reactNative.Animated.spring(renderAnim, {
        toValue: isOutOfScoreRange ? resetValue : circleValue,
        velocity: 5,
        friction: 10,
        tension: 20,
        useNativeDriver: false
      }).start();
    }
  });

  const handleLayout = ({
    nativeEvent
  }) => {
    setRadiusOfCenter(nativeEvent.layout.width * 0.65);
    setContainer({
      height: nativeEvent.layout.height,
      width: nativeEvent.layout.width
    });
  };

  const rotateInterpolate = renderAnim.interpolate({
    inputRange: [-45, 0, 45],
    outputRange: ['-45deg', '0deg', '45deg']
  });
  const animatedStyles = {
    transform: [{
      rotate: rotateInterpolate
    }]
  };

  const itemStyle = index => {
    return {
      left: Math.sin(index * deltaTheta * Math.PI / 180 + Math.PI) * radiusOfCenter + offset(),
      top: Math.cos(index * deltaTheta * Math.PI / 180 + Math.PI) * radiusOfCenter + offset(),
      transform: [{
        rotate: `${45 * index}deg`
      }],
      opacity: selectedIndex === index ? 1 : 0.3
    };
  };

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: _RotaryPhonePicker.default.container
  }, panResponder.panHandlers), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    onLayout: handleLayout,
    style: [_RotaryPhonePicker.default.content, animatedStyles]
  }, list.map((value, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_RotaryPhonePicker.default.item, itemStyle(index)],
      key: index
    }, value !== '' && index <= numberScale ? /*#__PURE__*/_react.default.createElement(_lottieReactNative.default, {
      source: value,
      autoPlay: true
    }) : null);
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: _RotaryPhonePicker.default.cursor,
    source: require('../../assets/icOption6Cursor.png')
  }));
};

var _default = RotaryPhonePicker;
exports.default = _default;
//# sourceMappingURL=RotaryPhonePicker.js.map