"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CloseButton = exports.ICON_SIZE = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const closeIconSource = require('./assets/ic-close.png');

const hitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10
};
const ICON_SIZE = 52;
exports.ICON_SIZE = ICON_SIZE;

const CloseButton = ({
  tintColor = undefined,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, _extends({
    style: styles.icon
  }, props, {
    hitSlop: hitSlop
  }), /*#__PURE__*/React.createElement(_reactNative.Image, {
    source: closeIconSource,
    style: [styles.iconImage, {
      tintColor
    }]
  }));
};

exports.CloseButton = CloseButton;
var _default = CloseButton;
exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    resizeMode: 'contain'
  }
});
//# sourceMappingURL=CloseButton.js.map