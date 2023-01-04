"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _WheelPicker = _interopRequireDefault(require("./WheelPicker.styles"));

var _WheelPickerItem = _interopRequireDefault(require("./WheelPickerItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const WheelPicker = ({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  itemHeight = 40,
  rotationFunction = x => 1 - Math.pow(1 / 2, x),
  opacityFunction = x => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = 'fast',
  containerProps = {}
}) => {
  const flatListRef = (0, _react.useRef)(null);
  const [scrollY] = (0, _react.useState)(new _reactNative.Animated.Value(0));
  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = (0, _react.useMemo)(() => {
    const array = [...options];

    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }

    return array;
  }, [options, visibleRest]);
  const offsets = (0, _react.useMemo)(() => [...Array(paddedOptions.length)].map((_, i) => i * itemHeight), [paddedOptions, itemHeight]);
  const currentScrollIndex = (0, _react.useMemo)(() => _reactNative.Animated.add(_reactNative.Animated.divide(scrollY, itemHeight), visibleRest), [visibleRest, scrollY, itemHeight]);

  const handleMomentumScrollEnd = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    let index = Math.floor(Math.floor(offsetY) / itemHeight);
    const last = Math.floor(offsetY % itemHeight);
    if (last > itemHeight / 2) index++;

    if (index !== selectedIndex) {
      onChange(index);
    }
  };
  /**
   * If selectedIndex is changed from outside (not via onChange) we need to scroll to the specified index.
   * This ensures that what the user sees as selected in the picker always corresponds to the value state.
   */


  (0, _react.useEffect)(() => {
    var _flatListRef$current;

    (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 ? void 0 : _flatListRef$current.scrollToIndex({
      index: selectedIndex,
      animated: false
    });
  }, [selectedIndex]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: [_WheelPicker.default.container, {
      height: containerHeight
    }, containerStyle]
  }, containerProps), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_WheelPicker.default.selectedIndicator, selectedIndicatorStyle, {
      transform: [{
        translateY: -itemHeight / 2
      }],
      height: itemHeight
    }]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.FlatList, {
    ref: flatListRef,
    style: _WheelPicker.default.scrollView,
    showsVerticalScrollIndicator: false,
    onScroll: _reactNative.Animated.event([{
      nativeEvent: {
        contentOffset: {
          y: scrollY
        }
      }
    }], {
      useNativeDriver: true
    }),
    onMomentumScrollEnd: handleMomentumScrollEnd,
    snapToOffsets: offsets,
    decelerationRate: decelerationRate,
    initialScrollIndex: selectedIndex,
    getItemLayout: (_, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index
    }),
    data: paddedOptions,
    keyExtractor: (_, index) => index.toString(),
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/_react.default.createElement(_WheelPickerItem.default, {
      key: `option-${index}`,
      index: index,
      option: item,
      style: itemStyle,
      textStyle: itemTextStyle,
      height: itemHeight,
      currentScrollIndex: currentScrollIndex,
      rotationFunction: rotationFunction,
      opacityFunction: opacityFunction,
      visibleRest: visibleRest
    })
  }));
};

var _default = WheelPicker;
exports.default = _default;
//# sourceMappingURL=WheelPicker.js.map