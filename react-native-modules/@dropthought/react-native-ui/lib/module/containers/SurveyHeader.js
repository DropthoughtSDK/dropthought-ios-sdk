import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyle, Colors } from '../styles';
import i18n from '../translation';
import ProgressBar from '../components/ProgressBar';
import { useTheme, THEME_OPTION } from '../contexts/theme'; // @ts-ignore

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SurveyHeader = props => {
  const rtl = i18n.dir() === 'rtl';
  const insets = useSafeAreaInsets();
  const {
    survey,
    pageIndex,
    backgroundColor,
    question,
    onClose
  } = props;
  const {
    hexCode,
    fontColor,
    themeOption,
    customFontColor
  } = useTheme();
  let color = fontColor;
  const isOption6Smiley = themeOption === THEME_OPTION.OPTION6 && (question === null || question === void 0 ? void 0 : question.type) === 'rating' && (question === null || question === void 0 ? void 0 : question.subType) === 'smiley';

  if ((customFontColor === undefined || customFontColor === '') && isOption6Smiley) {
    color = Colors.white;
  }

  const containerStyle = [styles.container, {
    paddingTop: insets.top
  }, {
    backgroundColor
  }];
  const iconStyle = {
    tintColor: hexCode
  };
  const titleStyle = [styles.title, {
    color
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.headerRowContainer, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(Image, {
    style: iconStyle,
    source: require('../assets/icClose24Px.png')
  })), /*#__PURE__*/React.createElement(Text, {
    style: titleStyle,
    numberOfLines: 1
  }, survey.surveyName)), /*#__PURE__*/React.createElement(ProgressBar, {
    value: pageIndex + 1,
    maxValue: survey.pageOrder.length,
    themeColor: hexCode,
    color: color,
    rtl: rtl
  }));
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginTop: 17
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1
  }
});
export default /*#__PURE__*/React.memo(SurveyHeader);
//# sourceMappingURL=SurveyHeader.js.map