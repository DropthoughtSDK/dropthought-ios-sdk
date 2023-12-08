"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BASE_URL: true,
  initialize: true,
  feedbackUploader: true,
  initializeWithAPIKey: true
};
exports.feedbackUploader = exports.BASE_URL = void 0;
exports.initialize = initialize;
Object.defineProperty(exports, "initializeWithAPIKey", {
  enumerable: true,
  get: function () {
    return _initialize.initializeWithAPIKey;
  }
});
var _initialize = require("./initialize");
var _FeedbacksUploader = require("./lib/FeedbacksUploader");
var _kioskRnSdk = require("./kiosk-rn-sdk");
Object.keys(_kioskRnSdk).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _kioskRnSdk[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _kioskRnSdk[key];
    }
  });
});
// @ts-ignore

const BASE_URL = exports.BASE_URL = 'https://api.dropthought.com/dtapp';
function initialize(params) {
  (0, _initialize.initializeWithAPIKey)({
    ...params,
    baseURL: BASE_URL
  });
}
const feedbackUploader = exports.feedbackUploader = {
  upload() {
    return _FeedbacksUploader.feedbackUploader.upload();
  },
  clear() {
    return _FeedbacksUploader.feedbackUploader.clear();
  }
};
//# sourceMappingURL=index.js.map