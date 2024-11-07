"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ThemeProvider = require("./ThemeProvider");
Object.keys(_ThemeProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ThemeProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ThemeProvider[key];
    }
  });
});
var _ThemeHooks = require("./ThemeHooks");
Object.keys(_ThemeHooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ThemeHooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ThemeHooks[key];
    }
  });
});
var _theme = require("./theme.const");
Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme[key];
    }
  });
});
//# sourceMappingURL=index.js.map