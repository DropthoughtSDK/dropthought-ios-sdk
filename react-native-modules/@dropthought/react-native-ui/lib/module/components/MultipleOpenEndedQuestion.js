import React, { useMemo } from 'react';
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
    fontColor,
    backgroundColor
  } = useTheme();
  const opacityThemeColor = addOpacityToColor(themeColor, 0.1);
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  const isValid = metaDataFormatValidator(text, question === null || question === void 0 ? void 0 : (_question$metaDataTyp = question.metaDataTypeList) === null || _question$metaDataTyp === void 0 ? void 0 : _question$metaDataTyp[index]);
  const isFoucsAndInValid = useMemo(() => isFocus || !isValid && hasEdited, [hasEdited, isFocus, isValid]);

  const onChangeText = textInput => {
    onChangeTextHandler(textInput);
    setSelectedAnswer(previous => {
      const answers = previous.map((value, i) => i === index ? textInput : value);
      updateFeedback(answers);
      return answers;
    });
  };

  const rowContainerStyle = [styles.rowContainer, {
    backgroundColor: isFocus ? isDark ? Colors.rankingContainerBgDark : addOpacityToColor(themeColor || Colors.white, 0.1) : backgroundColor
  }];
  const rowTitleTextStyle = [styles.rowTitleText, {
    color: fontColor
  }];
  const hippaText = i18n.t('survey:hippa-hint');
  const inputBorderColor = useMemo(() => {
    if (!isValid && hasEdited) {
      return Colors.warningRed;
    } else if (isFocus) {
      return themeColor;
    } else {
      return isDark ? Colors.rankingBorderDark : Colors.white;
    }
  }, [hasEdited, isDark, isFocus, isValid, themeColor]);
  const bottomTextComponent = useMemo(() => {
    if (!isValid && hasEdited) {
      return /*#__PURE__*/React.createElement(Text, {
        style: styles.responseTextWarning
      }, responseErrorText);
    } else if (isFocus) {
      return /*#__PURE__*/React.createElement(Text, {
        style: styles.responseText
      }, phiData ? hippaText : '');
    } else {
      return null;
    }
  }, [hasEdited, hippaText, isFocus, isValid, phiData, responseErrorText]);
  const inputStyle = [styles.input, {
    backgroundColor: isDark ? Colors.rankingBorderDark : opacityThemeColor,
    borderColor: inputBorderColor,
    color: fontColor
  }];
  return /*#__PURE__*/React.createElement(View, {
    style: rowContainerStyle
  }, /*#__PURE__*/React.createElement(Text, {
    style: rowTitleTextStyle
  }, questionTitle), /*#__PURE__*/React.createElement(View, {
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
  survey,
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
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    question: question,
    style: styles.title,
    invalidMessage: handleErrorHint(forgot)
  }), rowList);
};

export default /*#__PURE__*/React.memo(MultipleOpenEndedQuestion);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 19
  },
  title: {
    marginBottom: 16,
    marginHorizontal: 11
  },
  rowContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
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
    color: Colors.openQuestionSubTitle,
    marginLeft: 16
  },
  responseText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.openQuestionSubTitle
  },
  responseTextWarning: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.warningRed
  }
});
//# sourceMappingURL=MultipleOpenEndedQuestion.js.map