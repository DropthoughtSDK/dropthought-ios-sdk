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
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: progressBarStyle
  }), /*#__PURE__*/React.createElement(_reactNative.Text, {
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

var _default = /*#__PURE__*/React.memo(ProgressBar);

exports.default = _default;
//# sourceMappingURL=ProgressBar.js.map