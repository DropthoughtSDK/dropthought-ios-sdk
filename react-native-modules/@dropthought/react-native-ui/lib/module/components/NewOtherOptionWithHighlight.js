function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import NewOptionWithHighlight from './NewOptionWithHighlight';
import MultiLineTextInput from './MultiLineTextInput';

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

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NewOptionWithHighlight, _extends({}, props, {
    onPress: onPressHandler,
    title: 'Others'
  })), /*#__PURE__*/React.createElement(MultiLineTextInput, _extends({
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

export default /*#__PURE__*/React.memo(NewOtherOptionWithHighlight);
//# sourceMappingURL=NewOtherOptionWithHighlight.js.map