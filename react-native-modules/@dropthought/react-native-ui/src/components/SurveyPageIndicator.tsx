import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { opacity10, opacity60, Colors } from '../styles';
import type { Survey } from '../data';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import i18n from '../translation';

type Props = {
  pageIndex: number;
  survey: Survey;
  rtl: boolean;
};

const SurveyPageIndicator = (props: Props) => {
  const { survey, pageIndex = 0, rtl } = props;
  const { hexCode, colorScheme } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const themeColor = hexCode;

  const dimensionWidthType = useDimensionWidthType();
  const dimensionStyles =
    dimensionWidthType === DimensionWidthType.phone
      ? phoneStyles
      : tabletStyles;

  const currentPage = survey.pages[pageIndex];

  const textStyle = [
    styles.title,
    dimensionStyles.title,
    isDarkMode && styles.darkModeTitle,
    { paddingBottom: i18n.language === 'te' ? 5 : 0 },
  ];
  return (
    <View
      style={[
        styles.container,
        dimensionStyles.container,
        {
          backgroundColor: opacity10(themeColor),
        },
        isDarkMode && styles.darkModeContainer,
        rtl ? styles.rtl : {},
      ]}
    >
      <Text style={textStyle}>{currentPage.pageTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 40,
    width: '100%',
  },
  darkModeContainer: {
    backgroundColor: '#39393a',
  },
  title: {
    fontWeight: '600',
  },
  darkModeTitle: {
    color: opacity60(Colors.white),
  },
  rtl: {
    alignItems: 'flex-end',
  },
});

const phoneStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 14,
    letterSpacing: 0.42,
    color: Colors.progressBarText,
  },
});

const tabletStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.48,
  },
});

export default React.memo(SurveyPageIndicator);
