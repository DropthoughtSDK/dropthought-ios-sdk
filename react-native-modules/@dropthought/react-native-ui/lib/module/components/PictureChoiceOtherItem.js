import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Platform, PermissionsAndroid, Text, Dimensions } from 'react-native';
import GlobalStyle, { Colors, addOpacityToHex } from '../styles';
import i18n from '../translation';
import ActivityIndicatorMask from './ActivityIndicatorMask';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ChooseIcon } from './PictureChoiceItem';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
const MAXIMUM_SIZE_KB = 5 * 1024 * 1024; // 2MB

const PictureChoiceOtherItem = ({
  otherPicture,
  isMultipleChoice,
  selected,
  placeholder,
  columnGap,
  onChooseImage,
  onSelect,
  onUpload,
  isUploading,
  onError,
  onChangeText,
  themeColor
}) => {
  const {
    fontColor,
    colorScheme
  } = useTheme();
  const {
    width
  } = Dimensions.get('window');
  const questionMargin = 30;
  const itemWidth = (width - 2 * questionMargin - columnGap) / 2;
  const [imageLoadError, setImageLoadError] = useState(false);
  const pictureSelectedStyle = [styles.pictureSelected, {
    width: itemWidth,
    borderColor: themeColor
  }];
  const iconStyle = {
    tintColor: themeColor
  };
  const nonSelectedOtherPictureContainerStyle = [styles.nonSelectedOtherPictureContainer, {
    backgroundColor: addOpacityToHex(themeColor, 0.1),
    borderColor: themeColor,
    width: itemWidth
  }];
  const [loadingImage, setLoadingImage] = useState(false);
  const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  const uploadPicture = response => {
    var _response$assets;

    if (response !== null && response !== void 0 && response.assets && (response === null || response === void 0 ? void 0 : (_response$assets = response.assets) === null || _response$assets === void 0 ? void 0 : _response$assets.length) > 0) {
      const {
        uri,
        fileName: name,
        type,
        fileSize
      } = response.assets[0];

      if (type && !validTypes.includes(type)) {
        onError(`${i18n.t('picture-choice:invalidTypeHint')}`);
      } else if (fileSize && fileSize > MAXIMUM_SIZE_KB) {
        onError(`${i18n.t('picture-choice:overSizeHint')}`);
      } else {
        if (uri && name && type) {
          const file = {
            uri,
            name,
            type
          };
          onUpload(file);
          onChooseImage();
        }
      }
    }
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === PermissionsAndroid.RESULTS.GRANTED;
  }

  const openPhotoLibrary = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo'
    };
    launchImageLibrary(options, uploadPicture);
  };

  const openCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo'
    };

    if (Platform.OS === 'android') {
      hasAndroidPermission().then(result => {
        if (result) {
          launchCamera(options, uploadPicture);
        }
      });
    } else {
      launchCamera(options, uploadPicture);
    }
  };

  const showChooseAlert = () => {
    Alert.alert(`${i18n.t('picture-choice:chooseImageTitle')}`, undefined, [{
      text: `${i18n.t('picture-choice:camera')}`,
      onPress: openCamera
    }, {
      text: `${i18n.t('picture-choice:photoLibrary')}`,
      onPress: openPhotoLibrary
    }, {
      text: `${i18n.t('picture-choice:cancel')}`,
      style: 'cancel'
    }]);
  };

  const placeholderTextStyle = colorScheme === COLOR_SCHEMES.dark ? [styles.placeholderText, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : Colors.appearanceSubBlack
  }] : [styles.placeholderText, {
    color: fontColor
  }];
  const optionalTextStyle = colorScheme === COLOR_SCHEMES.dark ? [styles.optionalText, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : Colors.appearanceSubBlack
  }] : [styles.optionalText, {
    color: fontColor
  }];
  const optionTextStyle = colorScheme === COLOR_SCHEMES.dark ? [styles.optionText, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : Colors.appearanceSubBlack
  }] : [styles.optionText, {
    color: fontColor
  }];
  const inputStyle = colorScheme === COLOR_SCHEMES.dark ? [styles.input, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : Colors.appearanceSubBlack
  }] : [styles.input, {
    color: fontColor
  }];
  const reloadStyle = [styles.pictureReloadContainer, {
    width: itemWidth
  }];
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => {
      if (imageLoadError) {
        setImageLoadError(false);
        setLoadingImage(true);
      } else {
        showChooseAlert();
      }
    }
  }, imageLoadError ? /*#__PURE__*/React.createElement(View, {
    style: reloadStyle
  }, /*#__PURE__*/React.createElement(Image, {
    style: styles.reloadPlaceholderImage,
    source: require('../assets/ic_image_placeholder.png')
  }), /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.row
  }, /*#__PURE__*/React.createElement(Image, {
    source: require('../assets/ic_reload.png')
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.reloadText
  }, `${i18n.t('picture-choice:reload')}`))) : selected && otherPicture.image.length > 0 ? /*#__PURE__*/React.createElement(Image, {
    style: pictureSelectedStyle,
    source: {
      uri: otherPicture.image
    },
    onLoadStart: () => setLoadingImage(true),
    onLoadEnd: () => setLoadingImage(false),
    onError: _error => {
      setImageLoadError(true);
      setLoadingImage(false);
    }
  }) : /*#__PURE__*/React.createElement(View, {
    style: nonSelectedOtherPictureContainerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.placeholderGroup
  }, /*#__PURE__*/React.createElement(Image, {
    style: iconStyle,
    source: require('../assets/cloudComputing.png')
  }), /*#__PURE__*/React.createElement(Text, {
    style: placeholderTextStyle
  }, `${i18n.t('picture-choice:clickTo')}`, /*#__PURE__*/React.createElement(Text, {
    style: styles.chooseImageText
  }, `${i18n.t('picture-choice:chooseImage')}`)), /*#__PURE__*/React.createElement(Text, {
    style: optionalTextStyle
  }, `${i18n.t('picture-choice:optional')}`))), /*#__PURE__*/React.createElement(ActivityIndicatorMask, {
    loading: isUploading || loadingImage
  })), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.optionContainer,
    onPress: () => {
      if (!selected) {
        showChooseAlert();
      }

      onSelect();
    }
  }, /*#__PURE__*/React.createElement(ChooseIcon, {
    isMultipleChoice: isMultipleChoice,
    selected: selected,
    themeColor: themeColor
  }), /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, /*#__PURE__*/React.createElement(Text, {
    style: optionTextStyle
  }, `${i18n.t('picture-choice:other')}`), /*#__PURE__*/React.createElement(TextInput, {
    style: inputStyle,
    maxLength: 100,
    editable: selected,
    placeholder: placeholder,
    placeholderTextColor: Colors.sliderLabel,
    underlineColorAndroid: Colors.transparent,
    defaultValue: otherPicture.value,
    onChangeText: onChangeText
  }))));
};

export default PictureChoiceOtherItem;
const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    marginTop: 16,
    minHeight: 20
  },
  optionText: {
    marginLeft: 5,
    flex: 1,
    fontSize: 16
  },
  pictureSelected: {
    height: 138,
    borderRadius: 12,
    borderWidth: 4
  },
  input: {
    marginLeft: 5,
    marginTop: 5,
    borderBottomWidth: 1,
    minHeight: 28,
    borderBottomColor: Colors.rankingContainerBorder
  },
  nonSelectedOtherPictureContainer: {
    height: 138,
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderGroup: {
    alignItems: 'center'
  },
  placeholderText: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    textAlign: 'center'
  },
  chooseImageText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  optionalText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  pictureReloadContainer: {
    height: 138,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.rankingBorder,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reloadPlaceholderImage: {
    marginBottom: 8
  },
  reloadText: {
    fontSize: 12,
    marginLeft: 4
  }
});
//# sourceMappingURL=PictureChoiceOtherItem.js.map