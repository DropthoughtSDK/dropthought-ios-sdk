import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { opacity10, Colors } from '../styles';
import type { Survey } from '../data';

type Props = {
  pageIndex: number;
  survey: Survey;
  rtl: boolean;
};

const SurveyPageIndicator = (props: Props) => {
  const { survey, pageIndex = 0, rtl } = props;

  const themeColor = survey.surveyProperty.hexCode;

  const dimensionWidthType = useDimensionWidthType();
  const dimensionStyles =
    dimensionWidthType === DimensionWidthType.phone
      ? phoneStyles
      : tabletStyles;

  const currentPage = survey.pages[pageIndex];

  const titleStyle = [styles.title, dimensionStyles.title];

  return (
    <View
      style={[
        styles.container,
        dimensionStyles.container,
        {
          backgroundColor: opacity10(themeColor),
        },
        rtl ? styles.rtl : {},
      ]}
    >
      <Text style={titleStyle}>{currentPage.pageTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 40,
    width: '100%',
  },
  title: {
    fontWeight: '600',
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
