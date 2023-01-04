import { initializeWithAPIKey } from './initialize';

// @ts-ignore
import { feedbackUploader as jsFeedbackUploader } from './lib/FeedbacksUploader';
import type { Storage } from './lib/Storage';

const BASE_URL = 'https://stage-api.dropthought.com/dtapp';
export function initialize(params: { apiKey: string; storage: Storage }) {
  initializeWithAPIKey({
    ...params,
    baseURL: BASE_URL,
  });
}

export const feedbackUploader = {
  upload(): Promise<void> {
    return jsFeedbackUploader.upload();
  },
  clear(): Promise<void> {
    return jsFeedbackUploader.clear();
  },
};

export { initializeWithAPIKey };

export * from './kiosk-rn-sdk';
