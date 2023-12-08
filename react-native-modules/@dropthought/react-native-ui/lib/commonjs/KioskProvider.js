"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KioskProvider = void 0;

var React = _interopRequireWildcard(require("react"));

var _feedback = require("./contexts/feedback");

var _theme = require("./contexts/theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const KioskProvider = ({
  children,
  themeOption,
  appearance,
  hexCode,
  fontColor,
  backgroundColor
}) => {
  return /*#__PURE__*/React.createElement(_theme.ThemeProvider, {
    themeOption: themeOption,
    appearance: appearance,
    hexCode: hexCode,
    fontColor: fontColor,
    backgroundColor: backgroundColor
  }, /*#__PURE__*/React.createElement(_feedback.FeedbackProvider, null, children));
};

exports.KioskProvider = KioskProvider;
//# sourceMappingURL=KioskProvider.js.map