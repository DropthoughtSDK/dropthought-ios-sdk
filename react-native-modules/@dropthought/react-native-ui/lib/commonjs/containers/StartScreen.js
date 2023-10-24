"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
const defaultIconSource = require('../assets/rating.png');

const defaultIconSize = {
  [_useWindowDimensions.DimensionWidthType.phone]: 65,
  [_useWindowDimensions.DimensionWidthType.tablet]: 72
};
const LANG_TITLE = {
  en: 'English',
  ar: 'العربي'
};

const StartScreen = ({
  onLanguageSelect,
  onClose,
  onStart,
  survey
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const {
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  const {
    surveyProperty,
    surveyName,
    welcomeTextPlain
  } = survey;
  const {
    image,
    hexCode,
    width = defaultIconSize[dimensionWidthType],
    height = defaultIconSize[dimensionWidthType]
  } = surveyProperty;
  const iconStyle = {
    width,
    height
  };
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };

  const iconView = /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: "cover",
    style: iconStyle,
    source: iconSource
  });

  const languagesView = () => {
    const {
      languages
    } = survey; // if there's only one language or no languages, no need to display

    if (!languages || !languages.length || languages.length <= 1) return null;
    const languageView = languages.map((language, index) => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      key: index,
      onPress: () => {
        onLanguageSelect && onLanguageSelect(language);
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.language_label, {
        color: language !== survey.language ? survey.surveyProperty.hexCode : fontColor
      }]
    }, LANG_TITLE[language])));
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.languages
    }, languageView);
  };

  const buttonStyle = [styles.button, {
    backgroundColor: hexCode
  }];
  const containerStyle = [styles.headerContainer, {
    paddingTop: insets.top
  }, rtl && _styles.GlobalStyle.flexRowReverse, {
    backgroundColor
  }];
  const titleStyle = [styles.headerTitle, {
    color: fontColor
  }];
  const headerIconStyle = {
    tintColor: survey.surveyProperty.hexCode
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
    style: headerIconStyle,
    source: require('../assets/icClose24Px.png')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: titleStyle,
    numberOfLines: 1
  }, survey.surveyName))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.main
  }, iconView, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.title, {
      color: fontColor
    }]
  }, surveyName), !!welcomeTextPlain && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.subtitle, {
      color: fontColor
    }]
  }, welcomeTextPlain), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: buttonStyle,
    onPress: onStart
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.buttonTitle
  }, _translation.default.t('start-survey:start-btn')))), languagesView());
};

var _default = StartScreen;
exports.default = _default;

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
    marginRight: 19
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '12%',
    maxHeight: 90
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