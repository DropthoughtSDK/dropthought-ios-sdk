function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Colors } from '../styles';

const Button = ({
  title,
  disabled = false,
  width,
  containerStyle,
  color = Colors.purple,
  ...props
}) => {
  const buttonStyle = [styles.button, {
    backgroundColor: color
  }, disabled ? styles.disabledButton : {}, width ? {
    minWidth: width
  } : {}];
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, props, {
    disabled: disabled
  }), /*#__PURE__*/React.createElement(View, {
    style: buttonStyle
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, title))));
};

export default Button;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center'
  },
  button: {
    alignItems: 'center',
    borderRadius: 3,
    flex: undefined,
    paddingHorizontal: 10
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
    paddingVertical: 12
  },
  disabledButton: {
    backgroundColor: Colors.settingsButtonDisable
  }
});
//# sourceMappingURL=Button.js.map