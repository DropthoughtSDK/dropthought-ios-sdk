import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { GlobalStyle, opacity30 } from '../styles';
import i18n from '../translation';

/**
 * The ProgressBar will use `value` and `maxValue` to
 * compute the percentage
 */

type Props = {
  value: number; // the current value
  maxValue: number; // the max
  themeColor: string; // the bar color
  color: string; // the bar text color
  rtl: boolean;
};

const ProgressBar = ({ value, maxValue, themeColor, color, rtl }: Props) => {
  // compute the percentage value: (value/maxValue)*100
  const percentage = Math.round((value * 100) / maxValue);

  const containerStyle = [styles.container, rtl && GlobalStyle.flexRowReverse];

  const trackStyle = [
    styles.track,
    {
      backgroundColor: opacity30(themeColor),
    },
  ];

  const progressBarStyle = [
    styles.progressBar,
    styles.track,
    {
      width: `${percentage}%`,
      backgroundColor: themeColor,
    },
  ];

  const textStyle = [
    styles.title,
    rtl && GlobalStyle.textAlignRight,
    { color },
  ];

  return (
    <View style={containerStyle}>
      <View style={trackStyle} />
      <View style={progressBarStyle} />
      <Text style={textStyle}>
        {`${i18n.t('survey:new-progress-bar')} ${value}/${maxValue}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  track: {
    borderRadius: 1,
    height: 2,
  },
  progressBar: {
    position: 'absolute',
  },
});

export default React.memo(ProgressBar);
