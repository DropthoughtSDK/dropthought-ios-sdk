import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Colors } from '../styles';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type { Survey } from '../data';

const iconSource = {
  [COLOR_SCHEMES.light]: require('../assets/rating.png'),
  [COLOR_SCHEMES.dark]: require('../assets/rating_dark.png'),
};

const logoSource = require('../assets/ic_dtlogo.png');

type Props = {
  survey: Survey;
};

const ClassicEndScreen = ({ survey }: Props) => {
  const dimensionWidthType = useDimensionWidthType();
  const { colorScheme, fontColor, backgroundColor } = useTheme();

  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const iconStyle = styles.icon;
  const { thankYouText } = survey;

  return (
    <View style={[shareStyles.container, { backgroundColor }]}>
      <View style={styles.main}>
        {/* @ts-ignore */}
        <Image style={iconStyle} source={iconSource[colorScheme]} />
        <Text style={[styles.title, { color: fontColor }]}>
          {i18n.t('end-survey:thank')}
        </Text>
        <Text style={[styles.subtitle, { color: fontColor }]}>
          {thankYouText}
        </Text>
      </View>
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Text style={styles.power_by}>Powered by </Text>
          <Image style={styles.dtLogo} source={logoSource} />
        </View>
        <Text style={[styles.power_by_bold, { color: fontColor }]}>
          dropthought
        </Text>
      </View>
    </View>
  );
};

export default ClassicEndScreen;

const shareStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
  },
});

const phoneStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
  },
  icon: {
    height: 65,
    width: 65,
  },
  title: {
    lineHeight: 27,
    marginTop: 44,
    fontSize: 22,
    opacity: 0.9,
  },
  subtitle: {
    lineHeight: 23,
    marginTop: 17,
    fontSize: 19,
    textAlign: 'center',
    opacity: 0.72,
  },
  vertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 83,
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  power_by: {
    color: Colors.settingsGreyText,
    fontSize: 9,
  },
  power_by_bold: {
    fontSize: 12,
    fontWeight: '500',
  },
  dtLogo: {
    height: 15,
    width: 15,
  },
});

const tabletStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 70,
  },
  icon: {
    height: 72,
    width: 72,
  },
  title: {
    lineHeight: 38,
    marginTop: 44,
    fontSize: 31,
    opacity: 0.9,
  },
  subtitle: {
    lineHeight: 25,
    marginTop: 17,
    fontSize: 21,
    textAlign: 'center',
    opacity: 0.72,
  },
  vertical: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 67,
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  power_by: {
    color: Colors.settingsGreyText,
    fontSize: 12,
  },
  power_by_bold: {
    fontSize: 15,
    fontWeight: '500',
  },
  dtLogo: {
    height: 17,
    width: 17,
  },
});
