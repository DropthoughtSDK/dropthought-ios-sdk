import { Image } from 'react-native';
import { isEmpty, isNil } from 'ramda';
import type {
  Feedback,
  Question,
  RequiredType,
  QuestionMetaDataType as DataQuestionMetaDataType,
} from '../data';
import { matrixRatingValidator } from '../hooks/useMatrixRating';
import { multipleOpenEndedValidator } from '../hooks/useMultipleOpenEnded';
import { matrixChoiceValidator } from '../hooks/useMatrixChoice';
import { multiplePictureChoiceValidator } from '../hooks/usePictureChoice';
import fileUploadValidator from '../validators/fileUploadValidator';
import type { ThemeContextProps } from '../contexts/theme/ThemeContext';

/** @enum {'other'} */
export const QuestionBrandType = {
  Other: 'other',
};

/** @enum {'Date'|'Name'|'Email'|'Phone'|'Number'|'String'} */
export const QuestionMetaDataType = {
  Name: 'name',
  Email: 'email',
  Phone: 'phone',
  Number: 'number',
  Date: 'date',
  String: 'string',
};

export type TransformOptionType = {
  isOther: boolean;
  title: string;
  placeholder: string;
  index: number;
};

/**
 * given a Question type, return ['option label1', 'option label2', 'option label3', true]
 * if the type is boolean at the last, it means it is an "other" option
 */
export const getOptionsFromQuestion = (
  question: Question
): TransformOptionType[] => {
  // copy the original array
  const options: TransformOptionType[] | [] = (question.options ?? []).map(
    (option, index) => ({
      isOther: false,
      title: option,
      placeholder: '',
      index,
    })
  );
  // add additional option when the question brand type is "other"
  if (question.questionBrand === QuestionBrandType.Other) {
    options.push({
      isOther: true,
      // @ts-ignore
      title: '',
      placeholder: '',
      index: options.length,
    });
  }
  // @ts-ignore
  return options;
};

/**
 * validate if value match metaDataType question' rule
 */
export const metaDataFormatValidator = (
  value: string,
  metaDataType?: DataQuestionMetaDataType
): boolean => {
  // no need to check the value when no value or no type
  if (!value || !metaDataType) return true;

  let reg = null;

  switch (metaDataType.toLocaleLowerCase()) {
    case QuestionMetaDataType.Number:
      reg = /^\d+$/; // if need negative integer someday, reg = /^-?\d+$/
      return reg.test(value);
    case QuestionMetaDataType.Date:
      reg =
        /^((?:\d{4}-\d{2}-\d{2})|(?:\d{4}\/\d{2}\/\d{2})|(?:\d{4}:\d{2}:\d{2}))?( )?(\d{2}:\d{2}:\d{2})?$/;
      return reg.test(value);
    case QuestionMetaDataType.Phone:
      reg = /^\+[1-9]\d{1,14}$/;
      return reg.test(value);
    case QuestionMetaDataType.Email:
      reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(value);
    default:
      // no need to check the value
      return true;
  }
};

/**
 * if mandatory question has feedback
 */
export const mandatoryQuestionValidator = (
  question: Question,
  feedback: Feedback | {} = {}
): boolean => {
  // @ts-ignore
  const { answers, otherFlag } = feedback;
  if (question.type === 'matrixRating') {
    // @ts-ignore
    return matrixRatingValidator(question, feedback);
  } else if (question.type === 'multipleOpenEnded') {
    // @ts-ignore
    return multipleOpenEndedValidator(question, feedback);
  } else if (question.type === 'matrixChoice') {
    // @ts-ignore
    return matrixChoiceValidator(question, feedback);
  } else if (question.type === 'pictureChoice') {
    // @ts-ignore
    return multiplePictureChoiceValidator(question, feedback);
  }
  if (!question.mandatory) {
    if (
      otherFlag &&
      answers.length > 0 &&
      (isEmpty(answers[answers.length - 1]) ||
        isNil(answers[answers.length - 1]))
    ) {
      return false;
    }
    return true;
  }
  // check if feedback has answer
  const isAnswered =
    answers !== undefined &&
    answers.length > 0 &&
    !isEmpty(answers[answers.length - 1]) &&
    !isNil(answers[answers.length - 1]);

  return isAnswered;
};

export const getRequiredType = (question: Question): RequiredType => {
  const { mandatory, optional } = question;
  switch (true) {
    case mandatory && !optional:
      return 'all';
    case !mandatory && optional:
      return 'one';
    case !mandatory && !optional:
      return 'none';
    default:
      return 'none';
  }
};

