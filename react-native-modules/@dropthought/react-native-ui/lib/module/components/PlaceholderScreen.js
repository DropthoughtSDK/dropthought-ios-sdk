import * as React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Colors, GlobalStyle } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
export let PlaceholderImageTypes = /*#__PURE__*/function (PlaceholderImageTypes) {
  PlaceholderImageTypes["NoInternet"] = "NoInternet";
  PlaceholderImageTypes["ProgramScheduled"] = "ProgramScheduled";
  PlaceholderImageTypes["ProgramExpired"] = "ProgramExpired";
  PlaceholderImageTypes["ProgramDeleted"] = "ProgramDeleted";
  PlaceholderImageTypes["ProgramDeactivated"] = "ProgramDeactivated";
  PlaceholderImageTypes["ProgramUnavailable"] = "ProgramUnavailable";
  return PlaceholderImageTypes;
}({});
const imageTypeSources = {
  [COLOR_SCHEMES.light]: {
    [PlaceholderImageTypes.NoInternet]: require('../assets/placeholder-no-internet.png'),
    [PlaceholderImageTypes.ProgramScheduled]: require('../assets/placeholder-program-scheduled.png'),
    [PlaceholderImageTypes.ProgramExpired]: require('../assets/placeholder-program-expired.png'),
    [PlaceholderImageTypes.ProgramDeleted]: require('../assets/placeholder-program-deleted.png'),
    [PlaceholderImageTypes.ProgramDeactivated]: require('../assets/placeholder-program-deactivated.png'),
    [PlaceholderImageTypes.ProgramUnavailable]: require('../assets/placeholder-program-unavailable.png')
  },
  [COLOR_SCHEMES.dark]: {
    [PlaceholderImageTypes.NoInternet]: require('../assets/placeholder-no-internet_dark.png'),
    [PlaceholderImageTypes.ProgramScheduled]: require('../assets/placeholder-program-scheduled_dark.png'),
    [PlaceholderImageTypes.ProgramExpired]: require('../assets/placeholder-program-expired_dark.png'),
    [PlaceholderImageTypes.ProgramDeleted]: require('../assets/placeholder-program-deleted_dark.png'),
    [PlaceholderImageTypes.ProgramDeactivated]: require('../assets/placeholder-program-deactivated_dark.png'),
    [PlaceholderImageTypes.ProgramUnavailable]: require('../assets/placeholder-program-unavailable_dark.png')
  }
};
const PlaceholderScreen = ({
  message,
  imageSource,
  imageType,
  children
}) => {
  const title = i18n.t(`placeholder-title:${imageType}`, undefined);
  const {
    colorScheme,
    fontColor,
    backgroundColor
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(Image
  // @ts-ignore
  , {
    source: imageTypeSources[colorScheme][imageType] || imageSource,
    style: styles.image
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.body
  }, title && /*#__PURE__*/React.createElement(Text, {
    style: [styles.title, {
      color: fontColor
    }]
  }, title), message && /*#__PURE__*/React.createElement(Text, {
    style: [styles.message, {
      color: fontColor
    }, colorScheme === COLOR_SCHEMES.dark ? styles.messageDark : styles.messageLight]
  }, message), children));
};
const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.flex1,
    backgroundColor: Colors.white,
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  body: {
    paddingHorizontal: 60
  },
  title: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 22,
    color: Colors.placeholderText
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.placeholderText
  },
  messageLight: {
    opacity: 1
  },
  messageDark: {
    opacity: 0.75
  }
});
export default PlaceholderScreen;
//# sourceMappingURL=PlaceholderScreen.js.map