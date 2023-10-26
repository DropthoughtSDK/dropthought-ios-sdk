import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  PermissionsAndroid,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import GlobalStyle, { Colors, addOpacityToHex } from '../styles';
import i18n from '../translation';
import ActivityIndicatorMask from './ActivityIndicatorMask';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ChooseIcon } from './PictureChoiceItem';
import type {
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type { ImageFileProps } from '../data';

const MAXIMUM_SIZE_KB = 5 * 1024 * 1024; // 2MB

type Props = {
  otherPicture: { image: string; value: string };
  isMultipleChoice: boolean;
  selected: boolean;
  placeholder: string;
  columnGap: number;
  onChooseImage: () => void;
  onSelect: () => void;
  onUpload: (file: ImageFileProps) => void;
  isUploading: boolean;
  onError: (msg: string) => void;
  onChangeText: (text: string) => void;
  themeColor: string;
};

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
  themeColor,
}: Props) => {
  const { fontColor, colorScheme } = useTheme();
  const isDarkMode = true; //colorScheme === COLOR_SCHEMES.dark;

  const { width } = Dimensions.get('window');
  const questionMargin = 30;
  const itemWidth = (width - 2 * questionMargin - columnGap) / 2;

  const [imageLoadError, setImageLoadError] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const pictureSelectedStyle = [
    styles.pictureSelected,
    { width: itemWidth, borderColor: themeColor },
  ];
  const iconStyle = { tintColor: themeColor };

  const nonSelectedOtherPictureContainerStyle = [
    styles.nonSelectedOtherPictureContainer,
    {
      backgroundColor: addOpacityToHex(themeColor, 0.1),
      borderColor: themeColor,
      width: itemWidth,
    },
  ];

  const [loadingImage, setLoadingImage] = useState(false);

  const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  const uploadPicture = (response: ImagePickerResponse) => {
    if (response?.assets && response?.assets?.length > 0) {
      const { uri, fileName: name, type, fileSize } = response.assets[0];

      if (type && !validTypes.includes(type)) {
        onError(`${i18n.t('picture-choice:invalidTypeHint')}`);
      } else if (fileSize && fileSize > MAXIMUM_SIZE_KB) {
        onError(`${i18n.t('picture-choice:overSizeHint')}`);
      } else {
        if (uri && name && type) {
          const file: ImageFileProps = { uri, name, type };
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
    setActionSheetVisible(false);
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
    };
    launchImageLibrary(options, uploadPicture);
  };

  const openCamera = () => {
    setActionSheetVisible(false);
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
    };
    if (Platform.OS === 'android') {
      hasAndroidPermission().then((result) => {
        if (result) {
          launchCamera(options, uploadPicture);
        }
      });
    } else {
      launchCamera(options, uploadPicture);
    }
  };

  const placeholderTextStyle =
    colorScheme === COLOR_SCHEMES.dark
      ? [
          styles.placeholderText,
          { color: fontColor ?? Colors.appearanceSubBlack },
        ]
      : [styles.placeholderText, { color: fontColor }];

  const optionalTextStyle =
    colorScheme === COLOR_SCHEMES.dark
      ? [styles.optionalText, { color: fontColor ?? Colors.appearanceSubBlack }]
      : [styles.optionalText, { color: fontColor }];

  const optionTextStyle =
    colorScheme === COLOR_SCHEMES.dark
      ? [styles.optionText, { color: fontColor ?? Colors.appearanceSubBlack }]
      : [styles.optionText, { color: fontColor }];

  const inputStyle =
    colorScheme === COLOR_SCHEMES.dark
      ? [styles.input, { color: fontColor ?? Colors.appearanceSubBlack }]
      : [styles.input, { color: fontColor }];

  const reloadStyle = [styles.pictureReloadContainer, { width: itemWidth }];

  const actionSheet = (
    <Modal animationType="none" transparent visible={actionSheetVisible}>
      <View style={styles.actionModalContainer}>
        <View style={styles.actionContainer}>
          <View style={styles.actions}>
            <TouchableOpacity
              style={isDarkMode ? styles.darkUpperAction : styles.upperAction}
              onPress={openPhotoLibrary}
            >
              <Text
                style={isDarkMode ? styles.darkActionText : styles.actionText}
              >
                {`${i18n.t('picture-choice:photoLibrary')}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDarkMode ? styles.darkBottomAction : styles.bottomAction}
              onPress={openCamera}
            >
              <Text
                style={isDarkMode ? styles.darkActionText : styles.actionText}
              >
                {`${i18n.t('picture-choice:camera')}`}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={isDarkMode ? styles.darkCancelAction : styles.cancelAction}
            onPress={() => setActionSheetVisible(false)}
          >
            <Text
              style={
                isDarkMode ? styles.darkActionText : styles.actionCancelText
              }
            >
              {`${i18n.t('picture-choice:cancel')}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (imageLoadError) {
            setImageLoadError(false);
            setLoadingImage(true);
          } else {
            setActionSheetVisible(true);
          }
        }}
      >
        {imageLoadError ? (
          <View style={reloadStyle}>
            <Image
              style={styles.reloadPlaceholderImage}
              source={require('../assets/ic_image_placeholder.png')}
            />
            <View style={GlobalStyle.row}>
              <Image source={require('../assets/ic_reload.png')} />
              <Text style={styles.reloadText}>
                {`${i18n.t('picture-choice:reload')}`}
              </Text>
            </View>
          </View>
        ) : selected && otherPicture.image.length > 0 ? (
          <Image
            style={pictureSelectedStyle}
            source={{ uri: otherPicture.image }}
            onLoadStart={() => setLoadingImage(true)}
            onLoadEnd={() => setLoadingImage(false)}
            onError={(_error) => {
              setImageLoadError(true);
              setLoadingImage(false);
            }}
          />
        ) : (
          <View style={nonSelectedOtherPictureContainerStyle}>
            <View style={styles.placeholderGroup}>
              <Image
                style={iconStyle}
                source={require('../assets/cloudComputing.png')}
              />
              <Text style={placeholderTextStyle}>
                {`${i18n.t('picture-choice:clickTo')}`}
                <Text style={styles.chooseImageText}>
                  {`${i18n.t('picture-choice:chooseImage')}`}
                </Text>
              </Text>
              <Text style={optionalTextStyle}>
                {`${i18n.t('picture-choice:optional')}`}
              </Text>
            </View>
          </View>
        )}
        <ActivityIndicatorMask loading={isUploading || loadingImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          if (!selected) {
            setActionSheetVisible(true);
          }
          onSelect();
        }}
      >
        <ChooseIcon
          isMultipleChoice={isMultipleChoice}
          selected={selected}
          themeColor={themeColor}
        />
        <View style={GlobalStyle.flex1}>
          <Text style={optionTextStyle}>
            {`${i18n.t('picture-choice:other')}`}
          </Text>
          <TextInput
            style={inputStyle}
            maxLength={100}
            editable={selected}
            placeholder={placeholder}
            placeholderTextColor={Colors.sliderLabel}
            underlineColorAndroid={Colors.transparent}
            defaultValue={otherPicture.value}
            onChangeText={onChangeText}
          />
        </View>
      </TouchableOpacity>
      {actionSheet}
    </View>
  );
};

