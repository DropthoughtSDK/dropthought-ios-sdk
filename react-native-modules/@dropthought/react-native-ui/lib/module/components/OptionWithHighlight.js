import * as React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { useDimensionWidthType } from '../hooks/useWindowDimensions';
import GlobalStyle, { Colors, QuestionContentTextSize, opacity15 } from '../styles';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';

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
  return /*#__PURE__*/React.createElement(Image, {
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
  checkedColor = Colors.purple,
  onPress = noop
}) {
  const {
    fontColor,
    backgroundColor
  } = useTheme();
  const dimensionWidthType = useDimensionWidthType();

  const onPressHandler = () => {
    onPress && onPress(value);
  };

  const rtl = i18n.dir() === 'rtl';
  const containerStyle = [GlobalStyle.row, styles.container, {
    // if checked, background color add opacity
    // https://css-tricks.com/8-digit-hex-codes/
    backgroundColor: checked ? opacity15(checkedColor) : backgroundColor
  }, containerStyleFromProps, rtl && GlobalStyle.flexRowReverse];
  let content;

  if (typeof title === 'string') {
    const textStyle = [styles.text, {
      color: fontColor,
      minHeight: i18n.language === 'te' ? 30 : undefined
    }, checked ? styles.checkedText : {}, QuestionContentTextSize[dimensionWidthType]];
    content = /*#__PURE__*/React.createElement(Text, {
      style: textStyle
    }, title);
  } else {
    content = title;
  }

  const checkboxPlaceholderStyle = [styles.checkboxPlaceholder, {
    borderRadius: type === 'radio' ? 10 : 3
  }];
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPressHandler
  }, /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.checkboxIconContainer
  }, checked ? /*#__PURE__*/React.createElement(CheckBoxIcon, {
    type: type,
    checkedColor: checkedColor
  }) : /*#__PURE__*/React.createElement(View, {
    style: checkboxPlaceholderStyle
  })), content));
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
    borderColor: Colors.borderColor,
    borderRadius: 10
  }
});
export default /*#__PURE__*/React.memo(OptionWithHighlight);
//# sourceMappingURL=OptionWithHighlight.js.map