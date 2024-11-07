"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _styles = _interopRequireDefault(require("../styles"));
var _translation = _interopRequireDefault(require("../translation"));
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SmileyIcon = props => {
  const {
    fontColor
  } = (0, _theme.useTheme)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const rtl = _translation.default.dir() === 'rtl';
  const containerStyle = isPhone ? [styles.container, rtl && _styles.default.flexRowReverse] : styles.container;
  const textStyle = [styles.label, props.selected ? styles.labelSelected : {}, {
    color: fontColor,
    minHeight: _translation.default.language === 'te' ? 30 : undefined
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    accessible: false,
    testID: props.testID,
    onPress: props.onPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, props.source ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: "contain",
    style: styles.emoji,
    source: props.source
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: `test:id/smiley_label_${fontColor}`,
    style: textStyle
  }, props.label)) : null));
};
var _default = exports.default = SmileyIcon;
const phoneStyles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 65
  },
  emoji: {
    height: 51,
    width: 51
  },
  label: {
    marginLeft: 20,
    fontSize: 17,
    marginRight: 20,
    flex: 1
  },
  labelSelected: {
    fontWeight: '500'
  }
});
const tabletStyles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 50,
    flex: 1,
    maxWidth: 70
  },
  emoji: {
    height: 68,
    marginTop: 20,
    width: 68
  },
  label: {
    alignSelf: 'center',
    marginTop: 11,
    textAlign: 'center'
  },
  labelSelected: {}
});
//# sourceMappingURL=SmileyIcon.js.map