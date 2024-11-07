"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireWildcard(require("../styles"));
var _translation = _interopRequireDefault(require("../translation"));
var _OptionWithHighlight = _interopRequireDefault(require("./OptionWithHighlight"));
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /**
 * @description Option with a TextInput, this is for other option in multi-choice/single-choice question
 */
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
  } = (0, _theme.useTheme)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
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
  const rtl = _translation.default.dir() === 'rtl';
  React.useEffect(() => {
    const hideSubscription = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.blur();
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);
  const inputStyle = [styles.textInput, {
    color: fontColor,
    minHeight: _translation.default.language === 'te' ? 50 : undefined,
    ..._reactNative.Platform.select({
      ios: {
        paddingVertical: _translation.default.language === 'te' ? undefined : 13
      }
    })
  }, rtl && _styles.default.textAlignRight, isFocused ? {
    borderBottomColor: checkedColor
  } : {}, _styles.QuestionContentTextSize[dimensionWidthType]];
  const textInput = /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.textInputContainer, rtl && _styles.default.flexRowReverse]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    testID: "test:id/choice_option_other",
    style: [styles.otherText, {
      color: fontColor
    }, checked ? styles.checkedOtherText : {}, _styles.QuestionContentTextSize[dimensionWidthType]]
  }, otherTextLabel), /*#__PURE__*/React.createElement(_reactNative.TextInput, _extends({
    testID: "test:id/field_choice_option_other",
    ref: inputRef,
    style: inputStyle,
    placeholder: otherText.length > 0 ? otherText : questionBrand.length > 0 ? questionBrand : otherText,
    placeholderTextColor: _styles.Colors.inputPlaceholder,
    onChangeText: onChangeTextHandler,
    underlineColorAndroid: _styles.Colors.transparent,
    selectionColor: checkedColor,
    value: textValue,
    maxLength: 50
  }, focusProps)));
  return /*#__PURE__*/React.createElement(_OptionWithHighlight.default, _extends({}, props, {
    onPress: onPressHandler,
    title: textInput,
    containerStyle: styles.container
  }));
}
const styles = _reactNative.StyleSheet.create({
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
    borderBottomColor: _styles.Colors.inputPlaceholder
  },
  textInputContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
});
var _default = exports.default = OtherOptionWithHighlightProps;
//# sourceMappingURL=OtherOptionWithHighlight.js.map