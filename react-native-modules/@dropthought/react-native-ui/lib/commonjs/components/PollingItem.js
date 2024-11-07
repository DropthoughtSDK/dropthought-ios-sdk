"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _translation = _interopRequireDefault(require("../translation"));
var _styles = require("../styles");
var _reactNativeUi = require("@dropthought/react-native-ui");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PollingItem = ({
  disabled,
  option,
  selected,
  percentage,
  placeholder,
  onPoll,
  feedback
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const {
    title = 'Others',
    otherFlag
  } = option || {};
  const {
    hexCode: backgroundColor = _styles.Colors.purple,
    fontColor,
    colorScheme
  } = (0, _reactNativeUi.useTheme)() || {};
  const isLightMode = colorScheme === _reactNativeUi.COLOR_SCHEMES.light;
  const initOtherText = otherFlag && selected && feedback && typeof feedback.answers[0] === 'string' ? feedback.answers[0] : '';
  const [otherText, setOtherText] = (0, _react.useState)(initOtherText);
  const [hasEdited, setHasEdited] = (0, _react.useState)(selected);
  const textInputRef = (0, _react.useRef)(null);

  // bar animation
  const parentWidth = (0, _react.useRef)(0);
  const widthAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];
  const animatedWidth = widthAnim.interpolate({
    inputRange,
    outputRange
  });
  (0, _react.useEffect)(() => {
    if (percentage) {
      _reactNative.Animated.spring(widthAnim, {
        toValue: percentage,
        useNativeDriver: false
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);
  const buttonStyle = [styles.pollingButtonContainer, {
    backgroundColor: isLightMode ? (0, _styles.addOpacityToHex)(backgroundColor, 0.03) : '#39393a',
    borderColor: isLightMode ? (0, _styles.addOpacityToHex)(backgroundColor, 0.3) : '#39393a'
  }];
  const textStyle = [styles.titleText, {
    color: fontColor,
    fontWeight: selected || hasEdited ? '600' : '400',
    marginRight: rtl ? 0 : 6,
    marginLeft: rtl ? 6 : 0
  }];
  const barStyle = [styles.bar, {
    backgroundColor: (0, _styles.addOpacityToHex)(backgroundColor, isLightMode ? 0.1 : 0.4),
    width: animatedWidth,
    right: rtl ? 0 : undefined
  }];
  const iconStyle = [styles.icon, {
    tintColor: backgroundColor,
    marginRight: rtl ? 0 : 6,
    marginLeft: rtl ? 6 : 0
  }];
  const textInputStyle = [styles.otherTextInput, rtl && _styles.GlobalStyle.textAlignRight, {
    color: fontColor,
    fontWeight: hasEdited ? '600' : '400'
  }];
  const percentageTextStyle = [styles.percentageText, {
    color: fontColor
  }];
  const onSelect = () => {
    if (otherFlag && textInputRef) {
      var _textInputRef$current;
      (_textInputRef$current = textInputRef.current) === null || _textInputRef$current === void 0 || _textInputRef$current.focus();
    } else if (option) {
      onPoll(option);
    }
  };
  const onSelectOther = (0, _react.useCallback)(() => {
    const otherOption = {
      title: 'other',
      choice: otherText,
      otherFlag: true
    };
    onPoll(otherOption);
  }, [onPoll, otherText]);
  const onFocus = () => {
    if (!hasEdited) {
      onSelectOther();
      setHasEdited(true);
    }
  };
  const onBlur = () => {
    onSelectOther();
  };
  (0, _react.useEffect)(() => {
    const keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
      var _textInputRef$current2;
      if ((_textInputRef$current2 = textInputRef.current) !== null && _textInputRef$current2 !== void 0 && _textInputRef$current2.isFocused()) {
        var _textInputRef$current3;
        (_textInputRef$current3 = textInputRef.current) === null || _textInputRef$current3 === void 0 || _textInputRef$current3.blur();
      }
    });
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: `test:id/poll_item_selected_${selected}`,
    accessible: false,
    onPress: onSelect,
    disabled: disabled,
    style: buttonStyle,
    onLayout: e => {
      parentWidth.current = e.nativeEvent.layout.width;
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    // @ts-ignore
    style: barStyle
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.pollingButtonContent, rtl && _styles.GlobalStyle.flexRowReverse]
  }, otherFlag ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: rtl ? _styles.GlobalStyle.flexRowReverse : _styles.GlobalStyle.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.titleContainer, rtl && _styles.GlobalStyle.flexRowReverse]
  }, hasEdited ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/ic-polling-selected.png')
  }) : null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/poll_other_title",
    style: textStyle
  }, `${title}:`)), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    testID: "test:id/input_label_poll",
    ref: textInputRef,
    editable: !disabled || selected,
    onFocus: onFocus,
    onBlur: onBlur,
    value: otherText,
    onChangeText: setOtherText,
    maxLength: 100,
    placeholder: placeholder ?? _translation.default.t('survey:other-placeholder'),
    placeholderTextColor: _styles.Colors.inputPlaceholder,
    style: textInputStyle
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, selected ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/ic-polling-selected.png')
  }) : null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.titleContainer, _styles.GlobalStyle.flex1, rtl && _styles.GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: `test:id/poll_title_${fontColor}`,
    style: textStyle
  }, title))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, percentage !== undefined ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/poll_percentage",
    style: percentageTextStyle
  }, `${percentage}%`) : null)));
};
var _default = exports.default = PollingItem;
const styles = _reactNative.StyleSheet.create({
  pollingButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 4
  },
  pollingButtonContent: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  titleText: {
    fontSize: 15,
    lineHeight: 18,
    flexShrink: 1
  },
  bar: {
    height: '100%',
    position: 'absolute',
    borderRadius: 8
  },
  icon: {
    marginRight: 8
  },
  otherTextInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
    height: 18
  },
  percentageText: {
    fontSize: 15,
    fontWeight: '500',
    paddingHorizontal: 6
  }
});
//# sourceMappingURL=PollingItem.js.map