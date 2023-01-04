import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Platform,
} from 'react-native';
import styles from './MultiLineTextInput.styles';
import { QuestionMetaDataType } from '../../utils/data';
import i18n from '../../translation';
import type {
  Question,
  QuestionMetaDataType as TypeQuestionMetaDataType,
  Feedback,
} from '../../data';
import { Colors, addOpacityToColor, GlobalStyle } from '../../styles';
import { useTheme } from '../../contexts/theme';
import { COLOR_SCHEMES } from '../../contexts/theme/theme.const';

const metadataTypeKeyboard = (
  metadataType: TypeQuestionMetaDataType | undefined
): KeyboardTypeOptions | undefined => {
  switch (metadataType) {
    case QuestionMetaDataType.Email:
      return 'email-address';
    case QuestionMetaDataType.Phone:
      return 'phone-pad';
    case QuestionMetaDataType.Number:
      return Platform.select({
        ios: 'numbers-and-punctuation',
        default: 'default',
      });
    case QuestionMetaDataType.Date:
    default:
      return 'default';
  }
};

const metadataTypeAutoCapitalize = (
  metadataType: TypeQuestionMetaDataType | undefined
) => {
  switch (metadataType) {
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

interface Props {
  onEndEditingHandler?: () => void;
  onChangeTextHandler?: (t: string) => void;
  themeColor: string;
  feedback: Feedback;
  question: Question;
  anonymous?: boolean;
  inputRef?: React.RefObject<TextInput>;
  showErrorHint?: boolean;
  checked?: boolean;
}

const MultiLineTextInput: React.FC<Props> = ({
  onEndEditingHandler,
  onChangeTextHandler,
  themeColor,
  feedback,
  question,
  anonymous,
  inputRef,
  showErrorHint = true,
  checked = true,
  ...props
}) => {
  const { colorScheme, fontColor } = useTheme();
  const { metaDataType, questionBrand, scale = 64, type } = question;
  const MAX_CHARACTER = type === 'open' ? Number(scale) : 100;
  const appearanceTextColorStyle = { color: fontColor };
  const [hasEdited, setHasEdited] = React.useState(false);
  const [text, setText] = React.useState<string>(
    feedback?.answers[0] ? `${feedback?.answers[0]}` : ''
  );

  const rtl = i18n.dir() === 'rtl';
  const showAnonymousWarning =
    anonymous &&
    metaDataType &&
    (metaDataType === 'Email' ||
      metaDataType === 'Name' ||
      metaDataType === 'Phone');

  const onEndEditing = () => {
    setHasEdited(true);
    onEndEditingHandler && onEndEditingHandler();
  };

  const onChangeText = (t: string) => {
    setText(t);
    onChangeTextHandler && onChangeTextHandler(t);
  };

  const characterLeft = MAX_CHARACTER - text.length;
  const AT_LEAST_CHARACTER = 3;
  const isInputInValid = hasEdited && text.length < AT_LEAST_CHARACTER;

  let bottomText = '';
  let bottomTextColor = Colors.warningRed;
  if (isInputInValid && showErrorHint) {
    bottomText = i18n.t('open-question-invalid-message:characters', {
      count: AT_LEAST_CHARACTER,
    });
  } else if (showAnonymousWarning) {
    bottomText = i18n.t('survey:metadata-anonymous-warning');
    bottomTextColor = addOpacityToColor(Colors.black, 0.6);
  }

  const appearanceSubBackgroundColorStyle = {
    backgroundColor: addOpacityToColor(
      colorScheme === COLOR_SCHEMES.dark
        ? Colors.appearanceSubBlack
        : themeColor,
      0.08
    ),
  };
  const inputValidStyle = {
    borderWidth: 1,
    borderColor: Colors.warningRed,
  };
  const textInputStyle = [
    styles.inputContainer,
    appearanceTextColorStyle,
    appearanceSubBackgroundColorStyle,
    isInputInValid && showErrorHint ? inputValidStyle : null,
    rtl && GlobalStyle.textAlignRight,
  ];
  const rightDescTextStyle = [
    styles.descText,
    styles.descRight,
    appearanceTextColorStyle,
    { opacity: 0.8 },
  ];
  const leftDescTextStyle = [
    styles.descText,
    styles.descLeft,
    {
      color: bottomTextColor,
    },
  ];

  const inputView = (
    <TextInput
      ref={inputRef}
      style={textInputStyle}
      multiline={true}
      onChangeText={onChangeText}
      placeholder={questionBrand}
      placeholderTextColor={Colors.inputPlaceholder}
      onEndEditing={onEndEditing}
      value={text}
      maxLength={MAX_CHARACTER}
      keyboardType={metadataTypeKeyboard(metaDataType)}
      autoCapitalize={metadataTypeAutoCapitalize(metaDataType)}
      {...props}
    />
  );

  const bottomView = (
    <View style={[styles.subTextRow, rtl && GlobalStyle.flexRowReverse]}>
      <Text style={leftDescTextStyle} numberOfLines={2}>
        {bottomText}
      </Text>
      <Text style={rightDescTextStyle}>
        {characterLeft + ' / ' + MAX_CHARACTER}
      </Text>
    </View>
  );

  return (
    <>
      {checked ? (
        <View>
          {inputView}
          {bottomView}
        </View>
      ) : null}
    </>
  );
};

export default MultiLineTextInput;
