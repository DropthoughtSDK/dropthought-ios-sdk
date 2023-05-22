import React from 'react';
import { StyleSheet, Text } from 'react-native';
import GlobalStyle, { Colors } from '../styles';
import i18n from '../translation';

const MetadataDesc = ({
  question,
  rtl
}) => {
  var _question$exampleMeta;

  if (!question.metaDataType) return null; // if translation is not found, do not print anything

  const desc = (_question$exampleMeta = question.exampleMetadataText) !== null && _question$exampleMeta !== void 0 ? _question$exampleMeta : i18n.t(`metadata-question-desc:${question.metaDataType}`, '');
  if (!desc) return null;
  return /*#__PURE__*/React.createElement(Text, {
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