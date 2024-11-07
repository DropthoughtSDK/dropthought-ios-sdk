import { apiPostEvent } from './API';
import { FeedbacksQueue } from './FeedbacksUploader';

/**
 * the format is to fit in the react-async deferFn
 * @param {[SurveyFeedback]} surveyFeedback
 */
export const submitFeedback = async ([surveyFeedback]) => {
  return apiPostEvent(
    {
      programId: surveyFeedback.surveyId,
      feedbacks: surveyFeedback.feedbacks,
      metadata: surveyFeedback.metadata,
      createdTime: surveyFeedback.createdTime,
      timeZone: surveyFeedback.timeZone,
    },
    {
      // use shorter timeout here,
      timeout: 10000,
    }
  ).catch((error) => {
    // save result when there's error
    // TODO: maybe there're some errors no need to be saved?
    saveFeedback(surveyFeedback);
    throw error;
  });
};

/**
 * @param {SurveyFeedback} surveyFeedback
 */
export const saveFeedback = async (surveyFeedback) => {
  return FeedbacksQueue.enqueue(surveyFeedback);
};

/**
 * @param {Feedback[]} feedbacks
 * @param {Survey} survey
 * @returns {Feedback[]}
 */
export const finalizeSubmitedFeedback = (feedbacks, survey) => {
  const { pages } = survey;
  const result = [...feedbacks];

  pages.forEach((page) => {
    const { questions } = page;
    questions.forEach((question) => {
      const { questionId, type } = question;
      const hasAnswered = feedbacks.find(
        (feedback) => feedback.questionId === questionId
      );
      if (type === 'statement' && !hasAnswered) {
        result.push({
          questionId: questionId,
          answers: [-1],
          type: 'statement',
        });
      }
    });
  });

  return result;
};

/**@typedef {import('../data').Feedback} Feedback */
/**@typedef {import('../data').SurveyFeedback} SurveyFeedback */
