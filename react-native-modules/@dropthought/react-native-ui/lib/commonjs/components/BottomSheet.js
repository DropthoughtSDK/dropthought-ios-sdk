"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavigationComponent = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _theme = require("../contexts/theme");
var _styles = require("../styles");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//@ts-ignore

const NavigationComponent = ({
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: navStyles.content
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: "test:id/icon_cancel",
    style: navStyles.buttonContainer,
    onPress: onCancel
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: navStyles.buttonLeft
  }, "Cancel")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: navStyles.labelContaienr
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: navStyles.label
  }, "Select your option")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: "test:id/icon_check_image",
    disabled: disableOnConfirm,
    style: buttonRightStyle,
    onPress: onConfirm
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: navStyles.buttonRight,
    source: require('../assets/ic-check.png')
  }))));
};
exports.NavigationComponent = NavigationComponent;
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
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    backgroundColor
  } = (0, _theme.useTheme)();
  const heightValueRef = _react.default.useRef(0);
  const animatedHeightRef = _react.default.useRef(new _reactNative.Animated.Value(0));
  const [modalVisible, setModalVisible] = _react.default.useState(false);
  _react.default.useEffect(() => {
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
    _reactNative.Animated.timing(animatedHeightRef.current, {
      toValue: toValue,
      duration: 300,
      easing: _reactNative.Easing.linear,
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
  const contentView = /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: contentNavStyle,
    testID: `${title}-bottom-sheet`
  }, navigationComponent ? navigationComponent : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.divider
  }), children || componentInside);
  if (!coverScreen) {
    return contentView;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    onRequestClose: onBackdropPress,
    animationType: "none",
    transparent: true
    //@ts-ignore
    ,
    statusBarTranslucent: true,
    visible: modalVisible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.backdrop
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onBackdropPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.GlobalStyle.flex1
  })), contentView));
};
var _default = exports.default = BottomSheet;
const styles = _reactNative.StyleSheet.create({
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
    backgroundColor: _styles.Colors.transparent,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 5,
    alignSelf: 'center'
  },
  navigationArea: {
    backgroundColor: _styles.Colors.white,
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
    backgroundColor: _styles.Colors.backdropBG,
    flex: 1
  },
  titleContainer: {
    flex: 1
  }
});
const navStyles = _reactNative.StyleSheet.create({
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
    color: _styles.Colors.white
  },
  buttonRight: {
    width: 18,
    height: 14,
    resizeMode: 'contain'
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: _styles.Colors.white,
    textAlign: 'center'
  },
  labelContaienr: {
    flex: 1
  }
});
//# sourceMappingURL=BottomSheet.js.map