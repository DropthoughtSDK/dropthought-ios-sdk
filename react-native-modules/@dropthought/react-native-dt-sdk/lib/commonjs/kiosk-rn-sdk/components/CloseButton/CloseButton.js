"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ICON_SIZE = exports.CloseButton = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const closeIconSource = require('./assets/ic-close.png');
const hitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10
};
const ICON_SIZE = exports.ICON_SIZE = 52;
const CloseButton = ({
  tintColor = undefined,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, _extends({
    style: styles.icon
  }, props, {
    hitSlop: hitSlop
  }), /*#__PURE__*/React.createElement(_reactNative.Image, {
    source: closeIconSource,
    style: [styles.iconImage, {
      tintColor
    }]
  }));
};
exports.CloseButton = CloseButton;
var _default = exports.default = CloseButton;
const styles = _reactNative.StyleSheet.create({
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    resizeMode: 'contain'
  }
});
//# sourceMappingURL=CloseButton.js.map