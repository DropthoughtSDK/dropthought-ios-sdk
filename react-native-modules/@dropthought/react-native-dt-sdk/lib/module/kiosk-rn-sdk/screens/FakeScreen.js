/**
 * This Fake Screen is used when you need a header, but it is not in any navigation
 * it is used to display the placeholder when unable to fetch survey
 */
import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle, Colors, useTheme, COLOR_SCHEMES } from '@dropthought/react-native-ui';
import CloseButton from '../components/CloseButton';

const FakeScreen = ({
  onClose,
  children
}) => {
  const {
    backgroundColor,
    colorScheme
  } = useTheme();
  return /*#__PURE__*/React.createElement(React.Fragment, null, Platform.OS === 'android' && /*#__PURE__*/React.createElement(StatusBar, {
    backgroundColor: backgroundColor,
    barStyle: colorScheme === COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
  }), /*#__PURE__*/React.createElement(SafeAreaView, {
    style: [GlobalStyle.flex1, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(CloseButton, {
    tintColor: Colors.purple,
    onPress: onClose
  }), /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, children)));
};

export default FakeScreen;
//# sourceMappingURL=FakeScreen.js.map