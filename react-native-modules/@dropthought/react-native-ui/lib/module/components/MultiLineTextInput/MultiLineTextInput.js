import React, { useEffect } from 'react';
import { View, Text, TextInput, Platform, Keyboard } from 'react-native';
import styles from './MultiLineTextInput.styles';
import { QuestionMetaDataType } from '../../utils/data';
import i18n from '../../translation';
import { Colors, addOpacityToColor, GlobalStyle } from '../../styles';
import { useTheme } from '../../contexts/theme';
import { COLOR_SCHEMES } from '../../contexts/theme/theme.const';
export const metadataTypeKeyboard = metadataType => {
  switch (metadataType === null || metadataType === void 0 ? void 0 : metadataType.toLocaleLowerCase()) {
    case QuestionMetaDataType.Email:
      return 'email-address';

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

const MultiLineTextInput = ({
  onEndEditingHandler,
  onChangeTextHandler,
  themeColor,
  feedback,
  question,
  anonymous,
  inputRef,
  showErrorHint = false,
  checked = true,
  onBlurHandler = () => {},
  onFocusHandler = () => {}
}) => {
  const {
    colorScheme,
    fontColor
  } = useTheme();
  const {
    metaDataType,
    otherText = '',
    questionBrand = '',
    scale = 64,
    type
  } = question;
  const MAX_CHARACTER = type === 'open' ? Number(scale) : 100;
  const appearanceTextColorStyle = {
    color: fontColor
  }; // to keep answer always select the last one

  const answersIndex = (feedback === null || feedback === void 0 ? void 0 : feedback.answers.length) - 1;
  const [text, setText] = React.useState(typeof (feedback === null || feedback === void 0 ? void 0 : feedback.answers[answersIndex]) === 'string' ? `${feedback === null || feedback === void 0 ? void 0 : feedback.answers[answersIndex]}` : '');
  const [focus, setFocus] = React.useState(false);
  const rtl = i18n.dir() === 'rtl';
  const showAnonymousWarning = anonymous && metaDataType && (metaDataType === 'Email' || metaDataType === 'Name' || metaDataType === 'Phone');
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      onEndEditingHandler && onEndEditingHandler();
    });
    return () => {
      hideSubscription.remove();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeText = t => {
    // [DK-3756] if the text is close to the maxLength it will be rendered twice in the iOS, so we add the focus to prevent the issue.
    if (focus) {
      setText(t);
    }

    onChangeTextHandler && onChangeTextHandler(t);
  };

  const characterLeft = MAX_CHARACTER - text.length;
  let bottomText = '';
  let bottomTextColor = Colors.warningRed;

  if (showAnonymousWarning) {
    bottomText = i18n.t('survey:metadata-anonymous-warning');
    bottomTextColor = addOpacityToColor(Colors.black, 0.6);
  }

  const appearanceSubBackgroundColorStyle = {
    backgroundColor: addOpacityToColor(colorScheme === COLOR_SCHEMES.dark ? Colors.appearanceSubBlack : themeColor, 0.08)
  };
  const inputValidStyle = {
    borderWidth: 1,
    borderColor: Colors.warningRed
  };
  const textInputStyle = [styles.inputContainer, appearanceTextColorStyle, appearanceSubBackgroundColorStyle, showErrorHint ? inputValidStyle : null, rtl && GlobalStyle.textAlignRight];
  const rightDescTextStyle = [styles.descText, styles.descRight, appearanceTextColorStyle, {
    opacity: 0.8
  }];
  const leftDescTextStyle = [styles.descText, styles.descLeft, {
    color: bottomTextColor
  }];
  const inputView = /*#__PURE__*/React.createElement(TextInput, {
    ref: inputRef,
    style: textInputStyle,
    multiline: true,
    onChangeText: onChangeText,
    onFocus: () => {
      setFocus(true);
      onFocusHandler();
    },
    onBlur: () => {
      setFocus(false);
      onBlurHandler();
    },
    placeholder: otherText.length > 0 ? otherText : questionBrand.length > 0 ? questionBrand : i18n.t('survey:other-placeholder'),
    placeholderTextColor: Colors.inputPlaceholder,
    value: text,
    maxLength: MAX_CHARACTER,
    keyboardType: metadataTypeKeyboard(metaDataType),
    autoCapitalize: metadataTypeAutoCapitalize(metaDataType)
  });
  const bottomView = /*#__PURE__*/React.createElement(View, {
    style: [styles.subTextRow, rtl && GlobalStyle.flexRowReverse]
  }, /*#__PURE__*/React.createElement(Text, {
    style: leftDescTextStyle,
    numberOfLines: 2
  }, bottomText), /*#__PURE__*/React.createElement(Text, {
    style: rightDescTextStyle
  }, characterLeft + ' / ' + MAX_CHARACTER));
  return /*#__PURE__*/React.createElement(React.Fragment, null, checked ? /*#__PURE__*/React.createElement(View, null, inputView, bottomView) : null);
};

export default MultiLineTextInput;
//# sourceMappingURL=MultiLineTextInput.js.map