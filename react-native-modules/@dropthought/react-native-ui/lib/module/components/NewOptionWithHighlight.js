import * as React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Colors, addOpacityToColor } from '../styles';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import i18n from '../translation';
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
  } = useTheme();
  const checkboxContainerStyle = [styles.checkboxBorderBox, {
    borderColor: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor,
    backgroundColor: addOpacityToColor(colorScheme === COLOR_SCHEMES.dark ? backgroundColor : themeColor, 0.1)
  }];
  const checkboxContentStyle = [styles.checkboxContent, {
    backgroundColor: themeColor,
    opacity: checked ? 1 : 0
  }];
  const radioContainerStyle = [styles.radioBorderBox, {
    borderColor: themeColor,
    backgroundColor: addOpacityToColor(colorScheme === COLOR_SCHEMES.dark ? themeColor : backgroundColor, 0.1)
  }];
  const radioContentStyle = [styles.radioContent, {
    backgroundColor: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor,
    opacity: checked ? 1 : 0
  }];
  let content;
  if (type === 'checkbox') {
    content = checked ? /*#__PURE__*/React.createElement(View, {
      style: checkboxContentStyle
    }, /*#__PURE__*/React.createElement(Image, {
      source: require('../assets/ic-check.png')
    })) : /*#__PURE__*/React.createElement(View, {
      style: checkboxContainerStyle
    });
  } else {
    content = /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
      style: radioContainerStyle
    }), checked ? /*#__PURE__*/React.createElement(View, {
      style: radioContentStyle
    }) : null);
  }
  return /*#__PURE__*/React.createElement(View, null, content);
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
  } = useTheme();
  const appearanceBackgroundColor = addOpacityToColor(colorScheme === COLOR_SCHEMES.dark ? Colors.appearanceSubBlack : themeColor, 0.08);
  const buttonContainerSelected = {
    backgroundColor: colorScheme === COLOR_SCHEMES.dark ? addOpacityToColor(themeColor, 0.3) : appearanceBackgroundColor,
    borderColor: themeColor,
    color: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor
  };
  const buttonContainerStyle = {
    backgroundColor: appearanceBackgroundColor,
    borderColor: backgroundColor,
    color: fontColor
  };
  const containerStyle = checked ? [styles.buttonContainer, buttonContainerStyle, buttonContainerSelected] : [styles.buttonContainer, buttonContainerStyle];
  const textStyle = checked ? {
    color: colorScheme === COLOR_SCHEMES.dark ? fontColor : themeColor
  } : {
    color: fontColor,
    lineHeight: i18n.language === 'te' ? 22 : undefined
  };
  let content;
  if (typeof title === 'string') {
    content = /*#__PURE__*/React.createElement(Text, {
      style: textStyle
    }, title);
  } else {
    content = title;
  }
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => onPress(value)
  }, /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(Icon, {
    type: type,
    checked: checked,
    themeColor: themeColor
  }), content, /*#__PURE__*/React.createElement(View, {
    style: styles.dummyComponent
  })));
}
const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
    paddingVertical: 9,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
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
export default /*#__PURE__*/React.memo(NewOptionWithHighlight);
//# sourceMappingURL=NewOptionWithHighlight.js.map