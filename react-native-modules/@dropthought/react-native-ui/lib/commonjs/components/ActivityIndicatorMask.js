"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ActivityIndicatorMask = ({
  loading = false,
  style
}) => {
  return loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.GlobalStyle.loadingMask, _styles.GlobalStyle.fullCenter, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null)) : null;
};

var _default = ActivityIndicatorMask;
exports.default = _default;
//# sourceMappingURL=ActivityIndicatorMask.js.map