import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { i18n, useDimensionWidthType, DimensionWidthType, useTheme, THEME_OPTION, Colors } from '@dropthought/react-native-ui/src';
import CloseButton, { ICON_SIZE } from '../components/CloseButton';

/**
 * @typedef {object} Props
 * @property {string} title
 * @property {string} themeColor
 * @property {()=>void=} onClose
 */

/**
 * @type {React.FunctionComponent<Props>}
 * @param {Props} props
 */
const Header = ({
  title,
  themeColor,
  onClose
}) => {
  const {
    themeOption
  } = useTheme();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';
  const isPhone = useDimensionWidthType() === DimensionWidthType.phone;
  const backgroundColor = themeOption === THEME_OPTION.BIJLIRIDE ? Colors.bijlirideHexCode : themeColor;
  const classicHeader = /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor,
      paddingTop: insets.top
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    style: [styles.title, isPhone ? styles.titleIPhone : styles.titleAndroid]
  }, title), /*#__PURE__*/React.createElement(View, {
    style: [styles.closeButtonWrapper, isRtl ? styles.closeButtonWrapperRtl : styles.closeButtonWrapperLtr]
  }, /*#__PURE__*/React.createElement(CloseButton, {
    onPress: onClose
  }))));
  return themeOption === THEME_OPTION.CLASSIC || themeOption === THEME_OPTION.BIJLIRIDE ? classicHeader : null;
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    height: ICON_SIZE,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: ICON_SIZE
  },
  titleIPhone: {
    textAlign: 'left'
  },
  titleAndroid: {
    textAlign: 'center'
  },
  closeButtonWrapper: {
    position: 'absolute'
  },
  closeButtonWrapperRtl: {
    right: 0
  },
  closeButtonWrapperLtr: {
    left: 0
  }
});
//# sourceMappingURL=Header.js.map