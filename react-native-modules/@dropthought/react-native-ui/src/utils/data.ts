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

  // check if feedback has answer
  return (
    // @ts-ignore
    feedback.answers !== undefined &&
    // @ts-ignore
    feedback.answers.length &&
    // @ts-ignore
    !isEmpty(feedback.answers[0])
  );
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

/** @typedef {import('./dt-common-lib/IfcRule').IQAData} IQAData */
