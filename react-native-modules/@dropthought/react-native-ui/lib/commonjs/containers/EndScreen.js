"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
const iconSource = {
  [_theme.COLOR_SCHEMES.light]: require('../assets/rating.png'),
  [_theme.COLOR_SCHEMES.dark]: require('../assets/rating_dark.png')
};
const logoSource = {
  [_theme.COLOR_SCHEMES.light]: require('../assets/ic_dtlogo.png'),
  [_theme.COLOR_SCHEMES.dark]: require('../assets/ic_dtlogo_dark.png')
};

const EndScreen = ({
  survey,
  onClose
}) => {
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    colorScheme,
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  const rtl = _translation.default.dir() === 'rtl';
  const {
    thankYouText
  } = survey;
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: iconSource[colorScheme]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.title, {
      color: fontColor
    }]
  }, _translation.default.t('end-survey:thank')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.subtitle, {
      color: fontColor
    }]
  }, thankYouText)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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

var _default = EndScreen;
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
    lineHeight: 23,
    marginTop: 17,
    fontSize: 19,
    textAlign: 'center',
    opacity: 0.72
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