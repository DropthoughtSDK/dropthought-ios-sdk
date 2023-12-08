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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      style: textStyle
    }, title);
  } else {
    content = title;
  }

  const checkboxPlaceholderStyle = [styles.checkboxPlaceholder, {
    borderRadius: type === 'radio' ? 10 : 3
  }];
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
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

var _default = /*#__PURE__*/React.memo(OptionWithHighlight);

exports.default = _default;
//# sourceMappingURL=OptionWithHighlight.js.map