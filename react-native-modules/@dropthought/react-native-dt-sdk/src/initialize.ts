// @ts-ignore
import { sdkFetcher } from './lib/API';

// @ts-ignore
import { initialize } from './lib/encrypted-storage';

// @ts-ignore
import { feedbackUploader } from './lib/FeedbacksUploader';

import { initStorage, Storage } from './lib/Storage';

export async function initializeWithAPIKey(param: {
  apiKey: string;
  baseURL?: string;
  storage: Storage;
}) {
  const { apiKey, baseURL, storage } = param;
  sdkFetcher.init({
    baseURL,
    apiKey,
  });
  // storage setting
  initStorage(storage);
  await initialize(apiKey, storage);
  await feedbackUploader.initialize();
}
