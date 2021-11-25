import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { Colors, GlobalStyle, opacity30 } from '../styles';
import i18n from '../translation';
/**
 * The ProgressBar will use `value` and `maxValue` to
 * compute the percentage
 */

const ProgressBar = ({
  value,
  maxValue,
  themeColor,
  rtl
}) => {
  const dimensionWidthType = useDimensionWidthType(); // compute the percentage value: (value/maxValue)*100

  const percentage = Math.round(value * 100 / maxValue);
  const containerStyle = [styles.container, GlobalStyle.row, rtl && GlobalStyle.flexRowReverse];
  const trackStyle = [styles.track, {
    backgroundColor: opacity30(themeColor)
  }];
  const progressBarStyle = [styles.progressBar, styles.track, {
    width: `${percentage}%`,
    backgroundColor: themeColor
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, /*#__PURE__*/React.createElement(View, {
    style: trackStyle
  }), /*#__PURE__*/React.createElement(View, {
    style: progressBarStyle
  })), /*#__PURE__*/React.createElement(Text, {
    style: [styles.title, rtl && GlobalStyle.textAlignRight, titleSize[dimensionWidthType]]
  }, i18n.t('survey:progress-bar', {
    percentage
  })));
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12
  },
  title: {
    color: `${Colors.progressBarText}99`,
    fontWeight: '500'
  },
  track: {
    width: '100%',
    borderRadius: 3,
    height: 6
  },
  progressBar: {
    position: 'absolute'
  }
});
const titleSize = StyleSheet.create({
  [DimensionWidthType.phone]: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12
  },
  [DimensionWidthType.tablet]: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14
  }
});
export default /*#__PURE__*/React.memo(ProgressBar);
//# sourceMappingURL=ProgressBar.js.map