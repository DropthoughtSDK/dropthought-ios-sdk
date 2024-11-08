import * as React from 'react';
import { Platform, View, Animated, Easing, StyleSheet } from 'react-native';
import useWindowDimensions from './useWindowDimensions';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  isOnTop: boolean;
  rtl: boolean;
};

const DefaultScreenWrapper: React.FunctionComponent<Props> = ({
  children,
  visible,
  isOnTop,
  rtl,
}) => {
  const [localVisible, setLocalVisible] = React.useState(visible);
  const { width } = useWindowDimensions();
  const animatedValueRef = React.useRef(new Animated.Value(visible ? 0 : 1));

  React.useEffect(() => {
    Animated.timing(animatedValueRef.current, {
      toValue: visible ? (isOnTop ? 0 : -0.3) : 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start(() => {
      setLocalVisible(visible);
    });
  }, [visible, isOnTop]);
  const pageVector = rtl ? [width, -1 * width] : [-1 * width, width];

  return (
    <View
      style={StyleSheet.absoluteFill}
      collapsable={false}
      pointerEvents="box-none"
    >
      <Animated.View
        style={[
          styles.flexOne,
          styles.whiteBackground,
          {
            transform: [
              {
                translateX: animatedValueRef.current.interpolate({
                  inputRange: [-1, 1],
                  outputRange: pageVector,
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
        collapsable={false}
      >
        {visible || localVisible ? children : null}
      </Animated.View>
    </View>
  );
};

const AndroidScreenWrapper: React.FunctionComponent<Props> = ({
  children,
  visible,
  isOnTop,
}) => {
  const [localVisible, setLocalVisible] = React.useState(visible);
  const { height } = useWindowDimensions();
  const animatedValueRef = React.useRef(new Animated.Value(visible ? 0 : 1));

  React.useEffect(() => {
    Animated.timing(animatedValueRef.current, {
      toValue: visible || isOnTop ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start(() => {
      setLocalVisible(visible);
    });
  }, [visible, isOnTop]);

  return (
    <View
      style={StyleSheet.absoluteFill}
      collapsable={false}
      pointerEvents="box-none"
    >
      <Animated.View
        style={[
          styles.flexOne,
          styles.whiteBackground,
          {
            transform: [
              {
                translateY: animatedValueRef.current.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-1 * height, height],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
        collapsable={false}
      >
        {visible || localVisible ? children : null}
      </Animated.View>
    </View>
  );
};

export default Platform.select({
  android: AndroidScreenWrapper,
  default: DefaultScreenWrapper,
});

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
});
