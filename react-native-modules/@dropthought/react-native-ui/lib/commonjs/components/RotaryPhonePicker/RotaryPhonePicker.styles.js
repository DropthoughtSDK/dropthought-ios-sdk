"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _default = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#071B43',
    width: 400,
    height: 400,
    borderRadius: 200
  },
  content: {
    width: 250,
    height: 250,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 75,
    backgroundColor: '#FCF268',
    borderRadius: 125,
    margin: 'auto'
  },
  item: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30
  },
  cursor: {
    position: 'absolute',
    top: 100
  }
});

exports.default = _default;
//# sourceMappingURL=RotaryPhonePicker.styles.js.map