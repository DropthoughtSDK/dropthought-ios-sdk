"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _styles = _interopRequireWildcard(require("../styles"));

var _translation = _interopRequireDefault(require("../translation"));

var _ActivityIndicatorMask = _interopRequireDefault(require("./ActivityIndicatorMask"));

var _reactNativeImagePicker = require("react-native-image-picker");

var _PictureChoiceItem = require("./PictureChoiceItem");

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  } = (0, _theme.useTheme)();
  const isDarkMode = true; //colorScheme === COLOR_SCHEMES.dark;

  const {
    width
  } = _reactNative.Dimensions.get('window');

  const questionMargin = 30;
  const itemWidth = (width - 2 * questionMargin - columnGap) / 2;
  const [imageLoadError, setImageLoadError] = (0, _react.useState)(false);
  const [actionSheetVisible, setActionSheetVisible] = (0, _react.useState)(false);
  const pictureSelectedStyle = [styles.pictureSelected, {
    width: itemWidth,
    borderColor: themeColor
  }];
  const iconStyle = {
    tintColor: themeColor
  };
  const nonSelectedOtherPictureContainerStyle = [styles.nonSelectedOtherPictureContainer, {
    backgroundColor: (0, _styles.addOpacityToHex)(themeColor, 0.1),
    borderColor: themeColor,
    width: itemWidth
  }];
  const [loadingImage, setLoadingImage] = (0, _react.useState)(false);
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
        onError(`${_translation.default.t('picture-choice:invalidTypeHint')}`);
      } else if (fileSize && fileSize > MAXIMUM_SIZE_KB) {
        onError(`${_translation.default.t('picture-choice:overSizeHint')}`);
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
    const permission = _reactNative.PermissionsAndroid.PERMISSIONS.CAMERA;
    const hasPermission = await _reactNative.PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await _reactNative.PermissionsAndroid.request(permission);
    return status === _reactNative.PermissionsAndroid.RESULTS.GRANTED;
  }

  const openPhotoLibrary = () => {
    setActionSheetVisible(false);
    const options = {
      selectionLimit: 1,
      mediaType: 'photo'
    };
    (0, _reactNativeImagePicker.launchImageLibrary)(options, uploadPicture);
  };

  const openCamera = () => {
    setActionSheetVisible(false);
    const options = {
      saveToPhotos: true,
      mediaType: 'photo'
    };

    if (_reactNative.Platform.OS === 'android') {
      hasAndroidPermission().then(result => {
        if (result) {
          (0, _reactNativeImagePicker.launchCamera)(options, uploadPicture);
        }
      });
    } else {
      (0, _reactNativeImagePicker.launchCamera)(options, uploadPicture);
    }
  };

  const placeholderTextStyle = colorScheme === _theme.COLOR_SCHEMES.dark ? [styles.placeholderText, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : _styles.Colors.appearanceSubBlack
  }] : [styles.placeholderText, {
    color: fontColor
  }];
  const optionalTextStyle = colorScheme === _theme.COLOR_SCHEMES.dark ? [styles.optionalText, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : _styles.Colors.appearanceSubBlack
  }] : [styles.optionalText, {
    color: fontColor
  }];
  const optionTextStyle = colorScheme === _theme.COLOR_SCHEMES.dark ? [styles.optionText, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : _styles.Colors.appearanceSubBlack
  }] : [styles.optionText, {
    color: fontColor
  }];
  const inputStyle = colorScheme === _theme.COLOR_SCHEMES.dark ? [styles.input, {
    color: fontColor !== null && fontColor !== void 0 ? fontColor : _styles.Colors.appearanceSubBlack
  }] : [styles.input, {
    color: fontColor
  }];
  const reloadStyle = [styles.pictureReloadContainer, {
    width: itemWidth
  }];

  const actionSheet = /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    animationType: "none",
    transparent: true,
    visible: actionSheetVisible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionModalContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actions
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: isDarkMode ? styles.darkUpperAction : styles.upperAction,
    onPress: openPhotoLibrary
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: isDarkMode ? styles.darkActionText : styles.actionText
  }, `${_translation.default.t('picture-choice:photoLibrary')}`)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: isDarkMode ? styles.darkBottomAction : styles.bottomAction,
    onPress: openCamera
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: isDarkMode ? styles.darkActionText : styles.actionText
  }, `${_translation.default.t('picture-choice:camera')}`))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: isDarkMode ? styles.darkCancelAction : styles.cancelAction,
    onPress: () => setActionSheetVisible(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: isDarkMode ? styles.darkActionText : styles.actionCancelText
  }, `${_translation.default.t('picture-choice:cancel')}`)))));

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      if (imageLoadError) {
        setImageLoadError(false);
        setLoadingImage(true);
      } else {
        setActionSheetVisible(true);
      }
    }
  }, imageLoadError ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: reloadStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.reloadPlaceholderImage,
    source: require('../assets/ic_image_placeholder.png')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.row
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('../assets/ic_reload.png')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.reloadText
  }, `${_translation.default.t('picture-choice:reload')}`))) : selected && otherPicture.image.length > 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
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
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: nonSelectedOtherPictureContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.placeholderGroup
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: iconStyle,
    source: require('../assets/cloudComputing.png')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: placeholderTextStyle
  }, `${_translation.default.t('picture-choice:clickTo')}`, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.chooseImageText
  }, `${_translation.default.t('picture-choice:chooseImage')}`)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: optionalTextStyle
  }, `${_translation.default.t('picture-choice:optional')}`))), /*#__PURE__*/_react.default.createElement(_ActivityIndicatorMask.default, {
    loading: isUploading || loadingImage
  })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.optionContainer,
    onPress: () => {
      if (!selected) {
        setActionSheetVisible(true);
      }

      onSelect();
    }
  }, /*#__PURE__*/_react.default.createElement(_PictureChoiceItem.ChooseIcon, {
    isMultipleChoice: isMultipleChoice,
    selected: selected,
    themeColor: themeColor
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.flex1
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: optionTextStyle
  }, `${_translation.default.t('picture-choice:other')}`), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: inputStyle,
    maxLength: 100,
    editable: selected,
    placeholder: placeholder,
    placeholderTextColor: _styles.Colors.sliderLabel,
    underlineColorAndroid: _styles.Colors.transparent,
    defaultValue: otherPicture.value,
    onChangeText: onChangeText
  }))), actionSheet);
};

