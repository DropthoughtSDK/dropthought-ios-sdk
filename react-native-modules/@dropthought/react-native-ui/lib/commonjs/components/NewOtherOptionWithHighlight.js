"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _NewOptionWithHighlight = _interopRequireDefault(require("./NewOptionWithHighlight"));
var _MultiLineTextInput = _interopRequireDefault(require("./MultiLineTextInput"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
function NewOtherOptionWithHighlight(props) {
  const {
    id,
    checked,
    themeColor,
    textValue,
    onChangeValue,
    feedback,
    question,
    anonymous
  } = props;
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
        checked: checked
      });
    }
  };
  const {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_NewOptionWithHighlight.default, _extends({}, props, {
    onPress: onPressHandler,
    title: question.otherTextLabel
  })), /*#__PURE__*/React.createElement(_MultiLineTextInput.default, {
    onEndEditingHandler: () => {},
    onChangeTextHandler: onChangeTextHandler,
    themeColor: themeColor,
    feedback: feedback,
    question: question,
    inputRef: inputRef,
    checked: checked,
    anonymous: anonymous,
    onFocusHandler: focusProps.onFocus,
    onBlurHandler: focusProps.onBlur
  }));
}
var _default = exports.default = /*#__PURE__*/React.memo(NewOtherOptionWithHighlight);
//# sourceMappingURL=NewOtherOptionWithHighlight.js.map