import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from 'react-native';
import GlobalStyle, { Colors, addOpacityToHex } from '../styles';
import FileQuestionItem from './FileQuestionItem';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type { Question, Survey, Feedback } from '../data';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import { useFileQuestion } from '../hooks/useFileQuestion';
import i18n from '../translation';
// @ts-ignore
import type { onUploadType } from '../dt-common';

type Props = {
  survey: Survey;
  onFeedback: (feedback: Feedback) => void;
  feedback?: Feedback;
  onUpload: onUploadType;
  mandatoryErrorMessage: string;
  question: Question;
  forgot: boolean;
  preview: boolean;
};

const ClassicFileQuestion = ({
  survey,
  onFeedback,
  feedback,
  onUpload,
  mandatoryErrorMessage,
  question,
  forgot,
  preview,
}: Props) => {
  const { hexCode, fontColor, colorScheme } = useTheme();

  const { supportedFileTypes } = question;

  const {
    showChooseAlert,
    onRemoveFile,
    handleUploadFileSuccess,
    selectedFilesRef,
    invalidMessage,
    setInvalidMessage,
    openFilePicker,
    openPhotoLibrary,
    actionSheetVisible,
    setActionSheetVisible,
  } = useFileQuestion(question, onFeedback, survey, feedback);

  let selectedFileComponent = null;

  if (Array.isArray(selectedFilesRef.current)) {
    selectedFileComponent = selectedFilesRef.current.map((selectedFile) => {
      return (
        <FileQuestionItem
          selectedFile={selectedFile}
          onRemoveFile={onRemoveFile}
          onError={(msg) => {
            setInvalidMessage(msg);
          }}
          onUpload={onUpload}
          handleUploadFileSuccess={handleUploadFileSuccess}
          key={selectedFile.uri}
        />
      );
    });
  }

  const upoloadIconStyle = [
    styles.fileIcon,
    {
      tintColor: colorScheme === COLOR_SCHEMES.light ? hexCode : Colors.white,
    },
  ];

  const buttonContainerStyle = [
    styles.buttonContainer,
    {
      backgroundColor: addOpacityToHex(hexCode, 0.1),
      borderColor: hexCode,
    },
  ];

  const upperActionStyle = [
    styles.upperAction,
    {
      backgroundColor:
        colorScheme === COLOR_SCHEMES.light
          ? Colors.lightActionBackground
          : Colors.rankingContainerBgDark,
      borderRadius: Platform.OS === 'android' ? 14 : 0,
    },
  ];
  const bottomActionStyle = [
    styles.bottomAction,
    {
      backgroundColor:
        colorScheme === COLOR_SCHEMES.light
          ? Colors.lightActionBackground
          : Colors.rankingContainerBgDark,
    },
  ];
  const cancelActionStyle = [
    styles.cancelAction,
    {
      backgroundColor:
        colorScheme === COLOR_SCHEMES.light
          ? Colors.white
          : Colors.rankingContainerBgDark,
    },
  ];

  const textStyle = [
    styles.actionText,
    {
      color:
        colorScheme === COLOR_SCHEMES.light
          ? Colors.lightActionText
          : Colors.darkActionText,
    },
  ];

  const actionSheet = (
    <Modal animationType="fade" transparent visible={actionSheetVisible}>
      <View style={styles.actionModalContainer}>
        <View style={styles.actionContainer}>
          <View style={styles.actions}>
            <TouchableOpacity style={upperActionStyle} onPress={openFilePicker}>
              <Text testID="test:id/file_upload_files" style={textStyle}>
                {i18n.t('file-upload:files')}
              </Text>
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity
                style={bottomActionStyle}
                onPress={openPhotoLibrary}
              >
                <Text testID="test:id/file_upload_photo_lib" style={textStyle}>
                  {i18n.t('file-upload:photo')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            style={cancelActionStyle}
            onPress={() => setActionSheetVisible(false)}
          >
            <Text
              testID="test:id/file_upload_cancel"
              style={styles.actionCancelText}
            >
              {i18n.t('file-upload:cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  const fileUploadTextStyle = [
    styles.fileUploadText,
    {
      color: fontColor,
    },
  ];

  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        forgot={forgot}
        mandatoryErrorMessage={mandatoryErrorMessage}
        question={question}
        style={styles.mandatoryTitle}
        invalidMessage={invalidMessage}
      />
      <View>{selectedFileComponent}</View>
      <TouchableOpacity
        accessible={false}
        style={GlobalStyle.flex1}
        disabled={preview}
        onPress={showChooseAlert}
      >
        <View style={buttonContainerStyle}>
          <Image
            style={upoloadIconStyle}
            // @ts-ignore
            source={require('../assets/ic-upload-file.png')}
          />
          <Text
            testID={`test:id/file_upload_area_${fontColor}`}
            style={fileUploadTextStyle}
          >
            {`Click to choose file\n${
              survey.fileFormatErrorText
            } ${supportedFileTypes.join(', ')}`}
          </Text>
        </View>
      </TouchableOpacity>
      {actionSheet}
    </View>
  );
};

export default React.memo(ClassicFileQuestion);

const styles = StyleSheet.create({
  mandatoryTitle: {
    marginBottom: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  fileIcon: {
    marginBottom: 8,
  },
  fileUploadText: {
    textAlign: 'center',
    marginBottom: 8,
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
});
