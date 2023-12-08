"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _src = require("@dropthought/react-native-ui/src");
var _CloseButton = _interopRequireWildcard(require("../components/CloseButton"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @typedef {object} Props
 * @property {string} title
 * @property {string} themeColor
 * @property {()=>void=} onClose
 */

/**
 * @type {React.FunctionComponent<Props>}
 * @param {Props} props
 */
const Header = ({
  title,
  themeColor,
  onClose
}) => {
  const {
    themeOption
  } = (0, _src.useTheme)();
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const isRtl = _src.i18n.dir() === 'rtl';
  const isPhone = (0, _src.useDimensionWidthType)() === _src.DimensionWidthType.phone;
  const backgroundColor = themeOption === _src.THEME_OPTION.BIJLIRIDE ? _src.Colors.bijlirideHexCode : themeColor;
  const classicHeader = /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor,
      paddingTop: insets.top
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    numberOfLines: 1,
    style: [styles.title, isPhone ? styles.titleIPhone : styles.titleAndroid]
  }, title), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.closeButtonWrapper, isRtl ? styles.closeButtonWrapperRtl : styles.closeButtonWrapperLtr]
  }, /*#__PURE__*/React.createElement(_CloseButton.default, {
    onPress: onClose
  }))));
  return themeOption === _src.THEME_OPTION.CLASSIC || themeOption === _src.THEME_OPTION.BIJLIRIDE ? classicHeader : null;
};
var _default = exports.default = Header;
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    height: _CloseButton.ICON_SIZE,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: _CloseButton.ICON_SIZE
  },
  titleIPhone: {
    textAlign: 'left'
  },
  titleAndroid: {
    textAlign: 'center'
  },
  closeButtonWrapper: {
    position: 'absolute'
  },
  closeButtonWrapperRtl: {
    right: 0
  },
  closeButtonWrapperLtr: {
    left: 0
  }
});
//# sourceMappingURL=Header.js.map