"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _en = _interopRequireDefault(require("./en.json"));

var _ar = _interopRequireDefault(require("./ar.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// translations i18n
// init i18n
_i18next.default.init({
  debug: false,
  fallbackLng: 'en',
  lng: 'en',
  ns: ['common', 'start-survey', 'survey', 'end-survey'],
  resources: {
    en: _en.default,
    ar: _ar.default
  },
  interpolation: {
    escapeValue: false // not needed for react

  },
  react: {
    wait: true
  }
});

var _default = _i18next.default;
exports.default = _default;
//# sourceMappingURL=index.js.map