"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _FeedbackProvider = require("./FeedbackProvider");
Object.keys(_FeedbackProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FeedbackProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FeedbackProvider[key];
    }
  });
});
var _FeedbackHooks = require("./FeedbackHooks");
Object.keys(_FeedbackHooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FeedbackHooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FeedbackHooks[key];
    }
  });
});
var _FeedbackHelpers = require("./FeedbackHelpers");
Object.keys(_FeedbackHelpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FeedbackHelpers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FeedbackHelpers[key];
    }
  });
});
//# sourceMappingURL=index.js.map