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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ProgressBar = ({
  value,
  maxValue,
  themeColor,
  rtl
}) => {
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)(); // compute the percentage value: (value/maxValue)*100

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
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: progressBarStyle
  })), /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.title, rtl && _styles.GlobalStyle.textAlignRight, titleSize[dimensionWidthType]]
  }, _translation.default.t('survey:progress-bar', {
    percentage
  })));
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

var _default = /*#__PURE__*/React.memo(ProgressBar);

exports.default = _default;
//# sourceMappingURL=ProgressBar.js.map