"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _styles = require("../styles");
var _translation = _interopRequireDefault(require("../translation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The ClassicProgressBar will use `value` and `maxValue` to
 * compute the percentage
 */

const ClassicProgressBar = ({
  value,
  maxValue,
  themeColor,
  rtl
}) => {
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();

  // compute the percentage value: (value/maxValue)*100
  const percentage = Math.round(value * 100 / maxValue);
  const containerStyle = [styles.container, _styles.GlobalStyle.row, rtl && _styles.GlobalStyle.flexRowReverse];
  const trackStyle = [styles.track, {
    backgroundColor: (0, _styles.opacity30)(themeColor)
  }];
  const progressBarStyle = [styles.progressBar, styles.track, {
    width: `${percentage}%`,
    backgroundColor: themeColor
  }];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _styles.GlobalStyle.flex1
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: trackStyle
  }), /*#__PURE__*/React.createElement(_reactNative.View
  // @ts-ignore
  , {
    style: progressBarStyle
  })), /*#__PURE__*/React.createElement(_reactNative.Text, {
    testID: "test:id/preview_progress_percentage",
    style: [styles.title, rtl && _styles.GlobalStyle.textAlignRight, titleSize[dimensionWidthType]]
  }, `${_translation.default.t('survey:progress-bar', {
    percentage
  })}`));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingVertical: 12
  },
  title: {
    color: `${_styles.Colors.progressBarText}99`,
    fontWeight: '500'
  },
  track: {
    width: '100%',
    borderRadius: 3,
    height: 6
  },
  progressBar: {
    position: 'absolute'
  }
});
const titleSize = _reactNative.StyleSheet.create({
  [_useWindowDimensions.DimensionWidthType.phone]: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12
  },
  [_useWindowDimensions.DimensionWidthType.tablet]: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14
  }
});
var _default = exports.default = /*#__PURE__*/React.memo(ClassicProgressBar);
//# sourceMappingURL=ClassicProgressBar.js.map