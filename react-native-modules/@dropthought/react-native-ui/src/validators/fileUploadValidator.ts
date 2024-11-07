// @ts-check
import { Alert } from 'react-native';
import { isEmpty } from 'ramda';
import type { Question, Feedback } from '../data';
import type { IColorSchemesType } from '../contexts/theme';

export const fileUploadValidator = (
  question: Question,
  feedback: Feedback,
  scheme?: IColorSchemesType
) => {
  const { mandatory } = question;
  //@ts-ignore
  const isAllFileUploadSuccessful = feedback?.answers?.every(
    //@ts-ignore
    (selectedFile) => selectedFile.file.length > 0
  );
  if (feedback?.answers?.length > 0 && !isAllFileUploadSuccessful) {
    Alert.alert(
      'File Upload in progress',
      'Please wait while your file is being uploaded. You cannot proceed to the previous/next step until the upload is complete.',
      [
        {
          text: 'Okay',
          style: 'cancel',
        },
      ],
      {
        userInterfaceStyle: scheme,
      }
    );
    return false;
  } else {
    return (
      (feedback?.answers?.length > 0 && !isEmpty(feedback.answers[0])) ||
      !mandatory
    );
  }
};

export default fileUploadValidator;

/**
 * @typedef {import('../DropThought').Question} Question
 * @typedef {import('../FeedbacksUploader').Feedback} Feedback
 */
