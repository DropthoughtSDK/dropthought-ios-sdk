"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

var _ProgressBar = _interopRequireDefault(require("../components/ProgressBar"));

var _theme = require("../contexts/theme");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore
const SurveyHeader = props => {
  const rtl = _translation.default.dir() === 'rtl';
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    survey,
    pageIndex,
    backgroundColor,
    question,
    onClose
  } = props;
  const {
    hexCode,
    fontColor,
    themeOption,
    customFontColor
  } = (0, _theme.useTheme)();
  let color = fontColor;
  const isOption6Smiley = themeOption === _theme.THEME_OPTION.OPTION6 && (question === null || question === void 0 ? void 0 : question.type) === 'rating' && (question === null || question === void 0 ? void 0 : question.subType) === 'smiley';

  if ((customFontColor === undefined || customFontColor === '') && isOption6Smiley) {
    color = _styles.Colors.white;
  }

  const containerStyle = [styles.container, {
    paddingTop: insets.top
  }, {
    backgroundColor
  }];
  const iconStyle = {
    tintColor: hexCode
  };
  const titleStyle = [styles.title, {
    color
  }];
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.headerRowContainer, rtl && _styles.GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/icClose24Px.png')
  })), /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: titleStyle,
    numberOfLines: 1
  }, survey.surveyName)), /*#__PURE__*/React.createElement(_ProgressBar.default, {
    value: pageIndex + 1,
    maxValue: survey.pageOrder.length,
    themeColor: hexCode,
    color: color,
    rtl: rtl
  }));
};

const styles = _reactNative.StyleSheet.create({
  container: {
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
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1
  }
});

var _default = /*#__PURE__*/React.memo(SurveyHeader);

exports.default = _default;
//# sourceMappingURL=SurveyHeader.js.map