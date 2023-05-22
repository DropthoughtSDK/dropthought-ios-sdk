"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _WheelPicker = _interopRequireDefault(require("./WheelPicker.styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WheelPickerItem = ({
  textStyle,
  style,
  height,
  option,
  index,
  visibleRest,
  currentScrollIndex,
  opacityFunction,
  rotationFunction
}) => {
  const relativeScrollIndex = _reactNative.Animated.subtract(index, currentScrollIndex);

  const translateY = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];

      for (let i = 1; i <= visibleRest + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }

      return range;
    })(),
    outputRange: (() => {
      const range = [0];

      for (let i = 1; i <= visibleRest + 1; i++) {
        let y = height / 2 * (1 - Math.sin(Math.PI / 2 - rotationFunction(i)));

        for (let j = 1; j < i; j++) {
          y += height * (1 - Math.sin(Math.PI / 2 - rotationFunction(j)));
        }

        range.unshift(y);
        range.push(-y);
      }

      return range;
    })()
  });
  const opacity = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];

      for (let i = 1; i <= visibleRest + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }

      return range;
    })(),
    outputRange: (() => {
      const range = [1];

      for (let x = 1; x <= visibleRest + 1; x++) {
        const y = opacityFunction(x);
        range.unshift(y);
        range.push(y);
      }

      return range;
    })()
  });
  const rotateX = relativeScrollIndex.interpolate({
    inputRange: (() => {
      const range = [0];

      for (let i = 1; i <= visibleRest + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }

      return range;
    })(),
    outputRange: (() => {
      const range = ['0deg'];

      for (let x = 1; x <= visibleRest + 1; x++) {
        const y = rotationFunction(x);
        range.unshift(`${y}deg`);
        range.push(`${y}deg`);
      }

      return range;
    })()
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [_WheelPicker.default.option, style, {
      height,
      opacity,
      transform: [{
        translateY
      }, {
        rotateX
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: textStyle,
    numberOfLines: 1
  }, option));
};

var _default = /*#__PURE__*/_react.default.memo(WheelPickerItem,
/**
 * We enforce that this component will not rerender after the initial render.
 * Therefore props that change on every render like style objects or functions
 * do not need to be wrapped into useMemo and useCallback.
 */
() => true);

exports.default = _default;
//# sourceMappingURL=WheelPickerItem.js.map