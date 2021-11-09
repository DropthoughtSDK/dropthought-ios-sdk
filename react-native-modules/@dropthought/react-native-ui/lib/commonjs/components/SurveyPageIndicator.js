"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _styles = require("../styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SurveyPageIndicator = props => {
  const {
    survey,
    pageIndex = 0,
    rtl
  } = props;
  const themeColor = survey.surveyProperty.hexCode;
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const dimensionStyles = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone ? phoneStyles : tabletStyles;
  const currentPage = survey.pages[pageIndex];
  const titleStyle = [styles.title, dimensionStyles.title];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, dimensionStyles.container, {
      backgroundColor: (0, _styles.opacity10)(themeColor)
    }, rtl ? styles.rtl : {}]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: titleStyle
  }, currentPage.pageTitle));
};

const styles = _reactNative.StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 40,
    width: '100%'
  },
  title: {
    fontWeight: '600'
  },
  rtl: {
    alignItems: 'flex-end'
  }
});

const phoneStyles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.42,
    color: _styles.Colors.progressBarText
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 35
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.48
  }
});

var _default = /*#__PURE__*/React.memo(SurveyPageIndicator);

exports.default = _default;
//# sourceMappingURL=SurveyPageIndicator.js.map