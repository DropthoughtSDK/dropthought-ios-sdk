import * as React from 'react';
import { Platform, View, Animated, Easing, StyleSheet } from 'react-native';
import useWindowDimensions from './useWindowDimensions';

const DefaultScreenWrapper = ({
  children,
  visible,
  isOnTop
}) => {
  const [localVisible, setLocalVisible] = React.useState(visible);
  const {
    width
  } = useWindowDimensions();
  const animatedValueRef = React.useRef(new Animated.Value(visible ? 0 : 1));
  React.useEffect(() => {
    Animated.timing(animatedValueRef.current, {
      toValue: visible ? isOnTop ? 0 : -0.3 : 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.quad
    }).start(() => {
      setLocalVisible(visible);
    });
  }, [visible, isOnTop]);
  return /*#__PURE__*/React.createElement(View, {
    style: StyleSheet.absoluteFill,
    collapsable: false,
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(Animated.View, {
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
  } = useWindowDimensions();
  const animatedValueRef = React.useRef(new Animated.Value(visible ? 0 : 1));
  React.useEffect(() => {
    Animated.timing(animatedValueRef.current, {
      toValue: visible || isOnTop ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.quad
    }).start(() => {
      setLocalVisible(visible);
    });
  }, [visible, isOnTop]);
  return /*#__PURE__*/React.createElement(View, {
    style: StyleSheet.absoluteFill,
    collapsable: false,
    pointerEvents: "box-none"
  }, /*#__PURE__*/React.createElement(Animated.View, {
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

export default Platform.select({
  android: AndroidScreenWrapper,
  default: DefaultScreenWrapper
});
const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  whiteBackground: {
    backgroundColor: 'white'
  }
});
//# sourceMappingURL=ScreenWrapper.js.map