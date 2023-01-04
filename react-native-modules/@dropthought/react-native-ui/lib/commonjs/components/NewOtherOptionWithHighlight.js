"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _NewOptionWithHighlight = _interopRequireDefault(require("./NewOptionWithHighlight"));

var _MultiLineTextInput = _interopRequireDefault(require("./MultiLineTextInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  const inputRef = React.useRef(null); // return checked as true when focus

  const onFocusHandler = () => {
    onChangeValue(id, {
      value: textValue,
      checked: true
    });
  }; // return checked as false, if the textValue is empty


  const onBlurHandler = () => {
    if (!textValue || textValue.trim().length <= 0) {
      onChangeValue(id, {
        value: '',
        checked: checked
      });
    }
  };

  const { ...focusProps
  } = useFocus(onBlurHandler, onFocusHandler); // when the option is pressed, call focus if current checked is false

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
  }; // when text input is changed, return the text


  const onChangeTextHandler = text => onChangeValue && onChangeValue(id, {
    checked: true,
    value: text
  });

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_NewOptionWithHighlight.default, _extends({}, props, {
    onPress: onPressHandler,
    title: 'Others'
  })), /*#__PURE__*/React.createElement(_MultiLineTextInput.default, _extends({
    onEndEditingHandler: () => {},
    onChangeTextHandler: onChangeTextHandler,
    themeColor: themeColor,
    feedback: feedback,
    question: question,
    inputRef: inputRef,
    checked: checked,
    anonymous: anonymous
  }, focusProps)));
}

var _default = /*#__PURE__*/React.memo(NewOtherOptionWithHighlight);

exports.default = _default;
//# sourceMappingURL=NewOtherOptionWithHighlight.js.map