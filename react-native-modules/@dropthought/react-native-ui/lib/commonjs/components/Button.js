"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("../styles");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
    minWidth: width
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
var _default = exports.default = Button;
const styles = _reactNative.StyleSheet.create({
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