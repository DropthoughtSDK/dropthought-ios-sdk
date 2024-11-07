import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import type { TouchableOpacityProps, ViewStyle } from 'react-native';

import { Colors } from '../styles';

interface Props {
  title: string;
  width?: number;
  color?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

const Button = ({
  title,
  disabled = false,
  width,
  containerStyle,
  color = Colors.purple,
  ...props
}: Props & TouchableOpacityProps) => {
  const buttonStyle: ViewStyle[] = [
    styles.button,
    {
      backgroundColor: color,
    },
    disabled ? styles.disabledButton : {},
    width ? { minWidth: width } : {},
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity {...props} disabled={disabled}>
        <View style={buttonStyle}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    borderRadius: 3,
    flex: undefined,
    paddingHorizontal: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
    paddingVertical: 12,
  },
  disabledButton: {
    backgroundColor: Colors.settingsButtonDisable,
  },
});
