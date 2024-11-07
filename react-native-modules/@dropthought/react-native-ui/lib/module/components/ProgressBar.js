import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyle, opacity30 } from '../styles';

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
  const trackStyle = [styles.track, {
    backgroundColor: opacity30(themeColor)
  }];
  const progressBarStyle = [styles.progressBar, styles.track, {
    width: `${percentage}%`,
    backgroundColor: themeColor,
    right: rtl ? 0 : undefined
  }];
  const textStyle = [styles.title, rtl && GlobalStyle.textAlignRight, {
    color
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: trackStyle
  }), /*#__PURE__*/React.createElement(View
  // @ts-ignore
  , {
    style: progressBarStyle
  }), /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/custom_preview_progress_bar",
    style: textStyle
  }, `${value}/${maxValue}`));
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