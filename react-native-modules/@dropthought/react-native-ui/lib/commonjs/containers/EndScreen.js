"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("../styles");
var _translation = _interopRequireDefault(require("../translation"));
var _theme = require("../contexts/theme");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _useWindowDimensions = require("../hooks/useWindowDimensions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-ignore

const logoSource = {
  [_theme.COLOR_SCHEMES.light]: require('../assets/ic_dtlogo.png'),
  [_theme.COLOR_SCHEMES.dark]: require('../assets/ic_dtlogo_dark.png')
};
const defaultIconSource = require('../assets/rating.png');
const defaultIconSize = {
  [_useWindowDimensions.DimensionWidthType.phone]: 65,
  [_useWindowDimensions.DimensionWidthType.tablet]: 72
};
const EndScreen = ({
  survey,
  onClose
}) => {
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    hexCode,
    colorScheme,
    fontColor,
    backgroundColor,
    autoClose,
    autoCloseCountdown
  } = (0, _theme.useTheme)();
  const rtl = _translation.default.dir() === 'rtl';
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
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
  const powerByStyle = [styles.power_by, {
    color: fontColor
  }];
  const powerByBoldStyle = [styles.power_by_bold, {
    color: fontColor
  }];
  const containerStyle = [styles.headerContainer, {
    paddingTop: insets.top
  }, rtl && _styles.GlobalStyle.flexRowReverse, {
    backgroundColor
  }];
  const headerStyle = [styles.headerTitle, {
    color: fontColor
  }];
  const subTitleStyle = [styles.subtitle, {
    color: fontColor
  }];
  const headerIconStyle = {
    tintColor: hexCode
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerRowContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    testID: "test:id/icon_custom_close_preview",
    style: headerIconStyle,
    source: require('../assets/icClose24Px.png')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: headerStyle,
    numberOfLines: 1
  }, survey.surveyName))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.main
  }, iconView, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/take_survey_thankful_msg",
    style: subTitleStyle
  }, thankYouTextPlain)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.vertical
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.horizontal
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: powerByStyle
  }, "Powered by "), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.dtLogo,
    source: logoSource[colorScheme]
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: powerByBoldStyle
  }, "dropthought")));
};
var _default = exports.default = EndScreen;
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _styles.Colors.white,
    flex: 1,
    alignItems: 'center'
  },
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
    opacity: 0.8,
    fontWeight: '500'
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
    fontSize: 12
  },
  power_by_bold: {
    fontSize: 16,
    fontWeight: '600'
  },
  dtLogo: {
    height: 24,
    width: 24
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginTop: 17
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1
  }
});
//# sourceMappingURL=EndScreen.js.map