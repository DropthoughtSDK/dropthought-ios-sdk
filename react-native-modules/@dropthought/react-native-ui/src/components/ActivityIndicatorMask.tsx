import React from 'react';
import { View, ActivityIndicator, ViewStyle } from 'react-native';
import { GlobalStyle } from '../styles';

interface Props {
  loading?: boolean;
  style?: ViewStyle;
}

const ActivityIndicatorMask: React.FC<Props> = ({ loading = false, style }) => {
  return loading ? (
    <View style={[GlobalStyle.loadingMask, GlobalStyle.fullCenter, style]}>
      <ActivityIndicator />
    </View>
  ) : null;
};

export default ActivityIndicatorMask;
