import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import GlobalStyle, { Colors } from '../styles';
import i18n from '../translation';

type Props = {
  message: string;
};

const QuestionWarningMessage = ({ message }: Props) => {
  if (!message) return null;
  const rtl = i18n.dir() === 'rtl';

  return (
    <View style={[styles.container, rtl && GlobalStyle.horizontalFlip]}>
      <View style={styles.tip} />
      <View style={styles.bubble}>
        <Text style={[styles.hint, rtl && GlobalStyle.horizontalFlip]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default QuestionWarningMessage;

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
  bubble: {
    backgroundColor: '#FFDEE4',
    minWidth: 280,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9,
  },
  hint: {
    color: Colors.black,
    fontSize: 13,
  },
});
