import { isEmpty, prop, pipe, findIndex, equals, curry, nth, map } from 'ramda';
import { EvaluateRuleSet } from './dt-common-lib';
import type { Feedback, Question, Option, Survey } from '../data';

/** @enum {'other'} */
export const QuestionBrandType = {
  Other: 'other',
};

/** @enum {'Date'|'Name'|'Email'|'Phone'|'Number'|'String'} */
export const QuestionMetaDataType = {
  Name: 'Name',
  Email: 'Email',
  Phone: 'Phone',
  Number: 'Number',
  Date: 'Date',
  String: 'String',
};

/**
 * given a Question type, return ['option label1', 'option label2', 'option label3', true]
 * if the type is boolean at the last, it means it is an "other" option
 */
export const getOptionsFromQuestion = (question: Question): Option[] => {
  // copy the original array
  // @ts-ignore
  const options = (question.options ?? []).map((option: Option) => ({
    isOther: false,
    title: option,
  }));
  // add additional option when the question brand type is "other"
  if (question.questionBrand === QuestionBrandType.Other) {
    options.push({
      isOther: true,
      // @ts-ignore
      title: '',
    });
  }
  // @ts-ignore
  return options;
};

/**
 * validate if value match metaDataType question' rule
 */
export const metaDataTypeQuestionValidator = (
  question: Question,
  value: string
): boolean => {
  // if it is not a open ended question no need to check, return valid
  if (question.type !== 'open') return true;

  // no need to check the value when no value or no type
  if (!value || !question.metaDataType) return true;

  let reg = null;

  switch (question.metaDataType) {
    case QuestionMetaDataType.Number:
      // @ts-ignore
      return !isNaN(value);
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
  if (!question.mandatory) return true;
  // @ts-ignore
  const { answers } = feedback;
  // check if feedback has answer
  const isAnswered = answers !== undefined;
  const answer = isAnswered ? answers[answers.length - 1] : '';
  // check if answer is vaild
  const isVaildTextInput =
    typeof answer === 'string' ? answer.length >= 3 : true;
  return isAnswered && isVaildTextInput;
};

/**
 * validate if question's feedback is valid:
 * metadata type value check, mandatory check
 */
export const questionFeedbackValidator = (
  question: Question | {} = {},
  feedback: Feedback | {} = {}
): boolean => {
  return (
    // @ts-ignore
    metaDataTypeQuestionValidator(question, feedback.answers?.[0]) &&
    // @ts-ignore
    mandatoryQuestionValidator(question, feedback)
  );
};

/**
 * return -1 if not existed
 * @type {(pageId: string, survey: Survey) => number}
 */
export const getPageIndexFromPageId = curry((pageId: string, survey: Survey) =>
  // @ts-ignore
  pipe(prop('pageOrder'), findIndex(equals(pageId)))(survey)
);

/**
 * only keep the feedbacks that belongs to a certain page
 * if a question is not answered => textOrIndexArr: ['']
 * also convert the answers to 0-based
 * transform it to IQAData type
 * @type {(pageIndex: number, survey: Survey, feedbacksMap: {[questionId: string]: Feedback} ) => [IQAData]}
 */
const transformFeedbacks = (
  pageIndex: number,
  survey: Survey,
  feedbacksMap: { [questionId: string]: Feedback }
) => {
  // get the default page IQAData
  /** @type {IQAData[]} */
  const defaultPageIQAData = pipe(
    prop('pages'),
    // @ts-ignore
    nth(pageIndex),
    prop('questions'),
    map((question) => ({
      // @ts-ignore
      questionId: question.questionId,
      textOrIndexArr: [''],
    }))
    // @ts-ignore
  )(survey);

  // if feedback has answers, use it to replace the default
  return defaultPageIQAData.map((defaultIQAData) => {
    const feedback = feedbacksMap[defaultIQAData.questionId];
    if (feedback && !isEmpty(feedback.answers)) {
      return {
        questionId: defaultIQAData.questionId,
        // @ts-ignore
        textOrIndexArr: feedback.answers.map((s) => s.toString()),
        otherFlag: feedback.otherFlag,
      };
    }
    return defaultIQAData;
  });
};

export function nextPage(
  pageIndex: number,
  pageId: string,
  feedbacksMap: { [questionId: string]: Feedback },
  survey: Survey
): number {
  const defaultNextPage = () =>
    pageIndex >= survey.pageOrder.length - 1 ? -1 : pageIndex + 1;

  // if there's no rule, go to default next page
  const pageRuleSet = survey.rules[pageId];
  if (!pageRuleSet || isEmpty(pageRuleSet)) {
    return defaultNextPage();
  }

  // apply the rule
  const iQADataArr = transformFeedbacks(pageIndex, survey, feedbacksMap);
  const nextPageId = EvaluateRuleSet(pageRuleSet, iQADataArr);
  if (!nextPageId) {
    return defaultNextPage();
  }

  // next page index
  return getPageIndexFromPageId(nextPageId, survey);
}

export const scaleLogic: {
  [name in string]: number[];
} = {
  '2': [0, 4],
  '3': [0, 2, 4],
  '4': [0, 2, 3, 4],
  '5': [0, 1, 2, 3, 4],
};

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

export const option3TransformTable = new Map([
  [
    '1-2',
    require('../assets/animations/smiley_option3/option3_smile_1-2_transform.json'),
  ],
  [
    '2-3',
    require('../assets/animations/smiley_option3/option3_smile_2-3_transform.json'),
  ],
  [
    '3-4',
    require('../assets/animations/smiley_option3/option3_smile_3-4_transform.json'),
  ],
  [
    '4-5',
    require('../assets/animations/smiley_option3/option3_smile_4-5_transform.json'),
  ],
  [
    '1-3',
    require('../assets/animations/smiley_option3/option3_smile_1-3_transform.json'),
  ],
  [
    '1-5',
    require('../assets/animations/smiley_option3/option3_smile_1-5_transform.json'),
  ],
  [
    '3-5',
    require('../assets/animations/smiley_option3/option3_smile_3-5_transform.json'),
  ],
]);

export const option4LoopFaceTable = new Map([
  [
    '1A',
    require('../assets/animations/smiley_option4/option4_star_1_loop.json'),
  ],
  [
    '2B',
    require('../assets/animations/smiley_option4/option4_star_2_loop.json'),
  ],
  ['2C', 'Star 2C'],
  ['2E', 'Star 2E'],
  [
    '3C',
    require('../assets/animations/smiley_option4/option4_star_3_loop.json'),
  ],
  ['3D', 'Star 3D'],
  ['3E', 'Star 3E'],
  [
    '4D',
    require('../assets/animations/smiley_option4/option4_star_4_loop.json'),
  ],
  ['4E', 'Star 4E'],
  [
    '5E',
    require('../assets/animations/smiley_option4/option4_star_5_loop.json'),
  ],
]);
export const option4TransformTable = new Map([
  [
    '1A-2B',
    require('../assets/animations/smiley_option4/option4_star_2_transform.json'),
  ],
  [
    '2B-3C',
    require('../assets/animations/smiley_option4/option4_star_3_transform.json'),
  ],
  [
    '3C-4D',
    require('../assets/animations/smiley_option4/option4_star_4_transform.json'),
  ],
  [
    '4D-5E',
    require('../assets/animations/smiley_option4/option4_star_5_transform.json'),
  ],
  ['1A-2E', 'From 1A to 2E'],
  ['1A-2C', 'From 1A to 2C'],
  ['2C-3E', 'From 2C to 3E'],
  ['2C-3D', 'From 2C to 3D'],
  ['3D-4E', 'From 3D to 4E'],
]);

/** @typedef {import('./dt-common-lib/IfcRule').IQAData} IQAData */
