function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import GlobalStyle, { Colors } from '../styles';
import i18n from '../translation';
import { metadataTypeKeyboard, metadataTypeAutoCapitalize } from './ClassicOpenQuestion';
import MetadataDesc from './MetadataDesc';
import { useTheme } from '../contexts/theme';

const useFocus = (onBlur, onFocus) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const onFocusHandler = React.useCallback(() => {
    onFocus && onFocus();
    setIsFocused(true);
  }, [onFocus]);
  const onBlurHandler = React.useCallback(() => {
    onBlur && onBlur();
    setIsFocused(false);
  }, [onBlur]);
  return {
    isFocused,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler
  };
};

const ClassicDropdownOtherOptionInput = ({
  visible,
  question,
  placeholder,
  value,
  onChangeText,
  themeColor
}) => {
  const rtl = i18n.dir() === 'rtl';
  const inputRef = useRef(null);
  const {
    fontColor
  } = useTheme();

  const onFocusHandler = () => {};

  const onBlurHandler = () => {};

  const {
    isFocused,
    ...focusProps
  } = useFocus(onBlurHandler, onFocusHandler);
  const inputTextBorderStyle = isFocused ? {
    borderColor: themeColor
  } : undefined;
  const inputTextColorStyle = {
    color: fontColor
  };
  if (!visible) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetadataDesc, {
    question: question,
    rtl: rtl
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.textInputContainer, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(TextInput, _extends({
    ref: inputRef,
    style: [styles.textInput, rtl && GlobalStyle.textAlignRight, inputTextBorderStyle, inputTextColorStyle],
    placeholder: placeholder,
    placeholderTextColor: Colors.inputPlaceholder,
    multiline: true,
    onChangeText: onChangeText,
    underlineColorAndroid: Colors.transparent,
    selectionColor: themeColor,
    value: value,
    maxLength: 100,
    keyboardType: metadataTypeKeyboard(question.metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(question.metaDataType)
  }, focusProps))), /*#__PURE__*/React.createElement(Text, {
    style: [styles.descText, rtl && GlobalStyle.textAlignLeft]
  }, value.length, "/100"));
};

const styles = StyleSheet.create({
  textInputContainer: {
    height: 80,
    marginTop: 10
  },
  textInput: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.rankingContainerBorder,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 12
  },
  descText: {
    color: Colors.openQuestionSubTitle,
    textAlign: 'right',
    width: '100%',
    marginTop: 6
  }
});
export default ClassicDropdownOtherOptionInput;
//# sourceMappingURL=ClassicDropdownOtherOptionInput.js.map