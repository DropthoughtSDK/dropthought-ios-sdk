function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * @description Option with a TextInput, this is for other option in multi-choice/single-choice question
 */
import * as React from 'react';
import { StyleSheet, TextInput, View, Text, Platform, Keyboard } from 'react-native';
import GlobalStyles, { Colors, QuestionContentTextSize } from '../styles';
import i18n from '../translation';
import OptionWithHighlight from './OptionWithHighlight';
import { useDimensionWidthType } from '../hooks/useWindowDimensions';
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
function OtherOptionWithHighlightProps(props) {
  const {
    id,
    checked,
    textValue,
    onChangeValue,
    checkedColor,
    question
  } = props;
  const {
    otherText = '',
    otherTextLabel,
    questionBrand = ''
  } = question;
  const {
    fontColor
  } = useTheme();
  const dimensionWidthType = useDimensionWidthType();
  const inputRef = React.useRef(null);

  // return checked as true when focus
  const onFocusHandler = () => {
    onChangeValue(id, {
      value: textValue,
      checked: true
    });
  };

  // return checked as false, if the textValue is empty
  const onBlurHandler = () => {
    if (!textValue || textValue.trim().length <= 0) {
      onChangeValue(id, {
        value: '',
        checked: false
      });
    }
  };
  const {
    isFocused,
    ...focusProps
  } = useFocus(onBlurHandler, onFocusHandler);

  // when the option is pressed, call focus if current checked is false
  const onPressHandler = () => {
    if (inputRef.current && !checked) {
      inputRef.current.focus();
    } else {
      // toggle checked value when pressing
      onChangeValue(id, {
        value: textValue,
        checked: !checked
      });
    }
  };

  // when text input is changed, return the text
  const onChangeTextHandler = text => onChangeValue && onChangeValue(id, {
    checked: true,
    value: text
  });
  const rtl = i18n.dir() === 'rtl';
  React.useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.blur();
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);
  const inputStyle = [styles.textInput, {
    color: fontColor,
    minHeight: i18n.language === 'te' ? 50 : undefined,
    ...Platform.select({
      ios: {
        paddingVertical: i18n.language === 'te' ? undefined : 13
      }
    })
  }, rtl && GlobalStyles.textAlignRight, isFocused ? {
    borderBottomColor: checkedColor
  } : {}, QuestionContentTextSize[dimensionWidthType]];
  const textInput = /*#__PURE__*/React.createElement(View, {
    style: [styles.textInputContainer, rtl && GlobalStyles.flexRowReverse]
  }, /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/choice_option_other",
    style: [styles.otherText, {
      color: fontColor
    }, checked ? styles.checkedOtherText : {}, QuestionContentTextSize[dimensionWidthType]]
  }, otherTextLabel), /*#__PURE__*/React.createElement(TextInput, _extends({
    testID: "test:id/field_choice_option_other",
    ref: inputRef,
    style: inputStyle,
    placeholder: otherText.length > 0 ? otherText : questionBrand.length > 0 ? questionBrand : otherText,
    placeholderTextColor: Colors.inputPlaceholder,
    onChangeText: onChangeTextHandler,
    underlineColorAndroid: Colors.transparent,
    selectionColor: checkedColor,
    value: textValue,
    maxLength: 50
  }, focusProps)));
  return /*#__PURE__*/React.createElement(OptionWithHighlight, _extends({}, props, {
    onPress: onPressHandler,
    title: textInput,
    containerStyle: styles.container
  }));
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 0
  },
  otherText: {
    fontWeight: 'normal',
    marginHorizontal: 12
  },
  checkedOtherText: {
    fontWeight: '500'
  },
  textInput: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputPlaceholder
  },
  textInputContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
});
export default OtherOptionWithHighlightProps;
//# sourceMappingURL=OtherOptionWithHighlight.js.map