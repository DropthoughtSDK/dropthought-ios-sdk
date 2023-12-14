import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import GlobalStyle, { Colors } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

type Props = {
  message: string;
};

const QuestionWarningMessage = ({ message }: Props) => {
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const rtl = i18n.dir() === 'rtl';
  const hintStyle = [
    styles.hint,
    {
      color: Colors.warningRed,
      lineHeight: i18n.language === 'te' ? 21 : undefined,
    },
    rtl && GlobalStyle.horizontalFlip,
  ];
  if (!message) return null;

  return (
    <View style={[styles.container, rtl && GlobalStyle.horizontalFlip]}>
      <View style={[styles.tip, isDarkMode && styles.darkModeTip]} />
      <View style={[styles.bubble, isDarkMode && styles.darkModeBubble]}>
        <Text style={hintStyle}>{message}</Text>
      </View>
    </View>
  );
};

export default QuestionWarningMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 12,
  },
  tip: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f9ebeb',
  },
  darkModeTip: {
    borderBottomColor: '#39393a',
  },
  bubble: {
    backgroundColor: '#f9ebeb',
    minWidth: 280,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9,
  },
  darkModeBubble: {
    backgroundColor: '#39393a',
  },
  hint: {
    fontSize: 13,
    fontWeight: '600',
  },
});