/**
 * validate if question's feedback is valid:
 * metadata type value check, mandatory check
 */
export const questionFeedbackValidator = (
  question: Question,
  feedback: Feedback,
  theme: ThemeContextProps
): boolean => {
  const { colorScheme } = theme;
  let isValid = false;

  if (question.type === 'multipleOpenEnded' && question.metaDataTypeList) {
    isValid = question.metaDataTypeList?.every((type, index) =>
      // @ts-ignore
      metaDataFormatValidator(feedback.answers?.[index], type)
    );
  } else {
    isValid = metaDataFormatValidator(
      // @ts-ignore
      feedback.answers?.[0],
      question.metaDataType
    );
  }

  const allFeedbackIsUploadedValidator =
    question.type === 'file' && feedback
      ? fileUploadValidator(question, feedback, colorScheme)
      : true;

  return (
    allFeedbackIsUploadedValidator &&
    // @ts-ignore
    isValid &&
    // @ts-ignore
    mandatoryQuestionValidator(question, feedback)
  );
};

export const getImageSize = (
  uri: string
): Promise<{ width: number; height: number }> =>
  new Promise((resolve) => {
    //@ts-ignore
    if (!uri || typeof uri !== 'string') resolve({});

    // pre-fetch the uri if it is not base64
    const base64Reg = /^data:image\/.+;base64/;
    if (!uri.match(base64Reg)) {
      Image.prefetch(uri);
    }
    Image.getSize(
      uri,
      (width, height) => {
        resolve({
          width,
          height,
        });
      },
      () => {
        //@ts-ignore
        resolve({});
      }
    );
  });

export const scaleLogic: {
  [name in string]: number[];
} = {
  '2': [0, 4],
  '3': [1, 2, 3],
  '4': [0, 1, 3, 4],
  '5': [0, 1, 2, 3, 4],
};

export const option4FaceTable = ['A', 'B', 'C', 'D', 'E'];

export const option3LoopFaceTable = new Map([
  [
    '1',
    require('../assets/animations/smiley_option3/option3_smile_1_loop.json'),
  ],
  [
    '2',
    require('../assets/animations/smiley_option3/option3_smile_2_loop.json'),
  ],
  [
    '3',
    require('../assets/animations/smiley_option3/option3_smile_3_loop.json'),
  ],
  [
    '4',
    require('../assets/animations/smiley_option3/option3_smile_4_loop.json'),
  ],
  [
    '5',
    require('../assets/animations/smiley_option3/option3_smile_5_loop.json'),
  ],
]);

export const option4LoopFaceTable = new Map([
  ['1A', require('../assets/animations/smiley_option4/1A.json')],
  ['1B', require('../assets/animations/smiley_option4/1B.json')],
  ['2B', require('../assets/animations/smiley_option4/2B.json')],
  ['2C', require('../assets/animations/smiley_option4/2C.json')],
  ['2E', require('../assets/animations/smiley_option4/2E.json')],
  ['3C', require('../assets/animations/smiley_option4/3C.json')],
  ['3D', require('../assets/animations/smiley_option4/3D.json')],
  ['3E', require('../assets/animations/smiley_option4/3E.json')],
  ['4D', require('../assets/animations/smiley_option4/4D.json')],
  ['4E', require('../assets/animations/smiley_option4/4E.json')],
  ['5E', require('../assets/animations/smiley_option4/5E.json')],
]);
export const option4TransformTable = new Map([
  ['1A-2B', require('../assets/animations/smiley_option4/1A-2B.json')],
  ['1B-2C', require('../assets/animations/smiley_option4/1B-2C.json')],
  ['2B-3C', require('../assets/animations/smiley_option4/2B-3C.json')],
  ['2B-3D', require('../assets/animations/smiley_option4/2B-3D.json')],
  ['3C-4D', require('../assets/animations/smiley_option4/3C-4D.json')],
  ['4D-5E', require('../assets/animations/smiley_option4/4D-5E.json')],
  ['1A-2E', require('../assets/animations/smiley_option4/1A-2E.json')],
  ['1A-2C', require('../assets/animations/smiley_option4/1A-2C.json')],
  ['2C-3E', require('../assets/animations/smiley_option4/2C-3E.json')],
  ['2C-3D', require('../assets/animations/smiley_option4/2C-3D.json')],
  ['3D-4E', require('../assets/animations/smiley_option4/3D-4E.json')],
]);
