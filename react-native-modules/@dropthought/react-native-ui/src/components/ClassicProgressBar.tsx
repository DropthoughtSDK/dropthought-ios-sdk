import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { Colors, GlobalStyle, opacity30 } from '../styles';
import i18n from '../translation';

/**
 * The ClassicProgressBar will use `value` and `maxValue` to
 * compute the percentage
 */

type Props = {
  value: number; // the current value
  maxValue: number; // the max
  themeColor: string; // the bar color
  rtl: boolean;
};

const ClassicProgressBar = ({ value, maxValue, themeColor, rtl }: Props) => {
  const dimensionWidthType = useDimensionWidthType();

  // compute the percentage value: (value/maxValue)*100
  const percentage = Math.round((value * 100) / maxValue);

  const containerStyle = [
    styles.container,
    GlobalStyle.row,
    rtl && GlobalStyle.flexRowReverse,
  ];

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

  return (
    <View style={containerStyle}>
      {/* the progress bar */}
      <View style={GlobalStyle.flex1}>
        <View style={trackStyle} />
        <View
          // @ts-ignore
          style={progressBarStyle}
        />
      </View>
      <Text
        testID="test:id/preview_progress_percentage"
        style={[
          styles.title,
          rtl && GlobalStyle.textAlignRight,
          titleSize[dimensionWidthType],
        ]}
      >
        {/* {percentage}% of 100% completed */}
        {`${i18n.t('survey:progress-bar', { percentage })}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    color: `${Colors.progressBarText}99`,
    fontWeight: '500',
  },
  track: {
    width: '100%',
    borderRadius: 3,
    height: 6,
  },
  progressBar: {
    position: 'absolute',
  },
});

const titleSize = StyleSheet.create({
  [DimensionWidthType.phone]: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12,
  },
  [DimensionWidthType.tablet]: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14,
  },
});

export default React.memo(ClassicProgressBar);
