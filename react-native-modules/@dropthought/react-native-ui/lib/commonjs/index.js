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
  KioskProvider: true,
  KioskProviderProps: true,
  i18n: true,
  Colors: true,
  GlobalStyle: true,
  APPEARANCE: true,
  COLOR_SCHEMES: true,
  THEME_OPTION: true,
  useTheme: true,
  ActivityIndicatorMask: true
};
Object.defineProperty(exports, "APPEARANCE", {
  enumerable: true,
  get: function () {
    return _theme.APPEARANCE;
  }
});
Object.defineProperty(exports, "ActivityIndicatorMask", {
  enumerable: true,
  get: function () {
    return _ActivityIndicatorMask.default;
  }
});
Object.defineProperty(exports, "COLOR_SCHEMES", {
  enumerable: true,
  get: function () {
    return _theme.COLOR_SCHEMES;
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
Object.defineProperty(exports, "KioskProvider", {
  enumerable: true,
  get: function () {
    return _KioskProvider.KioskProvider;
  }
});
Object.defineProperty(exports, "KioskProviderProps", {
  enumerable: true,
  get: function () {
    return _KioskProvider.KioskProviderProps;
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
Object.defineProperty(exports, "THEME_OPTION", {
  enumerable: true,
  get: function () {
    return _theme.THEME_OPTION;
  }
});
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function () {
    return _translation.default;
  }
});
Object.defineProperty(exports, "useTheme", {
  enumerable: true,
  get: function () {
    return _theme.useTheme;
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

var _KioskProvider = require("./KioskProvider");

var _translation = _interopRequireDefault(require("./translation"));

var _styles = require("./styles");

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

var _theme = require("./contexts/theme");

var _ActivityIndicatorMask = _interopRequireDefault(require("./components/ActivityIndicatorMask"));

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map