"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _reactNativeUi = require("@dropthought/react-native-ui");

var _CloseButton = _interopRequireWildcard(require("../components/CloseButton"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const isRtl = _reactNativeUi.i18n.dir() === 'rtl';

  const isPhone = (0, _reactNativeUi.useDimensionWidthType)() === _reactNativeUi.DimensionWidthType.phone;

  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: themeColor,
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
};

var _default = Header;
exports.default = _default;

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