var _default = PictureChoiceOtherItem;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
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
    borderBottomColor: _styles.Colors.rankingContainerBorder
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
    borderColor: _styles.Colors.rankingBorder,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reloadPlaceholderImage: {
    marginBottom: 8
  },
  reloadText: {
    fontSize: 12,
    marginLeft: 4
  },
  actionModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 29,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  actionContainer: {
    width: '100%',
    height: 190
  },
  actionText: {
    fontSize: 20,
    fontWeight: '500',
    color: _styles.Colors.lightActionText
  },
  actionCancelText: {
    fontSize: 20,
    fontWeight: '600',
    color: _styles.Colors.defaultThemeColor
  },
  darkActionText: {
    fontSize: 20,
    fontWeight: '500',
    color: _styles.Colors.darkActionText
  },
  actions: {
    marginBottom: 16
  },
  upperAction: {
    height: 58,
    backgroundColor: _styles.Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17, 17, 17, 0.5)'
  },
  bottomAction: {
    height: 58,
    backgroundColor: _styles.Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14
  },
  cancelAction: {
    height: 58,
    backgroundColor: _styles.Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  },
  darkUpperAction: {
    height: 58,
    backgroundColor: _styles.Colors.rankingContainerBgDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17, 17, 17, 0.5)'
  },
  darkBottomAction: {
    height: 58,
    backgroundColor: _styles.Colors.rankingContainerBgDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14
  },
  darkCancelAction: {
    height: 58,
    backgroundColor: _styles.Colors.rankingContainerBgDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  }
});
//# sourceMappingURL=PictureChoiceOtherItem.js.map