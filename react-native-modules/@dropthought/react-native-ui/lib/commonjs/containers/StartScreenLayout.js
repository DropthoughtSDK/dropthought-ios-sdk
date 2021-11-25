"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _Button = _interopRequireDefault(require("../components/Button"));

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  onStart,
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
    surveyName,
    welcomeText
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

  const buttonWidth = isPhone ? 143 : 160;

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

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [shareStyles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.main
  }, iconView, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.title, {
      color: fontColor
    }]
  }, surveyName), !!welcomeText && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.subtitle, {
      color: fontColor
    }]
  }, welcomeText), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.divider
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    width: buttonWidth,
    title: _translation.default.t('start-survey:start-btn'),
    color: hexCode,
    onPress: () => {
      onStart();
    },
    containerStyle: styles.takeSurveyButton
  })), languagesView());
};

var _default = StartScreen;
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
    marginRight: 19
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '12%',
    maxHeight: 90
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
    marginRight: 19
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '10%',
    maxHeight: 80
  }
});
//# sourceMappingURL=StartScreenLayout.js.map