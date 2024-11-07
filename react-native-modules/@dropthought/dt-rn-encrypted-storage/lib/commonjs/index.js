"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _cryptoUtils = require("./crypto-utils");
Object.keys(_cryptoUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cryptoUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cryptoUtils[key];
    }
  });
});
var _EncryptedStorage = require("./EncryptedStorage");
Object.keys(_EncryptedStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EncryptedStorage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EncryptedStorage[key];
    }
  });
});
//# sourceMappingURL=index.js.map