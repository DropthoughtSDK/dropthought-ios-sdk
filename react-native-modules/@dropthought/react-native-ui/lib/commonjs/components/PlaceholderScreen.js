"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PlaceholderImageTypes = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("../styles");
var _translation = _interopRequireDefault(require("../translation"));
var _theme = require("../contexts/theme");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
let PlaceholderImageTypes = exports.PlaceholderImageTypes = /*#__PURE__*/function (PlaceholderImageTypes) {
  PlaceholderImageTypes["NoInternet"] = "NoInternet";
  PlaceholderImageTypes["ProgramScheduled"] = "ProgramScheduled";
  PlaceholderImageTypes["ProgramExpired"] = "ProgramExpired";
  PlaceholderImageTypes["ProgramDeleted"] = "ProgramDeleted";
  PlaceholderImageTypes["ProgramDeactivated"] = "ProgramDeactivated";
  PlaceholderImageTypes["ProgramUnavailable"] = "ProgramUnavailable";
  return PlaceholderImageTypes;
}({});
const imageTypeSources = {
  [_theme.COLOR_SCHEMES.light]: {
    [PlaceholderImageTypes.NoInternet]: require('../assets/placeholder-no-internet.png'),
    [PlaceholderImageTypes.ProgramScheduled]: require('../assets/placeholder-program-scheduled.png'),
    [PlaceholderImageTypes.ProgramExpired]: require('../assets/placeholder-program-expired.png'),
    [PlaceholderImageTypes.ProgramDeleted]: require('../assets/placeholder-program-deleted.png'),
    [PlaceholderImageTypes.ProgramDeactivated]: require('../assets/placeholder-program-deactivated.png'),
    [PlaceholderImageTypes.ProgramUnavailable]: require('../assets/placeholder-program-unavailable.png')
  },
  [_theme.COLOR_SCHEMES.dark]: {
    [PlaceholderImageTypes.NoInternet]: require('../assets/placeholder-no-internet_dark.png'),
    [PlaceholderImageTypes.ProgramScheduled]: require('../assets/placeholder-program-scheduled_dark.png'),
    [PlaceholderImageTypes.ProgramExpired]: require('../assets/placeholder-program-expired_dark.png'),
    [PlaceholderImageTypes.ProgramDeleted]: require('../assets/placeholder-program-deleted_dark.png'),
    [PlaceholderImageTypes.ProgramDeactivated]: require('../assets/placeholder-program-deactivated_dark.png'),
    [PlaceholderImageTypes.ProgramUnavailable]: require('../assets/placeholder-program-unavailable_dark.png')
  }
};
const PlaceholderScreen = ({
  message,
  imageSource,
  imageType,
  children
}) => {
  const title = _translation.default.t(`placeholder-title:${imageType}`, undefined);
  const {
    colorScheme,
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor
    }]
  }, /*#__PURE__*/React.createElement(_reactNative.Image
  // @ts-ignore
  , {
    source: imageTypeSources[colorScheme][imageType] || imageSource,
    style: styles.image
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.body
  }, title && /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.title, {
      color: fontColor
    }]
  }, title), message && /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.message, {
      color: fontColor
    }, colorScheme === _theme.COLOR_SCHEMES.dark ? styles.messageDark : styles.messageLight]
  }, message), children));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    ..._styles.GlobalStyle.flex1,
    backgroundColor: _styles.Colors.white,
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  body: {
    paddingHorizontal: 60
  },
  title: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 22,
    color: _styles.Colors.placeholderText
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
    fontWeight: 'normal',
    color: _styles.Colors.placeholderText
  },
  messageLight: {
    opacity: 1
  },
  messageDark: {
    opacity: 0.75
  }
});
var _default = exports.default = PlaceholderScreen;
//# sourceMappingURL=PlaceholderScreen.js.map