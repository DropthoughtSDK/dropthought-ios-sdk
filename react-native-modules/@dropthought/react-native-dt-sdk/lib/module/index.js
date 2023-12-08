import { initializeWithAPIKey } from './initialize';

// @ts-ignore
import { feedbackUploader as jsFeedbackUploader } from './lib/FeedbacksUploader';
export const BASE_URL = 'https://api.dropthought.com/dtapp';
export function initialize(params) {
  initializeWithAPIKey({
    ...params,
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
export { initializeWithAPIKey };
export * from './kiosk-rn-sdk';
//# sourceMappingURL=index.js.map