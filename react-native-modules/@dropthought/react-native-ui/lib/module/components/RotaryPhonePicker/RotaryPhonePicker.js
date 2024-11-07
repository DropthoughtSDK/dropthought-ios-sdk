function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useState, useRef } from 'react';
import { View, PanResponder, Animated, Image } from 'react-native';
import styles from './RotaryPhonePicker.styles';
import LottieView from 'lottie-react-native';
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
  const [radiusOfCenter, setRadiusOfCenter] = useState(0);
  const [container, setContainer] = useState({
    height: 0,
    width: 0
  });
  let renderAnim = useRef(new Animated.Value(selectedIndex * -45)).current;
  const renderAnimValue = useRef(selectedIndex * -45);
  let tempAnim = useRef(selectedIndex * -45).current;
  const offset = () => Math.trunc(container.width / 2) - radiusOfOrbiting;
  const panResponder = PanResponder.create({
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
      Animated.spring(renderAnim, {
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
  return /*#__PURE__*/React.createElement(View, _extends({
    style: styles.container
  }, panResponder.panHandlers), /*#__PURE__*/React.createElement(Animated.View, {
    onLayout: handleLayout,
    style: [styles.content, animatedStyles]
  }, list.map((value, index) => {
    return /*#__PURE__*/React.createElement(View, {
      accessibilityLabel: "dialer_icon",
      style: [styles.item, itemStyle(index)],
      key: index
    }, value !== '' && index <= numberScale ? /*#__PURE__*/React.createElement(LottieView, {
      source: value,
      autoPlay: true,
      style: styles.lottieContent
    }) : null);
  })), /*#__PURE__*/React.createElement(Image, {
    style: styles.cursor,
    source: require('../../assets/icOption6Cursor.png')
  }));
};
export default RotaryPhonePicker;
//# sourceMappingURL=RotaryPhonePicker.js.map