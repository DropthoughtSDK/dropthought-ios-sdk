"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Button = ({
  title,
  disabled = false,
  width,
  containerStyle,
  color = _styles.Colors.purple,
  ...props
}) => {
  const buttonStyle = [styles.button, {
    backgroundColor: color
  }, disabled ? styles.disabledButton : {}, width ? {
    width
  } : {}];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, _extends({}, props, {
    disabled: disabled
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: buttonStyle
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.title
  }, title))));
};

var _default = Button;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  container: {
    alignSelf: 'center'
  },
  button: {
    alignItems: 'center',
    borderRadius: 3,
    flex: undefined
  },
  title: {
    color: _styles.Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
    paddingVertical: 12
  },
  disabledButton: {
    backgroundColor: _styles.Colors.settingsButtonDisable
  }
});
//# sourceMappingURL=Button.js.map