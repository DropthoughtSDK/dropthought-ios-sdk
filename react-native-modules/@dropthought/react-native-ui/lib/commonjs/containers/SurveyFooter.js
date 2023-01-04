"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _translation = _interopRequireDefault(require("../translation"));

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */
const SurveyFooter = props => {
  const rtl = _translation.default.dir() === 'rtl';
  const {
    surveyColor,
    isFirstPage,
    isLastPage,
    onPrevPage,
    onNextPage,
    backgroundColor
  } = props;
  const containerStyle = [styles.container, rtl && _styles.GlobalStyle.flexRowReverse, {
    backgroundColor
  }];
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  const isDarkMode = colorScheme === _theme.COLOR_SCHEMES.dark;
  const iconStyle = [styles.icon, {
    tintColor: isDarkMode ? _styles.Colors.white : surveyColor
  }];
  const iconBgStyle = [styles.iconBg, {
    tintColor: surveyColor,
    opacity: isDarkMode ? 1 : 0.1
  }];
  const submitButtonStyle = [styles.centerButtonContainer, {
    backgroundColor: surveyColor
  }];
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const submitButton = /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: submitButtonStyle,
    disabled: submitDisabled,
    onPress: () => {
      setSubmitDisabled(true);
      onNextPage();
    }
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.submitText
  }, _translation.default.t('survey:survey-submit')));
  const leftButton = /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: styles.leftButtonContainer,
    onPress: onPrevPage
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: iconBgStyle,
    source: require('../assets/icPreviousButtonBg.png')
  }), /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/icPreviousButton.png')
  })));
  const rightButton = /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: styles.rightButtonContainer,
    onPress: onNextPage
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: iconBgStyle,
    source: require('../assets/icNextButtonBg.png')
  }), /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/icNextButton.png')
  })));
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }, isFirstPage ? null : leftButton, isLastPage ? submitButton : rightButton);
};

const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 100
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0
  },
  centerButtonContainer: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    top: 14
  },
  submitText: {
    color: _styles.Colors.white,
    fontSize: 17,
    fontWeight: '600'
  },
  icon: {
    position: 'absolute',
    top: 21,
    left: 13
  },
  iconBg: {
    opacity: 0.5
  }
});

var _default = /*#__PURE__*/React.memo(SurveyFooter);

exports.default = _default;
//# sourceMappingURL=SurveyFooter.js.map