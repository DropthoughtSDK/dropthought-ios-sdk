import { initializeWithAPIKey } from './initialize'; // @ts-ignore

import { feedbackUploader as jsFeedbackUploader, FeedbacksQueue } from './lib/FeedbacksUploader';
const BASE_URL = 'https://api.dropthought.com/dtapp';
export function initialize(params) {
  initializeWithAPIKey({ ...params,
    baseURL: BASE_URL
  });
}
export const feedbackUploader = {
  upload() {
    return jsFeedbackUploader.upload();
  },

  clear() {
    return jsFeedbackUploader.clear();
  }

};
export function getAllFeedbacks() {
  return FeedbacksQueue.getAll();
}
export { initializeWithAPIKey };
export * from './kiosk-rn-sdk';
//# sourceMappingURL=index.js.map