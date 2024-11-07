import React from 'react';
import { StyleSheet, Text } from 'react-native';
import GlobalStyle, { Colors } from '../styles';
const MetadataDesc = ({
  question,
  rtl
}) => {
  if (!question.metaDataType) return null;

  // if translation is not found, do not print anything
  const desc = question.exampleMetadataText;
  if (!desc) return null;
  return /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/dropdown_other_question",
    style: [styles.descText, rtl && GlobalStyle.textAlignRight]
  }, desc);
};
export default MetadataDesc;
const styles = StyleSheet.create({
  descText: {
    color: Colors.openQuestionSubTitle,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 17
  }
});
//# sourceMappingURL=MetadataDesc.js.map