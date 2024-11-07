"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _skipLogic = require("./skip-logic");
Object.keys(_skipLogic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _skipLogic[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skipLogic[key];
    }
  });
});
var _data = require("./types/data");
Object.keys(_data).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _data[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _data[key];
    }
  });
});
//# sourceMappingURL=index.js.map