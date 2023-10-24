import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  PermissionsAndroid,
  Text,
  Dimensions,
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

  const { width } = Dimensions.get('window');
  const questionMargin = 30;
  const itemWidth = (width - 2 * questionMargin - columnGap) / 2;

  const [imageLoadError, setImageLoadError] = useState(false);

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
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
    };
    launchImageLibrary(options, uploadPicture);
  };

  const openCamera = () => {
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

  const showChooseAlert = () => {
    Alert.alert(`${i18n.t('picture-choice:chooseImageTitle')}`, undefined, [
      { text: `${i18n.t('picture-choice:camera')}`, onPress: openCamera },
      {
        text: `${i18n.t('picture-choice:photoLibrary')}`,
        onPress: openPhotoLibrary,
      },
      { text: `${i18n.t('picture-choice:cancel')}`, style: 'cancel' },
    ]);
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

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (imageLoadError) {
            setImageLoadError(false);
            setLoadingImage(true);
          } else {
            showChooseAlert();
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
            showChooseAlert();
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
});
