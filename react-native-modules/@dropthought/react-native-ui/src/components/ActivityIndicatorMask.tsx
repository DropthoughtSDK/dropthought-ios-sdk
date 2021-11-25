import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GlobalStyle } from '../styles';

type Props = { loading: boolean };

const ActivityIndicatorMask = ({ loading = false }: Props) => {
  return loading ? (
    <View style={[GlobalStyle.loadingMask, GlobalStyle.fullCenter]}>
      <ActivityIndicator />
    </View>
  ) : null;
};

export default ActivityIndicatorMask;
