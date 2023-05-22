"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = _interopRequireWildcard(require("../styles"));

var _translation = _interopRequireDefault(require("../translation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MetadataDesc = ({
  question,
  rtl
}) => {
  var _question$exampleMeta;

  if (!question.metaDataType) return null; // if translation is not found, do not print anything

  const desc = (_question$exampleMeta = question.exampleMetadataText) !== null && _question$exampleMeta !== void 0 ? _question$exampleMeta : _translation.default.t(`metadata-question-desc:${question.metaDataType}`, '');
  if (!desc) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.descText, rtl && _styles.default.textAlignRight]
  }, desc);
};

var _default = MetadataDesc;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  descText: {
    color: _styles.Colors.openQuestionSubTitle,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 17
  }
});
//# sourceMappingURL=MetadataDesc.js.map