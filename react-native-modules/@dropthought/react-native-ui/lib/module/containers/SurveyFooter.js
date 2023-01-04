/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, GlobalStyle } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

const SurveyFooter = props => {
  const rtl = i18n.dir() === 'rtl';
  const {
    surveyColor,
    isFirstPage,
    isLastPage,
    onPrevPage,
    onNextPage,
    backgroundColor
  } = props;
  const containerStyle = [styles.container, rtl && GlobalStyle.flexRowReverse, {
    backgroundColor
  }];
  const {
    colorScheme
  } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const iconStyle = [styles.icon, {
    tintColor: isDarkMode ? Colors.white : surveyColor
  }];
  const iconBgStyle = [styles.iconBg, {
    tintColor: surveyColor,
    opacity: isDarkMode ? 1 : 0.1
  }];
  const submitButtonStyle = [styles.centerButtonContainer, {
    backgroundColor: surveyColor
  }];
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const submitButton = /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: submitButtonStyle,
    disabled: submitDisabled,
    onPress: () => {
      setSubmitDisabled(true);
      onNextPage();
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.submitText
  }, i18n.t('survey:survey-submit')));
  const leftButton = /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.leftButtonContainer,
    onPress: onPrevPage
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Image, {
    style: iconBgStyle,
    source: require('../assets/icPreviousButtonBg.png')
  }), /*#__PURE__*/React.createElement(Image, {
    style: iconStyle,
    source: require('../assets/icPreviousButton.png')
  })));
  const rightButton = /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.rightButtonContainer,
    onPress: onNextPage
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Image, {
    style: iconBgStyle,
    source: require('../assets/icNextButtonBg.png')
  }), /*#__PURE__*/React.createElement(Image, {
    style: iconStyle,
    source: require('../assets/icNextButton.png')
  })));
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, isFirstPage ? null : leftButton, isLastPage ? submitButton : rightButton);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 100
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0
  },
  centerButtonContainer: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    top: 14
  },
  submitText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600'
  },
  icon: {
    position: 'absolute',
    top: 21,
    left: 13
  },
  iconBg: {
    opacity: 0.5
  }
});
export default /*#__PURE__*/React.memo(SurveyFooter);
//# sourceMappingURL=SurveyFooter.js.map