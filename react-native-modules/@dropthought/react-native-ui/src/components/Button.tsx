import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { Colors } from '../styles';

interface Props extends TouchableOpacityProps {
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
}: Props) => {
  const buttonStyle: ViewStyle[] = [
    styles.button,
    {
      backgroundColor: color,
    },
    disabled ? styles.disabledButton : {},
    width ? { width } : {},
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
