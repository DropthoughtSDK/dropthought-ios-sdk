import * as React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Colors, GlobalStyle } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

export enum PlaceholderImageTypes {
  NoInternet = 'NoInternet',
  ProgramScheduled = 'ProgramScheduled',
  ProgramExpired = 'ProgramExpired',
  ProgramDeleted = 'ProgramDeleted',
  ProgramDeactivated = 'ProgramDeactivated',
  ProgramUnavailable = 'ProgramUnavailable',
}

export type IPlaceholderImageTypesType =
  | PlaceholderImageTypes.NoInternet
  | PlaceholderImageTypes.ProgramScheduled
  | PlaceholderImageTypes.ProgramExpired
  | PlaceholderImageTypes.ProgramDeleted
  | PlaceholderImageTypes.ProgramDeactivated
  | PlaceholderImageTypes.ProgramUnavailable;

const imageTypeSources = {
  [COLOR_SCHEMES.light]: {
    [PlaceholderImageTypes.NoInternet]: require('../assets/placeholder-no-internet.png'),
    [PlaceholderImageTypes.ProgramScheduled]: require('../assets/placeholder-program-scheduled.png'),
    [PlaceholderImageTypes.ProgramExpired]: require('../assets/placeholder-program-expired.png'),
    [PlaceholderImageTypes.ProgramDeleted]: require('../assets/placeholder-program-deleted.png'),
    [PlaceholderImageTypes.ProgramDeactivated]: require('../assets/placeholder-program-deactivated.png'),
    [PlaceholderImageTypes.ProgramUnavailable]: require('../assets/placeholder-program-unavailable.png'),
  },
  [COLOR_SCHEMES.dark]: {
    [PlaceholderImageTypes.NoInternet]: require('../assets/placeholder-no-internet_dark.png'),
    [PlaceholderImageTypes.ProgramScheduled]: require('../assets/placeholder-program-scheduled_dark.png'),
    [PlaceholderImageTypes.ProgramExpired]: require('../assets/placeholder-program-expired_dark.png'),
    [PlaceholderImageTypes.ProgramDeleted]: require('../assets/placeholder-program-deleted_dark.png'),
    [PlaceholderImageTypes.ProgramDeactivated]: require('../assets/placeholder-program-deactivated_dark.png'),
    [PlaceholderImageTypes.ProgramUnavailable]: require('../assets/placeholder-program-unavailable_dark.png'),
  },
};

type Props = {
  message?: string;
  imageSource?: string;
  imageType: IPlaceholderImageTypesType;
  children?: React.ReactNode;
};

const PlaceholderScreen = ({
  message,
  imageSource,
  imageType,
  children,
}: Props) => {
  const title = i18n.t(`placeholder-title:${imageType}`, undefined);
  const { colorScheme, fontColor, backgroundColor } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        // @ts-ignore
        source={imageTypeSources[colorScheme][imageType] || imageSource}
        style={styles.image}
      />

      <View style={styles.body}>
        {title && (
          <Text style={[styles.title, { color: fontColor }]}>{title}</Text>
        )}

        {message && (
          <Text
            style={[
              styles.message,
              {
                color: fontColor,
              },
              colorScheme === COLOR_SCHEMES.dark
                ? styles.messageDark
                : styles.messageLight,
            ]}
          >
            {message}
          </Text>
        )}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.flex1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  body: {
    paddingHorizontal: 60,
  },
  title: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 22,
    color: Colors.placeholderText,
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.placeholderText,
  },
  messageLight: {
    opacity: 1,
  },
  messageDark: {
    opacity: 0.75,
  },
});

export default PlaceholderScreen;
