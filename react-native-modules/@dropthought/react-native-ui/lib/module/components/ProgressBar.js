import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyle, opacity30 } from '../styles';
import i18n from '../translation';
/**
 * The ProgressBar will use `value` and `maxValue` to
 * compute the percentage
 */

const ProgressBar = ({
  value,
  maxValue,
  themeColor,
  color,
  rtl
}) => {
  // compute the percentage value: (value/maxValue)*100
  const percentage = Math.round(value * 100 / maxValue);
  const containerStyle = [styles.container, rtl && GlobalStyle.flexRowReverse];
  const trackStyle = [styles.track, {
    backgroundColor: opacity30(themeColor)
  }];
  const progressBarStyle = [styles.progressBar, styles.track, {
    width: `${percentage}%`,
    backgroundColor: themeColor
  }];
  const textStyle = [styles.title, rtl && GlobalStyle.textAlignRight, {
    color
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: trackStyle
  }), /*#__PURE__*/React.createElement(View, {
    style: progressBarStyle
  }), /*#__PURE__*/React.createElement(Text, {
    style: textStyle
  }, `${i18n.t('survey:new-progress-bar')} ${value}/${maxValue}`));
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12
  },
  track: {
    borderRadius: 1,
    height: 2
  },
  progressBar: {
    position: 'absolute'
  }
});
export default /*#__PURE__*/React.memo(ProgressBar);
//# sourceMappingURL=ProgressBar.js.map