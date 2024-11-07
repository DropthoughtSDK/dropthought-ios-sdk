import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../styles';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { useTheme } from '../contexts/theme';
import type { Survey } from '../data';
import { GlobalStyle } from '../styles';
import HtmlText from '../components/HtmlText';

const logoSource = require('../assets/ic_dtlogo.png');

const defaultIconSource = require('../assets/rating.png');
const defaultIconSize = {
  [DimensionWidthType.phone]: 65,
  [DimensionWidthType.tablet]: 72,
};

type Props = {
  survey: Survey;
  onClose: () => void;
};

const ClassicEndScreen = ({ survey, onClose }: Props) => {
  const dimensionWidthType = useDimensionWidthType();
  const { fontColor, backgroundColor, autoClose, autoCloseCountdown } =
    useTheme();

  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;

  const { surveyProperty, thankYouText } = survey;

  const { image } = surveyProperty;
  const [imageHeight, setImageHeight] = useState(65);
  const iconStyle = {
    width: '100%',
    height: imageHeight,
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoClose) {
      timer = setTimeout(onClose, autoCloseCountdown);
    }

    Image.getSize(
      image,
      (_, height) => {
        if (height < defaultIconSize[dimensionWidthType]) {
          setImageHeight(height);
        }
      },
      (_) => {}
    );

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconSource = image === undefined ? defaultIconSource : { uri: image };

  const iconView = (
    <View style={GlobalStyle.row}>
      <Image
        resizeMode="contain"
        // @ts-ignore
        style={iconStyle}
        source={iconSource}
      />
    </View>
  );

  return (
    <View style={[shareStyles.container, { backgroundColor }]}>
      <View style={styles.main}>
        {iconView}
        {thankYouText && (
          <View style={styles.subtitle}>
            <HtmlText
              accessibilityLabel={`thankful_${thankYouText}`}
              html={thankYouText}
              width={Dimensions.get('window').width - 76}
              maxHeight={Dimensions.get('window').height * 0.4}
            />
          </View>
        )}
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
  title: {
    lineHeight: 27,
    marginTop: 44,
    fontSize: 22,
    opacity: 0.9,
  },
  subtitle: {
    marginTop: 17,
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
    marginTop: 17,
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
