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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let PlaceholderImageTypes;
exports.PlaceholderImageTypes = PlaceholderImageTypes;

(function (PlaceholderImageTypes) {
  PlaceholderImageTypes["NoInternet"] = "NoInternet";
  PlaceholderImageTypes["ProgramScheduled"] = "ProgramScheduled";
  PlaceholderImageTypes["ProgramExpired"] = "ProgramExpired";
  PlaceholderImageTypes["ProgramDeleted"] = "ProgramDeleted";
  PlaceholderImageTypes["ProgramDeactivated"] = "ProgramDeactivated";
  PlaceholderImageTypes["ProgramUnavailable"] = "ProgramUnavailable";
})(PlaceholderImageTypes || (exports.PlaceholderImageTypes = PlaceholderImageTypes = {}));

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
  }, /*#__PURE__*/React.createElement(_reactNative.Image // @ts-ignore
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
  container: { ..._styles.GlobalStyle.flex1,
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

var _default = PlaceholderScreen;
exports.default = _default;
//# sourceMappingURL=PlaceholderScreen.js.map