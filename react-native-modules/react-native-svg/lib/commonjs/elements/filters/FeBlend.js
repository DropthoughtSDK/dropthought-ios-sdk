"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extractFilter = require("../../lib/extract/extractFilter");
var _FeBlendNativeComponent = _interopRequireDefault(require("../../fabric/FeBlendNativeComponent"));
var _FilterPrimitive = _interopRequireDefault(require("./FilterPrimitive"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
class FeBlend extends _FilterPrimitive.default {
  static displayName = 'FeBlend';
  static defaultProps = {
    ...this.defaultPrimitiveProps
  };
  render() {
    return /*#__PURE__*/React.createElement(_FeBlendNativeComponent.default, _extends({
      ref: ref => this.refMethod(ref)
    }, (0, _extractFilter.extractFilter)(this.props), (0, _extractFilter.extractIn)(this.props), (0, _extractFilter.extractFeBlend)(this.props)));
  }
}
exports.default = FeBlend;
//# sourceMappingURL=FeBlend.js.map