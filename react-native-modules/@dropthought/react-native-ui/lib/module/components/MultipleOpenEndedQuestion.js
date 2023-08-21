import React from 'react';
import { View, StyleSheet, Text, TextInput, Platform, ScrollView as RNScrollView } from 'react-native';
import { KeyboardAvoidingScrollView } from './KeyboardAvoidingView';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import MandatoryTitle from './MandatoryTitle';
import useMultipleOpenEnded from '../hooks/useMultipleOpenEnded';
import useOpenEnded from '../hooks/useOpenEnded';
import { metaDataFormatValidator } from '../utils/data';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
const ScrollView = Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

const RowComponent = ({
  question,
  questionRow,
  feedback,
  selectedAnswerState,
  updateFeedback,
  themeColor,
  index
}) => {
  var _question$metaDataTyp;

  const {
    questionTitle,
    exampleMetadataText,
    metaDataType = 'String',
    responseErrorText,
    scale,
    phiData
  } = questionRow;
  const [, setSelectedAnswer] = selectedAnswerState;
  const {
    metadataTypeKeyboard,
    metadataTypeAutoCapitalize,
    text,
    isFocus,
    hasEdited,
    onChangeTextHandler,
    onEndEditingHandler,
    onFocus,
    onBlur
  } = useOpenEnded(feedback, index);
  const {
    colorScheme,
    fontColor
  } = useTheme();
  const opacityThemeColor = addOpacityToColor(themeColor, 0.1);
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  const isValid = metaDataFormatValidator(text, question === null || question === void 0 ? void 0 : (_question$metaDataTyp = question.metaDataTypeList) === null || _question$metaDataTyp === void 0 ? void 0 : _question$metaDataTyp[index]);
  const isFoucsAndInValid = isFocus || !isValid && hasEdited;

  const onChangeText = textInput => {
    onChangeTextHandler(textInput);
    setSelectedAnswer(previous => {
      const answers = previous.map((value, i) => i === index ? textInput : value);
      updateFeedback(answers);
      return answers;
    });
  };

  const rowContainerStyle = [styles.rowContainer, {
    backgroundColor: isFocus ? isDark ? Colors.rankingContainerBgDark : addOpacityToColor(themeColor || Colors.white, 0.1) : undefined
  }];
  const rowTitleTextStyle = [styles.rowTitleText, {
    color: fontColor
  }];
  const hippaText = i18n.t('survey:hippa-hint');
  let inputBorderColor;
  let bottomTextComponent;

  if (!isValid && hasEdited) {
    inputBorderColor = Colors.warningRed;
    const errorTextStyle = [styles.responseText, {
      color: Colors.warningRed
    }];
    bottomTextComponent = /*#__PURE__*/React.createElement(Text, {
      style: errorTextStyle
    }, responseErrorText);
  } else if (isFocus) {
    inputBorderColor = themeColor;
    const descTextStyle = [styles.responseText, {
      color: Colors.openQuestionSubTitle
    }];
    bottomTextComponent = /*#__PURE__*/React.createElement(Text, {
      style: descTextStyle
    }, phiData ? hippaText : '');
  } else {
    inputBorderColor = isDark ? Colors.rankingBorderDark : Colors.white;
    bottomTextComponent = null;
  }

  const inputStyle = [styles.input, {
    backgroundColor: isDark ? Colors.rankingBorderDark : opacityThemeColor,
    borderColor: inputBorderColor,
    color: fontColor
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: rowContainerStyle
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: rowTitleTextStyle
  }, questionTitle)), /*#__PURE__*/React.createElement(View, {
    style: styles.rowContent
  }, exampleMetadataText && isFoucsAndInValid ? /*#__PURE__*/React.createElement(Text, {
    style: styles.rowSubTitleText
  }, exampleMetadataText) : null, /*#__PURE__*/React.createElement(TextInput, {
    style: inputStyle,
    onChangeText: onChangeText,
    onEndEditing: onEndEditingHandler,
    value: text,
    onFocus: onFocus,
    onBlur: onBlur,
    maxLength: scale,
    keyboardType: metadataTypeKeyboard(metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(metaDataType)
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.rowBottomContent
  }, /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, bottomTextComponent), isFoucsAndInValid ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.inputLengthText, GlobalStyle.textAlignRight]
  }, `${scale - text.length}/${scale}`) : null)));
};

const MultipleOpenEndedQuestion = ({
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    questionRows,
    selectedAnswerState,
    handleErrorHint,
    updateFeedback
  } = useMultipleOpenEnded(question, feedback, onFeedback);
  const rowList = questionRows.map((questionRow, index) => /*#__PURE__*/React.createElement(RowComponent, {
    question: question,
    questionRow: questionRow,
    feedback: feedback,
    selectedAnswerState: selectedAnswerState,
    updateFeedback: updateFeedback,
    index: index,
    themeColor: themeColor,
    key: index.toString()
  }));
  return /*#__PURE__*/React.createElement(ScrollView, {
    extraAvoidingSpace: 30,
    style: styles.container
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: false,
    question: question,
    style: styles.title,
    invalidMessage: handleErrorHint(forgot)
  }), rowList);
};

export default /*#__PURE__*/React.memo(MultipleOpenEndedQuestion);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30
  },
  title: {
    marginBottom: 16
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: -20,
    borderRadius: 4
  },
  rowTitleText: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 12
  },
  rowSubTitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.openQuestionSubTitle,
    marginBottom: 8
  },
  rowContent: {
    flex: 8
  },
  rowBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 8
  },
  inputLengthText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.openQuestionSubTitle
  },
  responseText: {
    fontSize: 12,
    fontWeight: '500'
  }
});
//# sourceMappingURL=MultipleOpenEndedQuestion.js.map