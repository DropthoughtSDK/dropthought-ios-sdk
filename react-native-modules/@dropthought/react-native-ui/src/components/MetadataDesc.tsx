import React from 'react';
import { StyleSheet, Text } from 'react-native';
import GlobalStyle, { Colors } from '../styles';
import type { Question } from '../data';

const MetadataDesc = ({
  question,
  rtl,
}: {
  question: Question;
  rtl: boolean;
}) => {
  if (!question.metaDataType) return null;

  // if translation is not found, do not print anything
  const desc = question.exampleMetadataText;
  if (!desc) return null;

  return (
    <Text
      testID="test:id/dropdown_other_question"
      style={[styles.descText, rtl && GlobalStyle.textAlignRight]}
    >
      {desc}
    </Text>
  );
};

export default MetadataDesc;

const styles = StyleSheet.create({
  descText: {
    color: Colors.openQuestionSubTitle,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 17,
  },
});
