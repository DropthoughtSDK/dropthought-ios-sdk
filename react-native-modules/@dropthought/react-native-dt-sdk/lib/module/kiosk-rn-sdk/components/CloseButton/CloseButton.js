function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
const closeIconSource = require('./assets/ic-close.png');
const hitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10
};
export const ICON_SIZE = 52;
export const CloseButton = ({
  tintColor = undefined,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
    style: styles.icon
  }, props, {
    hitSlop: hitSlop
  }), /*#__PURE__*/React.createElement(Image, {
    source: closeIconSource,
    style: [styles.iconImage, {
      tintColor
    }]
  }));
};
export default CloseButton;
const styles = StyleSheet.create({
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