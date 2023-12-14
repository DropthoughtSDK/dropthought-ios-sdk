/**
 * This Fake Screen is used when you need a header, but it is not in any navigation
 * it is used to display the placeholder when unable to fetch survey
 */
import React from 'react';
import { StyleSheet, View, StatusBar, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GlobalStyle,
  useTheme,
  COLOR_SCHEMES,
  THEME_OPTION,
  i18n,
} from '@dropthought/react-native-ui';
import CloseButton, { ICON_SIZE } from '../components/CloseButton';
import { useSurveyContext } from '../contexts/survey';

const ErrorHintScreen = ({ onClose, hideCloseButton = false, children }) => {
  const { backgroundColor, colorScheme, fontColor, hexCode, themeOption } =
    useTheme();
  const { survey } = useSurveyContext();
  const isRtl = i18n.dir() === 'rtl';
  const isClassicOrBijliride =
    themeOption === THEME_OPTION.CLASSIC ||
    themeOption === THEME_OPTION.BIJLIRIDE;
  const headerTextStyle = [styles.title, { color: fontColor }];

  const header = (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={headerTextStyle}>
          {survey?.surveyName || ''}
        </Text>
        <View
          style={[
            styles.closeButtonWrapper,
            isRtl ? styles.closeButtonWrapperRtl : styles.closeButtonWrapperLtr,
          ]}
        >
          <CloseButton onPress={onClose} tintColor={hexCode || fontColor} />
        </View>
      </View>
    </View>
  );

  return (
    <>
      {Platform.OS === 'android' && (
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={
            colorScheme === COLOR_SCHEMES.dark
              ? 'light-content'
              : 'dark-content'
          }
        />
      )}
      <SafeAreaView style={[GlobalStyle.flex1, { backgroundColor }]}>
        {hideCloseButton || isClassicOrBijliride ? null : header}
        <View style={GlobalStyle.flex1}>{children}</View>
      </SafeAreaView>
    </>
  );
};

export default ErrorHintScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: ICON_SIZE,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: ICON_SIZE,
    textAlign: 'center',
  },
  closeButtonWrapper: {
    position: 'absolute',
  },
  closeButtonWrapperRtl: {
    right: 0,
  },
  closeButtonWrapperLtr: { left: 0 },
});
