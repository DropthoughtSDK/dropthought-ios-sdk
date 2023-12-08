"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _theme = require("../contexts/theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const logoSource = require('../assets/ic_dtlogo.png');

const defaultIconSource = require('../assets/rating.png');

const defaultIconSize = {
  [_useWindowDimensions.DimensionWidthType.phone]: 65,
  [_useWindowDimensions.DimensionWidthType.tablet]: 72
};

const ClassicEndScreen = ({
  survey
}) => {
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const {
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const {
    surveyProperty,
    thankYouTextPlain
  } = survey;
  const {
    image
  } = surveyProperty;
  const [imageHeight, setImageHeight] = (0, _react.useState)(65);
  const iconStyle = {
    width: '100%',
    height: imageHeight
  };
  (0, _react.useEffect)(() => {
    _reactNative.Image.getSize(image, (_, height) => {
      if (height < defaultIconSize[dimensionWidthType]) {
        setImageHeight(height);
      }
    }, _ => {}); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };

  const iconView = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.GlobalStyle.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: "contain",
    style: iconStyle,
    source: iconSource
  }));

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [shareStyles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.main
  }, iconView, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.subtitle, {
      color: fontColor
    }]
  }, thankYouTextPlain)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.vertical
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.horizontal
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.power_by
  }, "Powered by "), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.dtLogo,
    source: logoSource
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.power_by_bold, {
      color: fontColor
    }]
  }, "dropthought")));
};

var _default = ClassicEndScreen;
exports.default = _default;

const shareStyles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _styles.Colors.white,
    flex: 1,
    alignItems: 'center'
  }
});

const phoneStyles = _reactNative.StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38
  },
  title: {
    lineHeight: 27,
    marginTop: 44,
    fontSize: 22,
    opacity: 0.9
  },
  subtitle: {
    marginTop: 17,
    fontSize: 19,
    textAlign: 'center',
    opacity: 0.72,
    paddingBottom: 10
  },
  vertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 83
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  power_by: {
    color: _styles.Colors.settingsGreyText,
    fontSize: 9
  },
  power_by_bold: {
    fontSize: 12,
    fontWeight: '500'
  },
  dtLogo: {
    height: 15,
    width: 15
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 70
  },
  icon: {
    height: 72,
    width: 72
  },
  title: {
    lineHeight: 38,
    marginTop: 44,
    fontSize: 31,
    opacity: 0.9
  },
  subtitle: {
    lineHeight: 25,
    marginTop: 17,
    fontSize: 21,
    textAlign: 'center',
    opacity: 0.72
  },
  vertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 67
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  power_by: {
    color: _styles.Colors.settingsGreyText,
    fontSize: 12
  },
  power_by_bold: {
    fontSize: 15,
    fontWeight: '500'
  },
  dtLogo: {
    height: 17,
    width: 17
  }
});
//# sourceMappingURL=ClassicEndScreen.js.map