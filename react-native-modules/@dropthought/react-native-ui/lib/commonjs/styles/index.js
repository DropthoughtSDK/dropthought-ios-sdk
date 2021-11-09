"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _Colors = require("./Colors");

Object.keys(_Colors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Colors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Colors[key];
    }
  });
});

var _GlobalStyle = require("./GlobalStyle");

Object.keys(_GlobalStyle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _GlobalStyle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GlobalStyle[key];
    }
  });
});
var _default = _GlobalStyle.GlobalStyle;
exports.default = _default;
//# sourceMappingURL=index.js.map