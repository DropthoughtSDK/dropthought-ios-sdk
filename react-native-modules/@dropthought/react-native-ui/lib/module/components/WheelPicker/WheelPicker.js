function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import styles from './WheelPicker.styles';
import WheelPickerItem from './WheelPickerItem';
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
  const flatListRef = useRef(null);
  const [scrollY] = useState(new Animated.Value(0));
  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = useMemo(() => {
    const array = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);
  const offsets = useMemo(() => [...Array(paddedOptions.length)].map((_, i) => i * itemHeight), [paddedOptions, itemHeight]);
  const currentScrollIndex = useMemo(() => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest), [visibleRest, scrollY, itemHeight]);
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
  useEffect(() => {
    var _flatListRef$current;
    (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 || _flatListRef$current.scrollToIndex({
      index: selectedIndex,
      animated: false
    });
  }, [selectedIndex]);
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [styles.container, {
      height: containerHeight
    }, containerStyle]
  }, containerProps), /*#__PURE__*/React.createElement(View, {
    style: [styles.selectedIndicator, selectedIndicatorStyle, {
      transform: [{
        translateY: -itemHeight / 2
      }],
      height: itemHeight
    }]
  }), /*#__PURE__*/React.createElement(Animated.FlatList, {
    ref: flatListRef,
    style: styles.scrollView,
    showsVerticalScrollIndicator: false,
    onScroll: Animated.event([{
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
    initialScrollIndex: selectedIndex
    // @ts-ignore
    ,
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
    }) => /*#__PURE__*/React.createElement(View, {
      accessibilityLabel: `selected_${options[selectedIndex] === item}`
    }, /*#__PURE__*/React.createElement(WheelPickerItem, {
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
    }))
  }));
};
export default WheelPicker;
//# sourceMappingURL=WheelPicker.js.map