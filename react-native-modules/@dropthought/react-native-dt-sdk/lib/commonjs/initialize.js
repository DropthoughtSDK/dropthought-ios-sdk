"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeWithAPIKey = initializeWithAPIKey;

var _API = require("./lib/API");

var _encryptedStorage = require("./lib/encrypted-storage");

var _FeedbacksUploader = require("./lib/FeedbacksUploader");

var _Storage = require("./lib/Storage");

// @ts-ignore
// @ts-ignore
// @ts-ignore
async function initializeWithAPIKey(param) {
  const {
    apiKey,
    baseURL,
    storage
  } = param;

  _API.sdkFetcher.init({
    baseURL,
    apiKey
  }); // storage setting


  (0, _Storage.initStorage)(storage);
  await (0, _encryptedStorage.initialize)(apiKey, storage);
  await _FeedbacksUploader.feedbackUploader.initialize();
}
//# sourceMappingURL=initialize.js.map