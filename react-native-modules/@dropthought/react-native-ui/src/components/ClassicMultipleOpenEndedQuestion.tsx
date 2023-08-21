import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import type { Question, Feedback } from '../data';
import useMultipleOpenEnded from '../hooks/useMultipleOpenEnded';
import useOpenEnded from '../hooks/useOpenEnded';
import { metaDataFormatValidator } from '../utils/data';
import type { QuestionRowItem } from '../hooks/useMultipleOpenEnded';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

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
  const { backgroundColor, colorScheme, fontColor } = useTheme();
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
    inputBorderColor = isDark ? Colors.rankingBorderDark : Colors.rankingBorder;
    bottomTextComponent = null;
  }
  const inputStyle = [
    styles.input,
    {
      backgroundColor: backgroundColor,
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

const ClassicMultipleOpenEndedQuestion = ({
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
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        forgot={false}
        question={question}
        style={styles.title}
        invalidMessage={handleErrorHint(forgot)}
      />
      {rowList}
    </View>
  );
};

export default React.memo(ClassicMultipleOpenEndedQuestion);

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: -16,
    borderRadius: 4,
  },
  rowTitleText: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 8,
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
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 4,
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
