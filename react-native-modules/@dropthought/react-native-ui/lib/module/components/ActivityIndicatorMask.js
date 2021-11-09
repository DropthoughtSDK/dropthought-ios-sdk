import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GlobalStyle } from '../styles';

const ActivityIndicatorMask = ({
  loading = false
}) => {
  return loading ? /*#__PURE__*/React.createElement(View, {
    style: [GlobalStyle.loadingMask, GlobalStyle.fullCenter]
  }, /*#__PURE__*/React.createElement(ActivityIndicator, null)) : null;
};

export default ActivityIndicatorMask;
//# sourceMappingURL=ActivityIndicatorMask.js.map