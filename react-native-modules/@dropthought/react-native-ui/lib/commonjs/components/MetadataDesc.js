"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireWildcard(require("../styles"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MetadataDesc = ({
  question,
  rtl
}) => {
  if (!question.metaDataType) return null;

  // if translation is not found, do not print anything
  const desc = question.exampleMetadataText;
  if (!desc) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/dropdown_other_question",
    style: [styles.descText, rtl && _styles.default.textAlignRight]
  }, desc);
};
var _default = exports.default = MetadataDesc;
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