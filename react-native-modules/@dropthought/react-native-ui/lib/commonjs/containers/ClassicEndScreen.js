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
var _HtmlText = _interopRequireDefault(require("../components/HtmlText"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const logoSource = require('../assets/ic_dtlogo.png');
const defaultIconSource = require('../assets/rating.png');
const defaultIconSize = {
  [_useWindowDimensions.DimensionWidthType.phone]: 65,
  [_useWindowDimensions.DimensionWidthType.tablet]: 72
};
const ClassicEndScreen = ({
  survey,
  onClose
}) => {
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const {
    fontColor,
    backgroundColor,
    autoClose,
    autoCloseCountdown
  } = (0, _theme.useTheme)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const {
    surveyProperty,
    thankYouText
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
    let timer;
    if (autoClose) {
      timer = setTimeout(onClose, autoCloseCountdown);
    }
    _reactNative.Image.getSize(image, (_, height) => {
      if (height < defaultIconSize[dimensionWidthType]) {
        setImageHeight(height);
      }
    }, _ => {});
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };
  const iconView = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.GlobalStyle.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: "contain"
    // @ts-ignore
    ,
    style: iconStyle,
    source: iconSource
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [shareStyles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.main
  }, iconView, thankYouText && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.subtitle
  }, /*#__PURE__*/_react.default.createElement(_HtmlText.default, {
    accessibilityLabel: `thankful_${thankYouText}`,
    html: thankYouText,
    width: _reactNative.Dimensions.get('window').width - 76,
    maxHeight: _reactNative.Dimensions.get('window').height * 0.4
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
var _default = exports.default = ClassicEndScreen;
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
    marginTop: 17
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
    marginTop: 17
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