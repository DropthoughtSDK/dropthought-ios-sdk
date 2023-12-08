"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SDKEntry: true
};
Object.defineProperty(exports, "SDKEntry", {
  enumerable: true,
  get: function () {
    return _SDKEntry.default;
  }
});
var _SurveyModal = require("./SurveyModal");
Object.keys(_SurveyModal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SurveyModal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SurveyModal[key];
    }
  });
});
var _SDKEntry = _interopRequireDefault(require("./SDKEntry"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map