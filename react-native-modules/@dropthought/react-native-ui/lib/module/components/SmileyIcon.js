import { View, Image, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import React from 'react';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import GlobalStyle from '../styles';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';

const SmileyIcon = props => {
  const {
    fontColor
  } = useTheme();
  const dimensionWidthType = useDimensionWidthType();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const rtl = i18n.dir() === 'rtl';
  const containerStyle = isPhone ? [styles.container, rtl && GlobalStyle.flexRowReverse] : styles.container;
  return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: props.onPress
  }, /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, props.source ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Image, {
    resizeMode: "contain",
    style: styles.emoji,
    source: props.source
  }), /*#__PURE__*/React.createElement(Text, {
    style: [styles.label, props.selected ? styles.labelSelected : {}, {
      color: fontColor
    }]
  }, props.label)) : null));
};

export default SmileyIcon;
const phoneStyles = StyleSheet.create({
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
const tabletStyles = StyleSheet.create({
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