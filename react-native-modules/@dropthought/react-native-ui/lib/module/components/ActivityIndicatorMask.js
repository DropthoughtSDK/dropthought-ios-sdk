import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GlobalStyle } from '../styles';

const ActivityIndicatorMask = ({
  loading = false,
  style
}) => {
  return loading ? /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.loadingMask, GlobalStyle.fullCenter, style]
  }, /*#__PURE__*/React.createElement(ActivityIndicator, null)) : null;
};

export default ActivityIndicatorMask;
//# sourceMappingURL=ActivityIndicatorMask.js.map