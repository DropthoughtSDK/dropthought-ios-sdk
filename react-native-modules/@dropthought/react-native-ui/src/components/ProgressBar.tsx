import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { GlobalStyle, opacity30 } from '../styles';

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
      right: rtl ? 0 : undefined,
    },
  ];

  const textStyle = [
    styles.title,
    rtl && GlobalStyle.textAlignRight,
    { color },
  ];

  return (
    <View style={styles.container}>
      <View style={trackStyle} />
      <View
        // @ts-ignore
        style={progressBarStyle}
      />
      <Text
        testID="test:id/custom_preview_progress_bar"
        style={textStyle}
      >{`${value}/${maxValue}`}</Text>
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
