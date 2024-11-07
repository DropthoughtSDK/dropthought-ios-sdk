"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Fetcher = require("./Fetcher");
Object.keys(_Fetcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Fetcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Fetcher[key];
    }
  });
});
//# sourceMappingURL=index.js.map