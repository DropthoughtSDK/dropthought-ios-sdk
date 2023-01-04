"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _default = _reactNative.StyleSheet.create({
  container: {
    position: 'relative'
  },
  selectedIndicator: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'hsl(200, 8%, 94%)',
    borderRadius: 5,
    top: '50%'
  },
  scrollView: {
    overflow: 'hidden',
    flex: 1
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 100
  }
});

exports.default = _default;
//# sourceMappingURL=WheelPicker.styles.js.map