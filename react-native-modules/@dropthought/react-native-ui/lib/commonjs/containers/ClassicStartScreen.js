"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _Button = _interopRequireDefault(require("../components/Button"));

var _theme = require("../contexts/theme");

var _LanguageUtils = require("../utils/LanguageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultIconSource = require('../assets/rating.png');

const defaultIconSize = {
  [_useWindowDimensions.DimensionWidthType.phone]: 65,
  [_useWindowDimensions.DimensionWidthType.tablet]: 72
};

const ClassicStartScreen = ({
  onLanguageSelect,
  onStart,
  survey
}) => {
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const {
    themeOption,
    hexCode,
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
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
    }, _ => {}); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };

  const iconView = /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: "contain",
    style: iconStyle,
    source: iconSource
  });

  const buttonWidth = isPhone ? 143 : 160;

  const languagesView = () => {
    const {
      languages
    } = survey; // if there's only one language or no languages, no need to display

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

  const containerStyle = [shareStyles.container, {
    backgroundColor: themeOption === _theme.THEME_OPTION.BIJLIRIDE ? _styles.Colors.bijlirideBackgroundColor : backgroundColor
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.main
  }, iconView, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.title, {
      color: fontColor
    }]
  }, surveyName), !!welcomeTextPlain && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.subtitle, {
      color: fontColor
    }]
  }, welcomeTextPlain), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.divider
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    width: buttonWidth,
    title: takeSurvey,
    color: hexCode,
    onPress: onStart,
    containerStyle: styles.takeSurveyButton
  })), languagesView());
};

var _default = ClassicStartScreen;
exports.default = _default;

const shareStyles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _styles.Colors.white,
    flex: 1
  }
});

const phoneStyles = _reactNative.StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 22,
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
  divider: {
    backgroundColor: '#c3c3c3',
    height: 1,
    width: '100%',
    marginTop: 26
  },
  takeSurveyButton: {
    marginTop: 21
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
    marginHorizontal: 38
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 70,
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    lineHeight: 38,
    marginTop: 18,
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
  divider: {
    backgroundColor: '#c3c3c3',
    height: 1,
    width: '100%',
    marginTop: 46
  },
  takeSurveyButton: {
    marginTop: 37
  },
  language_label: {
    fontSize: 13,
    paddingHorizontal: 8
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '10%',
    maxHeight: 80
  }
});
//# sourceMappingURL=ClassicStartScreen.js.map