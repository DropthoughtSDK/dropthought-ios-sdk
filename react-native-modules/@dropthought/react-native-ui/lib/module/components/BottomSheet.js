import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TouchableWithoutFeedback, Animated, Easing, Modal, Text } from 'react-native';
//@ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/theme';
import { Colors, GlobalStyle } from '../styles';
export const NavigationComponent = ({
  backgroundColor = '#ffffff',
  disableOnConfirm = true,
  onCancel,
  onConfirm
}) => {
  const containerStyle = [navStyles.container, {
    backgroundColor: backgroundColor
  }];
  const buttonRightStyle = [navStyles.buttonContainer, {
    opacity: disableOnConfirm ? 0.3 : 1
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: navStyles.content
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: "test:id/icon_cancel",
    style: navStyles.buttonContainer,
    onPress: onCancel
  }, /*#__PURE__*/React.createElement(Text, {
    style: navStyles.buttonLeft
  }, "Cancel")), /*#__PURE__*/React.createElement(View, {
    style: navStyles.labelContaienr
  }, /*#__PURE__*/React.createElement(Text, {
    style: navStyles.label
  }, "Select your option")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: "test:id/icon_check_image",
    disabled: disableOnConfirm,
    style: buttonRightStyle,
    onPress: onConfirm
  }, /*#__PURE__*/React.createElement(Image, {
    style: navStyles.buttonRight,
    source: require('../assets/ic-check.png')
  }))));
};
const BottomSheet = ({
  coverScreen = false,
  title,
  onBackdropPress,
  componentInside,
  componentHeight,
  navigationComponent,
  visible,
  children
}) => {
  const {
    bottom
  } = useSafeAreaInsets();
  const {
    backgroundColor
  } = useTheme();
  const heightValueRef = React.useRef(0);
  const animatedHeightRef = React.useRef(new Animated.Value(0));
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    let toValue = 0;
    if (visible) {
      let titleBarHeight = 48;
      toValue = titleBarHeight + componentHeight + bottom;
      if (coverScreen) setModalVisible(true);
    }
    if (heightValueRef.current === toValue) {
      // when current height value is the same as toValue, skip animation
      return;
    }
    heightValueRef.current = toValue;
    Animated.timing(animatedHeightRef.current, {
      toValue: toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => {
      if (!visible && coverScreen) setModalVisible(false);
    });
  }, [visible, componentHeight, bottom, coverScreen]);
  const contentNavStyle = [styles.container, {
    height: animatedHeightRef.current
  }, {
    paddingBottom: bottom,
    backgroundColor: backgroundColor
  }];
  const contentView = /*#__PURE__*/React.createElement(Animated.View, {
    style: contentNavStyle,
    testID: `${title}-bottom-sheet`
  }, navigationComponent ? navigationComponent : /*#__PURE__*/React.createElement(View, {
    style: styles.divider
  }), children || componentInside);
  if (!coverScreen) {
    return contentView;
  }
  return /*#__PURE__*/React.createElement(Modal, {
    onRequestClose: onBackdropPress,
    animationType: "none",
    transparent: true
    //@ts-ignore
    ,
    statusBarTranslucent: true,
    visible: modalVisible
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.backdrop
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: onBackdropPress
  }, /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  })), contentView));
};
export default BottomSheet;
const styles = StyleSheet.create({
  container: {
    bottom: 0,
    height: 368,
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden'
  },
  divider: {
    height: 2,
    width: 150,
    // TODO: later set this back to Colors.secondaryDivider, when applying gesture
    backgroundColor: Colors.transparent,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 5,
    alignSelf: 'center'
  },
  navigationArea: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 15
  },
  title: {},
  subTitle: {
    marginTop: 4
  },
  backdrop: {
    backgroundColor: Colors.backdropBG,
    flex: 1
  },
  titleContainer: {
    flex: 1
  }
});
const navStyles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-end'
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonContainer: {
    width: 84,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLeft: {
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 17,
    color: Colors.white
  },
  buttonRight: {
    width: 18,
    height: 14,
    resizeMode: 'contain'
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center'
  },
  labelContaienr: {
    flex: 1
  }
});
//# sourceMappingURL=BottomSheet.js.map