export default PictureChoiceOtherItem;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    marginTop: 16,
    minHeight: 20,
  },
  optionText: {
    marginLeft: 5,
    flex: 1,
    fontSize: 16,
  },
  pictureSelected: {
    height: 138,
    borderRadius: 12,
    borderWidth: 4,
  },
  input: {
    marginLeft: 5,
    marginTop: 5,
    borderBottomWidth: 1,
    minHeight: 28,
    borderBottomColor: Colors.rankingContainerBorder,
  },
  nonSelectedOtherPictureContainer: {
    height: 138,
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderGroup: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  chooseImageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pictureReloadContainer: {
    height: 138,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.rankingBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadPlaceholderImage: {
    marginBottom: 8,
  },
  reloadText: {
    fontSize: 12,
    marginLeft: 4,
  },
  actionModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 29,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  actionContainer: {
    width: '100%',
    height: 190,
  },
  actionText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.lightActionText,
  },
  actionCancelText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.defaultThemeColor,
  },
  darkActionText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.darkActionText,
  },
  actions: {
    marginBottom: 16,
  },
  upperAction: {
    height: 58,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17, 17, 17, 0.5)',
  },
  bottomAction: {
    height: 58,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  cancelAction: {
    height: 58,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  darkUpperAction: {
    height: 58,
    backgroundColor: Colors.rankingContainerBgDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17, 17, 17, 0.5)',
  },
  darkBottomAction: {
    height: 58,
    backgroundColor: Colors.rankingContainerBgDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  darkCancelAction: {
    height: 58,
    backgroundColor: Colors.rankingContainerBgDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
});
