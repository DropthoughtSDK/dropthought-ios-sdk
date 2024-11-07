"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitFeedback = exports.saveFeedback = exports.finalizeSubmitedFeedback = void 0;
var _API = require("./API");
var _FeedbacksUploader = require("./FeedbacksUploader");
/**
 * the format is to fit in the react-async deferFn
 * @param {[SurveyFeedback]} surveyFeedback
 */
const submitFeedback = async ([surveyFeedback]) => {
  return (0, _API.apiPostEvent)({
    programId: surveyFeedback.surveyId,
    feedbacks: surveyFeedback.feedbacks,
    metadata: surveyFeedback.metadata,
    createdTime: surveyFeedback.createdTime,
    timeZone: surveyFeedback.timeZone
  }, {
    // use shorter timeout here,
    timeout: 10000
  }).catch(error => {
    // save result when there's error
    // TODO: maybe there're some errors no need to be saved?
    saveFeedback(surveyFeedback);
    throw error;
  });
};

/**
 * @param {SurveyFeedback} surveyFeedback
 */
exports.submitFeedback = submitFeedback;
const saveFeedback = async surveyFeedback => {
  return _FeedbacksUploader.FeedbacksQueue.enqueue(surveyFeedback);
};

/**
 * @param {Feedback[]} feedbacks
 * @param {Survey} survey
 * @returns {Feedback[]}
 */
exports.saveFeedback = saveFeedback;
const finalizeSubmitedFeedback = (feedbacks, survey) => {
  const {
    pages
  } = survey;
  const result = [...feedbacks];
  pages.forEach(page => {
    const {
      questions
    } = page;
    questions.forEach(question => {
      const {
        questionId,
        type
      } = question;
      const hasAnswered = feedbacks.find(feedback => feedback.questionId === questionId);
      if (type === 'statement' && !hasAnswered) {
        result.push({
          questionId: questionId,
          answers: [-1],
          type: 'statement'
        });
      }
    });
  });
  return result;
};

/**@typedef {import('../data').Feedback} Feedback */
/**@typedef {import('../data').SurveyFeedback} SurveyFeedback */
exports.finalizeSubmitedFeedback = finalizeSubmitedFeedback;
//# sourceMappingURL=Feedback.js.map