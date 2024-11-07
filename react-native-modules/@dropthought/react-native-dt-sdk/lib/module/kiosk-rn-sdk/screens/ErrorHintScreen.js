/**
 * This Fake Screen is used when you need a header, but it is not in any navigation
 * it is used to display the placeholder when unable to fetch survey
 */
import React from 'react';
import { StyleSheet, View, StatusBar, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyle, useTheme, COLOR_SCHEMES, THEME_OPTION, i18n } from '@dropthought/react-native-ui';
import CloseButton, { ICON_SIZE } from '../components/CloseButton';
import { useSurveyContext } from '../contexts/survey/SurveyContext';
const ErrorHintScreen = ({
  onClose,
  hideCloseButton = false,
  children
}) => {
  const {
    backgroundColor,
    colorScheme,
    fontColor,
    hexCode,
    themeOption
  } = useTheme();
  const {
    survey
  } = useSurveyContext();
  const isRtl = i18n.dir() === 'rtl';
  const isBijliride = themeOption === THEME_OPTION.BIJLIRIDE;
  const headerTextStyle = [styles.title, {
    color: fontColor
  }];
  const header = /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    style: headerTextStyle
  }, (survey === null || survey === void 0 ? void 0 : survey.surveyName) || ''), /*#__PURE__*/React.createElement(View, {
    style: [styles.closeButtonWrapper, isRtl ? styles.closeButtonWrapperRtl : styles.closeButtonWrapperLtr]
  }, /*#__PURE__*/React.createElement(CloseButton, {
    onPress: onClose,
    tintColor: hexCode || fontColor
  }))));
  return /*#__PURE__*/React.createElement(React.Fragment, null, Platform.OS === 'android' && /*#__PURE__*/React.createElement(StatusBar, {
    backgroundColor: backgroundColor,
    barStyle: colorScheme === COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
  }), /*#__PURE__*/React.createElement(SafeAreaView, {
    style: [GlobalStyle.flex1, {
      backgroundColor
    }]
  }, hideCloseButton || isBijliride ? null : header, /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, children)));
};
export default ErrorHintScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    height: ICON_SIZE,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: ICON_SIZE,
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
//# sourceMappingURL=ErrorHintScreen.js.map