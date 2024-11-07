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
/**
 * The ProgressBar will use `value` and `maxValue` to
 * compute the percentage
 */

const ProgressBar = ({
  value,
  maxValue,
  themeColor,
  color,
  rtl
}) => {
  // compute the percentage value: (value/maxValue)*100
  const percentage = Math.round(value * 100 / maxValue);
  const trackStyle = [styles.track, {
    backgroundColor: (0, _styles.opacity30)(themeColor)
  }];
  const progressBarStyle = [styles.progressBar, styles.track, {
    width: `${percentage}%`,
    backgroundColor: themeColor,
    right: rtl ? 0 : undefined
  }];
  const textStyle = [styles.title, rtl && _styles.GlobalStyle.textAlignRight, {
    color
  }];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: trackStyle
  }), /*#__PURE__*/React.createElement(_reactNative.View
  // @ts-ignore
  , {
    style: progressBarStyle
  }), /*#__PURE__*/React.createElement(_reactNative.Text, {
    testID: "test:id/custom_preview_progress_bar",
    style: textStyle
  }, `${value}/${maxValue}`));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    marginTop: 25
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12
  },
  track: {
    borderRadius: 1,
    height: 2
  },
  progressBar: {
    position: 'absolute'
  }
});
var _default = exports.default = /*#__PURE__*/React.memo(ProgressBar);
//# sourceMappingURL=ProgressBar.js.map