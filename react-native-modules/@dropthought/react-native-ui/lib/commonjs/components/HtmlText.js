"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeAutoheightWebview = _interopRequireDefault(require("react-native-autoheight-webview"));
var _translation = _interopRequireDefault(require("../translation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const HtmlText = ({
  html,
  width,
  maxHeight,
  ...webViewProps
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const customStyle = `
            * {
                direction: ${rtl ? 'rtl' : 'ltr'};
            }
            a {
                pointer-events: none;
            }
        `;
  const [webViewSize, setWebViewSize] = (0, _react.useState)({
    height: 0,
    width: 0
  });
  const webViewStyle = (0, _react.useMemo)(() => {
    return {
      width: width ?? _reactNative.Dimensions.get('window').width * 0.8
    };
  }, [width]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [webViewSize, {
      maxHeight
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeAutoheightWebview.default, _extends({
    style: webViewStyle,
    onSizeUpdated: setWebViewSize,
    source: {
      html
    },
    scrollEnabled: maxHeight !== undefined,
    customStyle: customStyle
  }, webViewProps)));
};
var _default = exports.default = HtmlText;
//# sourceMappingURL=HtmlText.js.map