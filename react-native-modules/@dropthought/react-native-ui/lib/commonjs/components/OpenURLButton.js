"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeWebview = require("react-native-webview");
var _styles = _interopRequireWildcard(require("../styles"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _theme = require("../contexts/theme");
var _translation = _interopRequireDefault(require("../translation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ts-check

/**
 * @param {OpenURLButtonProps} param0
 * @returns
 */

const OpenURLButton = ({
  url,
  textStyle
}) => {
  const [visible, setVisible] = (0, _react.useState)(false);
  const {
    backgroundColor,
    fontColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const {
    top
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const rtl = _translation.default.dir() === 'rtl';
  const urlStyle = [styles.url, {
    color: colorScheme === _theme.COLOR_SCHEMES.dark ? fontColor : _styles.Colors.urlBlue
  }, rtl && _styles.default.textAlignRight, textStyle];
  const modalContentStyle = [styles.modalContent, {
    paddingTop: top,
    backgroundColor: backgroundColor
  }];
  const headerStyle = [styles.header, {
    backgroundColor: backgroundColor
  }];
  const iconStyle = {
    tintColor: fontColor
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => setVisible(true),
    style: _styles.default.flex1
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/statement_url",
    style: urlStyle,
    numberOfLines: 1
  }, url)), /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: visible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: modalContentStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: headerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: "test:id/icon_statement_webview_close",
    style: styles.closeIcon,
    onPress: () => setVisible(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: iconStyle
    // @ts-ignore
    ,
    source: require('../assets/icClose24Px.png')
  }))), /*#__PURE__*/_react.default.createElement(_reactNativeWebview.WebView, {
    source: {
      uri: url
    },
    style: _styles.default.flex1,
    nestedScrollEnabled: true
  }))));
};
var _default = exports.default = OpenURLButton;
const styles = _reactNative.StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  header: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    backgroundColor: _styles.Colors.white,
    borderBottomWidth: 0.3,
    borderBottomColor: '#00000030',
    paddingHorizontal: 4
  },
  closeIcon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  url: {
    fontSize: 16,
    fontWeight: '500'
  }
});
//# sourceMappingURL=OpenURLButton.js.map