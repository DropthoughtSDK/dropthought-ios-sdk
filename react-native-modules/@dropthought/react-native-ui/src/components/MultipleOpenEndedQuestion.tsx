import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  ScrollView as RNScrollView,
} from 'react-native';
import { KeyboardAvoidingScrollView } from './KeyboardAvoidingView';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import MandatoryTitle from './MandatoryTitle';
import type { Question, Feedback } from '../data';
import useMultipleOpenEnded from '../hooks/useMultipleOpenEnded';
import useOpenEnded from '../hooks/useOpenEnded';
import { metaDataFormatValidator } from '../utils/data';
import type { QuestionRowItem } from '../hooks/useMultipleOpenEnded';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

const ScrollView =
  Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

type Props = {
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  feedback: Feedback;
  forgot: boolean;
  themeColor: string;
};

type RowComponentProps = {
  question: Question;
  questionRow: QuestionRowItem;
  feedback: Feedback;
  selectedAnswerState: [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
  ];
  updateFeedback: (answers: string[]) => void;
  themeColor: string;
  index: number;
};

const RowComponent = ({
  question,
  questionRow,
  feedback,
  selectedAnswerState,
  updateFeedback,
  themeColor,
  index,
}: RowComponentProps) => {
  const {
    questionTitle,
    exampleMetadataText,
    metaDataType = 'String',
    responseErrorText,
    scale,
    phiData,
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
    onBlur,
  } = useOpenEnded(feedback, index);
  const { colorScheme, fontColor } = useTheme();
  const opacityThemeColor = addOpacityToColor(themeColor, 0.1);
  const isDark = colorScheme === COLOR_SCHEMES.dark;

  const isValid = metaDataFormatValidator(
    text,
    question?.metaDataTypeList?.[index]
  );

  const isFoucsAndInValid = isFocus || (!isValid && hasEdited);
  const onChangeText = (textInput: string) => {
    onChangeTextHandler(textInput);
    setSelectedAnswer((previous) => {
      const answers = previous.map((value, i) =>
        i === index ? textInput : value
      );
      updateFeedback(answers);
      return answers;
    });
  };

  const rowContainerStyle = [
    styles.rowContainer,
    {
      backgroundColor: isFocus
        ? isDark
          ? Colors.rankingContainerBgDark
          : addOpacityToColor(themeColor || Colors.white, 0.1)
        : undefined,
    },
  ];
  const rowTitleTextStyle = [styles.rowTitleText, { color: fontColor }];

  const hippaText = i18n.t('survey:hippa-hint');

  let inputBorderColor;
  let bottomTextComponent;
  if (!isValid && hasEdited) {
    inputBorderColor = Colors.warningRed;
    const errorTextStyle = [
      styles.responseText,
      {
        color: Colors.warningRed,
      },
    ];
    bottomTextComponent = (
      <Text style={errorTextStyle}>{responseErrorText}</Text>
    );
  } else if (isFocus) {
    inputBorderColor = themeColor;
    const descTextStyle = [
      styles.responseText,
      {
        color: Colors.openQuestionSubTitle,
      },
    ];
    bottomTextComponent = (
      <Text style={descTextStyle}>{phiData ? hippaText : ''}</Text>
    );
  } else {
    inputBorderColor = isDark ? Colors.rankingBorderDark : Colors.white;
    bottomTextComponent = null;
  }
  const inputStyle = [
    styles.input,
    {
      backgroundColor: isDark ? Colors.rankingBorderDark : opacityThemeColor,
      borderColor: inputBorderColor,
      color: fontColor,
    },
  ];
  return (
    <View style={rowContainerStyle}>
      <View>
        <Text style={rowTitleTextStyle}>{questionTitle}</Text>
      </View>
      <View style={styles.rowContent}>
        {exampleMetadataText && isFoucsAndInValid ? (
          <Text style={styles.rowSubTitleText}>{exampleMetadataText}</Text>
        ) : null}
        <TextInput
          style={inputStyle}
          onChangeText={onChangeText}
          onEndEditing={onEndEditingHandler}
          value={text}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={scale}
          keyboardType={metadataTypeKeyboard(metaDataType)}
          autoCapitalize={metadataTypeAutoCapitalize(metaDataType)}
        />
        <View style={styles.rowBottomContent}>
          <View style={GlobalStyle.flex1}>{bottomTextComponent}</View>
          {isFoucsAndInValid ? (
            <Text style={[styles.inputLengthText, GlobalStyle.textAlignRight]}>
              {`${scale - text.length}/${scale}`}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const MultipleOpenEndedQuestion = ({
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const { questionRows, selectedAnswerState, handleErrorHint, updateFeedback } =
    useMultipleOpenEnded(question, feedback, onFeedback);
  const rowList = questionRows.map((questionRow, index) => (
    <RowComponent
      question={question}
      questionRow={questionRow}
      feedback={feedback}
      selectedAnswerState={selectedAnswerState}
      updateFeedback={updateFeedback}
      index={index}
      themeColor={themeColor}
      key={index.toString()}
    />
  ));

  return (
    <ScrollView extraAvoidingSpace={30} style={styles.container}>
      <MandatoryTitle
        forgot={false}
        question={question}
        style={styles.title}
        invalidMessage={handleErrorHint(forgot)}
      />
      {rowList}
    </ScrollView>
  );
};

export default React.memo(MultipleOpenEndedQuestion);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: -20,
    borderRadius: 4,
  },
  rowTitleText: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 12,
  },
  rowSubTitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.openQuestionSubTitle,
    marginBottom: 8,
  },
  rowContent: {
    flex: 8,
  },
  rowBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 8,
  },
  inputLengthText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.openQuestionSubTitle,
  },
  responseText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
