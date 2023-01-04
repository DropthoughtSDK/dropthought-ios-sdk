"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = require("../styles");

var _theme = require("../contexts/theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const noop = _id => undefined;

const Icon = ({
  type,
  checked,
  themeColor
}) => {
  const {
    fontColor,
    colorScheme,
    backgroundColor
  } = (0, _theme.useTheme)();
  const checkboxContainerStyle = [styles.checkboxBorderBox, {
    borderColor: colorScheme === _theme.COLOR_SCHEMES.dark ? fontColor : themeColor,
    backgroundColor: (0, _styles.addOpacityToColor)(colorScheme === _theme.COLOR_SCHEMES.dark ? backgroundColor : themeColor, 0.1)
  }];
  const checkboxContentStyle = [styles.checkboxContent, {
    backgroundColor: themeColor,
    opacity: checked ? 1 : 0
  }];
  const radioContainerStyle = [styles.radioBorderBox, {
    borderColor: themeColor,
    backgroundColor: (0, _styles.addOpacityToColor)(colorScheme === _theme.COLOR_SCHEMES.dark ? themeColor : backgroundColor, 0.1)
  }];
  const radioContentStyle = [styles.radioContent, {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.dark ? fontColor : themeColor,
    opacity: checked ? 1 : 0
  }];
  let content;

  if (type === 'checkbox') {
    content = checked ? /*#__PURE__*/React.createElement(_reactNative.View, {
      style: checkboxContentStyle
    }, /*#__PURE__*/React.createElement(_reactNative.Image, {
      source: require('../assets/ic-check.png')
    })) : /*#__PURE__*/React.createElement(_reactNative.View, {
      style: checkboxContainerStyle
    });
  } else {
    content = /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: radioContainerStyle
    }), checked ? /*#__PURE__*/React.createElement(_reactNative.View, {
      style: radioContentStyle
    }) : null);
  }

  return /*#__PURE__*/React.createElement(_reactNative.View, null, content);
};

function NewOptionWithHighlight({
  type = 'radio',
  id: value,
  title,
  checked,
  themeColor,
  onPress = noop
}) {
  const {
    fontColor,
    colorScheme,
    backgroundColor
  } = (0, _theme.useTheme)();
  const appearanceBackgroundColor = (0, _styles.addOpacityToColor)(colorScheme === _theme.COLOR_SCHEMES.dark ? _styles.Colors.appearanceSubBlack : themeColor, 0.08);
  const buttonContainerSelected = {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.dark ? (0, _styles.addOpacityToColor)(themeColor, 0.3) : appearanceBackgroundColor,
    borderColor: themeColor,
    color: colorScheme === _theme.COLOR_SCHEMES.dark ? fontColor : themeColor
  };
  const buttonContainerStyle = {
    backgroundColor: appearanceBackgroundColor,
    borderColor: backgroundColor,
    color: fontColor
  };
  const containerStyle = checked ? [styles.buttonContainer, buttonContainerStyle, buttonContainerSelected] : [styles.buttonContainer, buttonContainerStyle];
  const textStyle = checked ? {
    color: colorScheme === _theme.COLOR_SCHEMES.dark ? fontColor : themeColor
  } : {
    color: fontColor
  };
  let content;

  if (typeof title === 'string') {
    content = /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: textStyle
    }, title);
  } else {
    content = title;
  }

  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    onPress: () => onPress(value)
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(Icon, {
    type: type,
    checked: checked,
    themeColor: themeColor
  }), content, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.dummyComponent
  })));
}

const styles = _reactNative.StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingHorizontal: 13
  },
  checkboxContent: {
    width: 18,
    height: 18,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxBorderBox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1
  },
  radioContent: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 10,
    height: 10,
    borderRadius: 8
  },
  radioBorderBox: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2
  },
  dummyComponent: {
    width: 18,
    height: 18
  }
});

var _default = /*#__PURE__*/React.memo(NewOptionWithHighlight);

exports.default = _default;
//# sourceMappingURL=NewOptionWithHighlight.js.map