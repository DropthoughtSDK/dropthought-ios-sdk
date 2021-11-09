import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  KeyboardTypeOptions,
} from 'react-native';
import {
  QuestionMetaDataType,
  metaDataTypeQuestionValidator,
  mandatoryQuestionValidator,
} from '../utils/data';
import GlobalStyle, { Colors } from '../styles';
import MandatoryTitle from './MandatoryTitle';
import i18n from '../translation';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import type {
  QuestionMetaDataType as TypeQuestionMetaDataType,
  Question,
  Feedback,
} from '../data';

const MAX_CHARACTER = 4000;

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

const MetadataDesc = ({
  question,
  rtl,
}: {
  question: Question;
  rtl: boolean;
}) => {
  const dimensionWidthType = useDimensionWidthType();
  const styles =
    dimensionWidthType === DimensionWidthType.phone ? phoneStyles : phoneStyles;

  if (!question.metaDataType) return null;

  // if translation is not found, do not print anything
  const desc = i18n.t(`metadata-question-desc:${question.metaDataType}`, '');
  if (!desc) return null;

  return (
    <Text style={[styles.descText, rtl && GlobalStyle.textAlignRight]}>
      {desc}
    </Text>
  );
};

type Props = {
  anonymous: boolean;
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  feedback: Feedback;
  forgot: boolean;
  themeColor: string;
};

const OpenQuestion = ({
  anonymous,
  question,
  onFeedback,
  // onValueChange, // Keep it for Kiosk usage
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const { colorScheme, fontColor } = useTheme();
  const [text, setText] = React.useState<string>(
    feedback?.answers[0] ? `${feedback?.answers[0]}` : ''
  );
  const [focus, setFocus] = React.useState(false);
  const [hasEdited, setHasEdited] = React.useState(false);

  const dimensionWidthType = useDimensionWidthType();
  const styles =
    dimensionWidthType === DimensionWidthType.phone ? phoneStyles : phoneStyles;

  const onEndEditingHandler = () => {
    setHasEdited(true);
    onFeedback({
      questionId: question.questionId,
      answers: [text],
      type: 'open',
    });
  };

  const getBackgroundColorStyle = () => {
    return { borderColor: themeColor };
  };

  const rtl = i18n.dir() === 'rtl';
  const showAnonymousWarning =
    anonymous &&
    question.metaDataType &&
    (question.metaDataType === 'Email' ||
      question.metaDataType === 'Name' ||
      question.metaDataType === 'Phone');

  const maxCharacterLength = MAX_CHARACTER;
  const characterLeft = maxCharacterLength - text.length;

  const isValid = metaDataTypeQuestionValidator(question, text);

  /** @type {Feedback} */
  const tempFeedback = {
    questionId: question.questionId,
    answers: [text],
    type: 'open',
  };
  const hasForgot =
    forgot && !mandatoryQuestionValidator(question, tempFeedback);

  const upperView = (
    <>
      <MandatoryTitle
        forgot={hasForgot}
        invalidMessage={
          // show the error message after the user has done edited
          hasEdited && !isValid
            ? i18n.t(`metadata-invalid-message:${question.metaDataType}`, '')
            : ''
        }
        question={question}
        style={styles.title}
      />
      <MetadataDesc question={question} rtl={rtl} />
    </>
  );

  const inputView = (
    <View
      style={[
        styles.inputBG,
        colorScheme === COLOR_SCHEMES.dark ? styles.inputBGDark : {},
        focus && getBackgroundColorStyle(),
        // question.metaDataType && styles.metaDataTypeInput,
        // !question.metaDataType && styles.paddingVertical15,
      ]}
    >
      <TextInput
        style={[
          styles.input,
          { color: fontColor },
          rtl && GlobalStyle.textAlignRight,
        ]}
        multiline={true}
        onChangeText={(t) => {
          setText(t);
          // onValueChange(text) // Keep it for Kiosk usage
        }}
        placeholder={question.questionBrand}
        placeholderTextColor={Colors.inputPlaceholder}
        onEndEditing={onEndEditingHandler}
        value={text}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        maxLength={maxCharacterLength}
        keyboardType={metadataTypeKeyboard(question.metaDataType)}
        autoCapitalize={metadataTypeAutoCapitalize(question.metaDataType)}
      />
    </View>
  );

  const bottomView = (
    <View style={[styles.subTextRow, rtl && GlobalStyle.flexRowReverse]}>
      <Text style={styles.descText}>
        {showAnonymousWarning && i18n.t('survey:metadata-anonymous-warning')}
      </Text>
      <Text style={styles.descText}>
        {characterLeft} / {maxCharacterLength}
      </Text>
    </View>
  );

  return (
    <View style={GlobalStyle.questionContainer}>
      {upperView}
      {inputView}
      {bottomView}
    </View>
  );
};

export default OpenQuestion;

const phoneStyles = StyleSheet.create({
  descText: {
    color: Colors.openQuestionSubTitle,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 17,
  },
  inputBG: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 101,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  inputBGDark: {
    borderColor: Colors.borderColorDark,
  },
  input: {
    flex: 1,

    // when multi=true, it is important to note that this aligns the text to the top on iOS,
    // and centers it on Android. Use with textAlignVertical set to top for the same behavior in both platforms.
    textAlignVertical: 'top', // this is an android only props, won't affect ios
  },
  paddingVertical15: {
    ...Platform.select({
      ios: {
        paddingVertical: 15,
      },
      android: {
        paddingVertical: 5,
      },
    }),
  },
  metaDataTypeInput: {
    fontSize: 14,
    height: 40,
  },
  subTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    marginBottom: 6,
  },
});
