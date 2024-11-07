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
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _LanguageUtils = require("../utils/LanguageUtils");
var _translation = _interopRequireDefault(require("../translation"));
var _usePollingRecord = require("../hooks/usePollingRecord");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-ignore

const defaultIconSource = require('../assets/rating.png');
const defaultIconSize = Object.freeze({
  [_useWindowDimensions.DimensionWidthType.phone]: 65,
  [_useWindowDimensions.DimensionWidthType.tablet]: 72
});
const StartScreen = ({
  onLanguageSelect,
  onClose,
  onStart,
  survey
}) => {
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const {
    hexCode,
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  const {
    surveyProperty,
    surveyName,
    welcomeTextPlain,
    language,
    takeSurvey
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
    }, _ => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    resetRecord
  } = (0, _usePollingRecord.usePollingRecord)();
  (0, _react.useEffect)(() => {
    resetRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };
  const iconView = /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: "contain"
    // @ts-ignore
    ,
    style: iconStyle,
    source: iconSource
  });
  const languagesView = () => {
    const {
      languages
    } = survey;

    // if there's only one language or no languages, no need to display
    if (!languages || !languages.length || languages.length <= 1) return null;
    const languageView = languages.map((lang, index) => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      key: index,
      onPress: () => {
        onLanguageSelect && onLanguageSelect(lang);
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.language_label, {
        color: lang !== language ? hexCode : fontColor
      }]
    }, (0, _LanguageUtils.getLanguageBy)(lang))));
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.languages
    }, languageView);
  };
  const buttonStyle = [styles.button, {
    backgroundColor: hexCode,
    borderRadius: _translation.default.language === 'te' ? 25 : 20
  }];
  const containerStyle = [styles.headerContainer, {
    paddingTop: insets.top
  }, {
    backgroundColor
  }];
  const headerStyle = [styles.headerTitle, {
    color: fontColor
  }];
  const headerIconStyle = {
    tintColor: hexCode
  };
  const titleStyle = [styles.title, {
    color: fontColor
  }];
  const subTitleStyle = [styles.subtitle, {
    color: fontColor
  }];
  const startTextStyle = [styles.buttonTitle, {
    lineHeight: _translation.default.language === 'te' ? 26 : undefined
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: [styles.container, {
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
    style: headerIconStyle,
    source: require('../assets/icClose24Px.png')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/custom_survey_name_nav",
    style: headerStyle,
    numberOfLines: 1
  }, surveyName))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.main
  }, iconView, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/custom_take_survey_name",
    style: titleStyle
  }, surveyName), !!welcomeTextPlain && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/custom_take_survey_welcome_msg",
    style: subTitleStyle
  }, welcomeTextPlain), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: buttonStyle,
    onPress: onStart
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/button_custom_take_survey",
    style: startTextStyle
  }, takeSurvey))), languagesView());
};
var _default = exports.default = StartScreen;
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
    paddingHorizontal: 38,
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 24,
    opacity: 0.9,
    lineHeight: 27
  },
  subtitle: {
    lineHeight: 23,
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.72
  },
  button: {
    marginTop: 31,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    overflow: 'hidden'
  },
  buttonTitle: {
    color: _styles.Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center'
  },
  language_label: {
    fontSize: 13,
    paddingHorizontal: 8
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '12%',
    maxHeight: 90,
    flexWrap: 'wrap',
    marginHorizontal: 30
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
//# sourceMappingURL=StartScreen.js.map