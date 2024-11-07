"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _styles = _interopRequireWildcard(require("../styles"));
var _translation = _interopRequireDefault(require("../translation"));
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const noop = _id => undefined;
const iconSource = {
  radio: require('../assets/radio-on.png'),
  checkbox: require('../assets/checkbox-on.png')
};
const CheckBoxIcon = ({
  type,
  checkedColor
}) => {
  const checkedStyle = {
    tintColor: checkedColor
  };
  return /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: [styles.checkboxIcon, checkedStyle],
    source: iconSource[type]
  });
};
function OptionWithHighlight({
  type = 'radio',
  id: value,
  containerStyle: containerStyleFromProps,
  title,
  checked,
  checkedColor = _styles.Colors.purple,
  onPress = noop
}) {
  const {
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const onPressHandler = () => {
    onPress && onPress(value);
  };
  const rtl = _translation.default.dir() === 'rtl';
  const containerStyle = [_styles.default.row, styles.container, {
    // if checked, background color add opacity
    // https://css-tricks.com/8-digit-hex-codes/
    backgroundColor: checked ? (0, _styles.opacity15)(checkedColor) : backgroundColor
  }, containerStyleFromProps, rtl && _styles.default.flexRowReverse];
  let content;
  if (typeof title === 'string') {
    const textStyle = [styles.text, {
      color: fontColor,
      minHeight: _translation.default.language === 'te' ? 30 : undefined
    }, checked ? styles.checkedText : {}, _styles.QuestionContentTextSize[dimensionWidthType]];
    content = /*#__PURE__*/React.createElement(_reactNative.Text, {
      testID: `test:id/choice_option_${fontColor}`,
      style: textStyle
    }, title);
  } else {
    content = title;
  }
  const checkboxPlaceholderStyle = [styles.checkboxPlaceholder, {
    borderRadius: type === 'radio' ? 10 : 3
  }];
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    accessible: false,
    testID: `test:id/choice_selected_${checked}`,
    onPress: onPressHandler
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.checkboxIconContainer
  }, checked ? /*#__PURE__*/React.createElement(CheckBoxIcon, {
    type: type,
    checkedColor: checkedColor
  }) : /*#__PURE__*/React.createElement(_reactNative.View, {
    style: checkboxPlaceholderStyle
  })), content));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _styles.Colors.white,
    borderRadius: 3,
    borderWidth: 0,
    marginBottom: 2,
    marginTop: 2,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15
  },
  text: {
    fontWeight: 'normal',
    marginHorizontal: 12
  },
  checkedText: {
    fontWeight: '500'
  },
  checkboxIconContainer: {
    marginVertical: 3
  },
  checkboxIcon: {
    width: 20,
    aspectRatio: 1
  },
  checkboxPlaceholder: {
    width: 20,
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: _styles.Colors.borderColor,
    borderRadius: 10
  }
});
var _default = exports.default = /*#__PURE__*/React.memo(OptionWithHighlight);
//# sourceMappingURL=OptionWithHighlight.js.map