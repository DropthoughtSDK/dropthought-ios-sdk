"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ClassicQuestionContainer: true,
  QuestionContainer: true,
  SurveyScreenLayout: true,
  SurveyProgressBarPosition: true,
  EndScreenLayout: true,
  StartScreenLayout: true,
  PlaceholderScreen: true,
  ActivityIndicatorMask: true,
  i18n: true,
  Colors: true,
  GlobalStyle: true
};
Object.defineProperty(exports, "ActivityIndicatorMask", {
  enumerable: true,
  get: function () {
    return _ActivityIndicatorMask.default;
  }
});
Object.defineProperty(exports, "ClassicQuestionContainer", {
  enumerable: true,
  get: function () {
    return _ClassicQuestionContainer.default;
  }
});
Object.defineProperty(exports, "Colors", {
  enumerable: true,
  get: function () {
    return _styles.Colors;
  }
});
Object.defineProperty(exports, "EndScreenLayout", {
  enumerable: true,
  get: function () {
    return _EndScreenLayout.default;
  }
});
Object.defineProperty(exports, "GlobalStyle", {
  enumerable: true,
  get: function () {
    return _styles.GlobalStyle;
  }
});
Object.defineProperty(exports, "PlaceholderScreen", {
  enumerable: true,
  get: function () {
    return _PlaceholderScreen.default;
  }
});
Object.defineProperty(exports, "QuestionContainer", {
  enumerable: true,
  get: function () {
    return _QuestionContainer.default;
  }
});
Object.defineProperty(exports, "StartScreenLayout", {
  enumerable: true,
  get: function () {
    return _StartScreenLayout.default;
  }
});
Object.defineProperty(exports, "SurveyProgressBarPosition", {
  enumerable: true,
  get: function () {
    return _SurveyScreenLayout.SurveyProgressBarPosition;
  }
});
Object.defineProperty(exports, "SurveyScreenLayout", {
  enumerable: true,
  get: function () {
    return _SurveyScreenLayout.default;
  }
});
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function () {
    return _translation.default;
  }
});
var _ClassicQuestionContainer = _interopRequireDefault(require("./containers/ClassicQuestionContainer"));
var _QuestionContainer = _interopRequireDefault(require("./containers/QuestionContainer"));
var _SurveyScreenLayout = _interopRequireWildcard(require("./containers/SurveyScreenLayout"));
var _EndScreenLayout = _interopRequireDefault(require("./containers/EndScreenLayout"));
var _StartScreenLayout = _interopRequireDefault(require("./containers/StartScreenLayout"));
var _PlaceholderScreen = _interopRequireWildcard(require("./components/PlaceholderScreen"));
Object.keys(_PlaceholderScreen).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PlaceholderScreen[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PlaceholderScreen[key];
    }
  });
});
var _ActivityIndicatorMask = _interopRequireDefault(require("./components/ActivityIndicatorMask"));
var _translation = _interopRequireDefault(require("./translation"));
var _styles = require("./styles");
var _KioskProvider = require("./KioskProvider");
Object.keys(_KioskProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _KioskProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _KioskProvider[key];
    }
  });
});
var _useWindowDimensions = require("./hooks/useWindowDimensions");
Object.keys(_useWindowDimensions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useWindowDimensions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useWindowDimensions[key];
    }
  });
});
var _feedback = require("./contexts/feedback");
Object.keys(_feedback).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _feedback[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _feedback[key];
    }
  });
});
var _theme = require("./contexts/theme");
Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme[key];
    }
  });
});
var _Button = require("./components/Button");
Object.keys(_Button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Button[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Button[key];
    }
  });
});
var _KeyboardAvoidingView = require("./components/KeyboardAvoidingView");
Object.keys(_KeyboardAvoidingView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _KeyboardAvoidingView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _KeyboardAvoidingView[key];
    }
  });
});
var _FileIcon = require("./components/FileIcon");
Object.keys(_FileIcon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FileIcon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FileIcon[key];
    }
  });
});
var _data = require("./data");
Object.keys(_data).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _data[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _data[key];
    }
  });
});
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map