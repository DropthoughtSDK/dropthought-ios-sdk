import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Animated, Image, Keyboard } from 'react-native';
import i18n from '../translation';
import { Colors, addOpacityToHex, GlobalStyle } from '../styles';
import { useTheme, COLOR_SCHEMES } from '@dropthought/react-native-ui';
const PollingItem = ({
  disabled,
  option,
  selected,
  percentage,
  placeholder,
  onPoll,
  feedback
}) => {
  const rtl = i18n.dir() === 'rtl';
  const {
    title = 'Others',
    otherFlag
  } = option || {};
  const {
    hexCode: backgroundColor = Colors.purple,
    fontColor,
    colorScheme
  } = useTheme() || {};
  const isLightMode = colorScheme === COLOR_SCHEMES.light;
  const initOtherText = otherFlag && selected && feedback && typeof feedback.answers[0] === 'string' ? feedback.answers[0] : '';
  const [otherText, setOtherText] = useState(initOtherText);
  const [hasEdited, setHasEdited] = useState(selected);
  const textInputRef = useRef(null);

  // bar animation
  const parentWidth = useRef(0);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];
  const animatedWidth = widthAnim.interpolate({
    inputRange,
    outputRange
  });
  useEffect(() => {
    if (percentage) {
      Animated.spring(widthAnim, {
        toValue: percentage,
        useNativeDriver: false
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);
  const buttonStyle = [styles.pollingButtonContainer, {
    backgroundColor: isLightMode ? addOpacityToHex(backgroundColor, 0.03) : '#39393a',
    borderColor: isLightMode ? addOpacityToHex(backgroundColor, 0.3) : '#39393a'
  }];
  const textStyle = [styles.titleText, {
    color: fontColor,
    fontWeight: selected || hasEdited ? '600' : '400',
    marginRight: rtl ? 0 : 6,
    marginLeft: rtl ? 6 : 0
  }];
  const barStyle = [styles.bar, {
    backgroundColor: addOpacityToHex(backgroundColor, isLightMode ? 0.1 : 0.4),
    width: animatedWidth,
    right: rtl ? 0 : undefined
  }];
  const iconStyle = [styles.icon, {
    tintColor: backgroundColor,
    marginRight: rtl ? 0 : 6,
    marginLeft: rtl ? 6 : 0
  }];
  const textInputStyle = [styles.otherTextInput, rtl && GlobalStyle.textAlignRight, {
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
  const onSelectOther = useCallback(() => {
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
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
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
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: `test:id/poll_item_selected_${selected}`,
    accessible: false,
    onPress: onSelect,
    disabled: disabled,
    style: buttonStyle,
    onLayout: e => {
      parentWidth.current = e.nativeEvent.layout.width;
    }
  }, /*#__PURE__*/React.createElement(Animated.View, {
    // @ts-ignore
    style: barStyle
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.pollingButtonContent, rtl && GlobalStyle.flexRowReverse]
  }, otherFlag ? /*#__PURE__*/React.createElement(View, {
    style: rtl ? GlobalStyle.flexRowReverse : GlobalStyle.row
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.titleContainer, rtl && GlobalStyle.flexRowReverse]
  }, hasEdited ? /*#__PURE__*/React.createElement(Image, {
    style: iconStyle,
    source: require('../assets/ic-polling-selected.png')
  }) : null, /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/poll_other_title",
    style: textStyle
  }, `${title}:`)), /*#__PURE__*/React.createElement(TextInput, {
    testID: "test:id/input_label_poll",
    ref: textInputRef,
    editable: !disabled || selected,
    onFocus: onFocus,
    onBlur: onBlur,
    value: otherText,
    onChangeText: setOtherText,
    maxLength: 100,
    placeholder: placeholder ?? i18n.t('survey:other-placeholder'),
    placeholderTextColor: Colors.inputPlaceholder,
    style: textInputStyle
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, selected ? /*#__PURE__*/React.createElement(Image, {
    style: iconStyle,
    source: require('../assets/ic-polling-selected.png')
  }) : null, /*#__PURE__*/React.createElement(View, {
    style: [styles.titleContainer, GlobalStyle.flex1, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(Text, {
    testID: `test:id/poll_title_${fontColor}`,
    style: textStyle
  }, title))), /*#__PURE__*/React.createElement(View, null, percentage !== undefined ? /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/poll_percentage",
    style: percentageTextStyle
  }, `${percentage}%`) : null)));
};
export default PollingItem;
const styles = StyleSheet.create({
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