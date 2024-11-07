import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import GlobalStyle, { Colors, addOpacityToHex } from '../styles';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type { UploadedFile, UploadFileResult } from '../hooks/useFileQuestion';
import FileIcon from '../components/FileIcon';
// @ts-ignore
import type { onUploadType } from '../dt-common';
import useFileQuestionItem from '../hooks/useFileQuestionItem';
import i18n from '../translation';

type Props = {
  selectedFile: UploadedFile;
  onRemoveFile: (name: string) => void;
  onError: (msg: string) => void;
  onUpload: onUploadType;
  handleUploadFileSuccess: (file: UploadedFile, data: UploadFileResult) => void;
};
const FileQuestionItem = ({
  selectedFile,
  onRemoveFile,
  onError,
  onUpload,
  handleUploadFileSuccess,
}: Props) => {
  const { hexCode, fontColor, colorScheme } = useTheme();
  const rtl = i18n.dir() === 'rtl';
  const { name = '', size } = selectedFile || {};
  const isLightMode = colorScheme === COLOR_SCHEMES.light;
  const { isSuccessUpload, animatedWidth, progress } = useFileQuestionItem({
    selectedFile,
    onError,
    onUpload,
    handleUploadFileSuccess,
  });

  const fileItemStyle = [
    styles.fileItem,
    {
      borderColor: isLightMode ? addOpacityToHex(hexCode, 0.3) : '#39393a',
      backgroundColor: isLightMode ? addOpacityToHex(hexCode, 0.03) : '#39393a',
    },
  ];
  const progressBarStyle = [
    styles.progressBar,
    {
      width: isSuccessUpload ? '100%' : animatedWidth,
      backgroundColor: addOpacityToHex(hexCode, isLightMode ? 0.1 : 1),
      right: rtl ? 0 : undefined,
    },
  ];
  const fileNameTextStyle = [
    styles.fileNameText,
    rtl && GlobalStyle.textAlignRight,
    {
      color: fontColor,
    },
  ];
  const fileSizeTextStyle = [
    styles.fileSizeText,
    {
      color: fontColor,
    },
  ];
  const formatSize =
    size >= 1
      ? `${parseFloat(size.toFixed(1))}MB`
      : `${parseFloat(size.toFixed(3)) * 1000}KB`;

  return (
    <View style={fileItemStyle}>
      {isSuccessUpload ? null : (
        <Animated.View
          // @ts-ignore
          style={progressBarStyle}
        />
      )}
      <View style={[styles.fileItemContent, rtl && GlobalStyle.flexRowReverse]}>
        <FileIcon fileName={name} />
        <Text
          testID="test:id/file_upload_file_name"
          style={fileNameTextStyle}
          numberOfLines={1}
        >
          {name}
        </Text>
        {isSuccessUpload ? (
          <Text
            testID="test:id/file_upload_file_size"
            style={fileSizeTextStyle}
          >
            {typeof size === 'number' ? formatSize : 'null'}
          </Text>
        ) : (
          <Text style={fileSizeTextStyle}>{`${progress}%`}</Text>
        )}
        <TouchableOpacity
          testID="test:id/icon_remove_uploaded_file"
          style={styles.closeButton}
          onPress={() => onRemoveFile(name)}
        >
          <Image
            style={styles.closeIcon}
            // @ts-ignore
            source={require('../assets/icClose24Px.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(FileQuestionItem);

const styles = StyleSheet.create({
  fileItem: {
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
  },
  fileItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingLeft: 4,
    paddingRight: 8,
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  fileNameText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    marginRight: 5,
  },
  fileSizeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  closeButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    tintColor: Colors.sliderLabel,
    width: 12,
    height: 12,
  },
});
