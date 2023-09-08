"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  IQAData: true
};
Object.defineProperty(exports, "IQAData", {
  enumerable: true,
  get: function () {
    return _IfcRule.IQAData;
  }
});

var _IfcRule = require("./IfcRule");

var _SkipLogic = require("./SkipLogic");

Object.keys(_SkipLogic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _SkipLogic[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SkipLogic[key];
    }
  });
});
//# sourceMappingURL=index.d.js.map