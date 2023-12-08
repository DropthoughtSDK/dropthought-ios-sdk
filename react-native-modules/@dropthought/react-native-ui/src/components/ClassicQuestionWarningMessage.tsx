import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import GlobalStyle, { Colors } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

type Props = {
  message: string;
};

const ClassicQuestionWarningMessage = ({ message }: Props) => {
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const rtl = i18n.dir() === 'rtl';

  if (!message) return null;

  const textStyle = [
    styles.hint,
    isDarkMode && styles.darkModeHint,
    rtl && GlobalStyle.horizontalFlip,
    { lineHeight: i18n.language === 'te' ? 22 : undefined },
  ];

  return (
    <View style={[styles.container, rtl && GlobalStyle.horizontalFlip]}>
      <View style={[styles.tip, isDarkMode && styles.darkModeTip]} />
      <View style={[styles.bubble, isDarkMode && styles.darkModeBubble]}>
        <Text style={textStyle}>{message}</Text>
      </View>
    </View>
  );
};

export default ClassicQuestionWarningMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
  },
  tip: {
    top: 13,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderRightWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#FFDEE4',
  },
  darkModeTip: {
    borderRightColor: '#39393a',
  },
  bubble: {
    backgroundColor: '#FFDEE4',
    minWidth: 280,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9,
  },
  darkModeBubble: {
    backgroundColor: '#39393a',
  },
  hint: {
    color: Colors.black,
    fontSize: 13,
  },
  darkModeHint: {
    color: '#FFE0E5',
  },
});
