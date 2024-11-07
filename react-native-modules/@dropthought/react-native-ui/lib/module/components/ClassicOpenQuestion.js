import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Platform, Keyboard } from 'react-native';
import { QuestionMetaDataType, metaDataFormatValidator, mandatoryQuestionValidator } from '../utils/data';
import GlobalStyle, { Colors } from '../styles';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import MetadataDesc from './MetadataDesc';
import i18n from '../translation';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
const MAX_CHARACTER = 4000;
export const metadataTypeKeyboard = metadataType => {
  switch (metadataType === null || metadataType === void 0 ? void 0 : metadataType.toLocaleLowerCase()) {
    case QuestionMetaDataType.Email:
      return 'default';
    case QuestionMetaDataType.Phone:
      return 'phone-pad';
    case QuestionMetaDataType.Number:
      return Platform.select({
        ios: 'numbers-and-punctuation',
        default: 'default'
      });
    case QuestionMetaDataType.Date:
    default:
      return 'default';
  }
};
export const metadataTypeAutoCapitalize = metadataType => {
  switch (metadataType === null || metadataType === void 0 ? void 0 : metadataType.toLocaleLowerCase()) {
    case QuestionMetaDataType.Name:
      return 'words';
    case QuestionMetaDataType.Email:
    case QuestionMetaDataType.Phone:
    case QuestionMetaDataType.Date:
    case QuestionMetaDataType.Number:
      return 'none';
    default:
      return 'sentences';
  }
};
const OpenQuestion = ({
  mandatoryErrorMessage,
  anonymous,
  question,
  onFeedback,
  // onValueChange, // Keep it for Kiosk usage
  feedback,
  forgot,
  themeColor
}) => {
  const {
    colorScheme,
    fontColor
  } = useTheme();
  const [text, setText] = useState(feedback !== null && feedback !== void 0 && feedback.answers[0] ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[0]}` : '');
  const [focus, setFocus] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const inputRef = useRef(null);
  const dimensionWidthType = useDimensionWidthType();
  const styles = dimensionWidthType === DimensionWidthType.phone ? phoneStyles : phoneStyles;
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.blur();
    });
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const onEndEditingHandler = () => {
    setHasEdited(true);
    onFeedback({
      questionId: question.questionId,
      answers: [text],
      type: 'open'
    });
  };
  const getBackgroundColorStyle = () => {
    return {
      borderColor: themeColor
    };
  };
  const rtl = i18n.dir() === 'rtl';
  const showAnonymousWarning = anonymous && question.metaDataType && (question.metaDataType === 'Email' || question.metaDataType === 'Name' || question.metaDataType === 'Phone');
  const maxCharacterLength = question.scale ? parseInt(question.scale, 10) : MAX_CHARACTER;
  const characterLeft = maxCharacterLength - text.length;
  const isValid = metaDataFormatValidator(text, question.metaDataType);

  /** @type {Feedback} */
  const tempFeedback = {
    questionId: question.questionId,
    answers: [text],
    type: 'open'
  };
  const hasForgot = forgot && !mandatoryQuestionValidator(question, tempFeedback);
  const upperView = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    forgot: hasForgot,
    invalidMessage:
    // show the error message after the user has done edited
    hasEdited && !isValid ? question.responseErrorText : '',
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.title
  }), /*#__PURE__*/React.createElement(MetadataDesc, {
    question: question,
    rtl: rtl
  }));
  const inputView = /*#__PURE__*/React.createElement(View, {
    style: [styles.inputBG, colorScheme === COLOR_SCHEMES.dark ? styles.inputBGDark : {}, focus && getBackgroundColorStyle()
    // question.metaDataType && styles.metaDataTypeInput,
    // !question.metaDataType && styles.paddingVertical15,
    ]
  }, /*#__PURE__*/React.createElement(TextInput, {
    testID: "test:id/field_open_ended",
    ref: inputRef,
    style: [styles.input, {
      color: fontColor
    }, rtl && GlobalStyle.textAlignRight],
    multiline: true,
    onChangeText: t => {
      if (focus) {
        // [DK-3756] if the text is close to the maxLength it will be rendered twice in the iOS, so we add the focus to prevent the issue.
        setText(t);
      }
      // onValueChange(text) // Keep it for Kiosk usage
    },
    placeholder: question.questionBrand,
    placeholderTextColor: Colors.inputPlaceholder,
    onEndEditing: onEndEditingHandler,
    value: text,
    onFocus: () => {
      setFocus(true);
    },
    onBlur: () => {
      setFocus(false);
    },
    maxLength: maxCharacterLength,
    keyboardType: metadataTypeKeyboard(question.metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(question.metaDataType)
  }));
  const bottomView = /*#__PURE__*/React.createElement(View, {
    style: [styles.subTextRow, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/open_ended_warning",
    style: styles.descText
  }, showAnonymousWarning && `${i18n.t('survey:metadata-anonymous-warning')}`), /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/open_ended_text_length",
    style: styles.descText
  }, characterLeft, " / ", maxCharacterLength));
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, upperView, inputView, bottomView);
};
export default OpenQuestion;
const phoneStyles = StyleSheet.create({
  descText: {
    color: Colors.openQuestionSubTitle,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 17
  },
  inputBG: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 101,
    marginVertical: 10,
    paddingHorizontal: 15
  },
  inputBGDark: {
    borderColor: Colors.borderColorDark
  },
  input: {
    flex: 1,
    // when multi=true, it is important to note that this aligns the text to the top on iOS,
    // and centers it on Android. Use with textAlignVertical set to top for the same behavior in both platforms.
    textAlignVertical: 'top' // this is an android only props, won't affect ios
  },
  paddingVertical15: {
    ...Platform.select({
      ios: {
        paddingVertical: 15
      },
      android: {
        paddingVertical: 5
      }
    })
  },
  metaDataTypeInput: {
    fontSize: 14,
    height: 40
  },
  subTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  title: {
    marginBottom: 6
  }
});
//# sourceMappingURL=ClassicOpenQuestion.js.map