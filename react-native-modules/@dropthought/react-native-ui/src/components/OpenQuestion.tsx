import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  metaDataTypeQuestionValidator,
  mandatoryQuestionValidator,
} from '../utils/data';
import MandatoryTitle from './MandatoryTitle';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';
import type { Question, Feedback } from '../data';
import MultiLineTextInput from './MultiLineTextInput';

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
  // onValueChange, // Keep it for Kiosk usage
  onFeedback,
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const { backgroundColor } = useTheme();
  const [text, setText] = React.useState<string>(
    feedback?.answers[0] ? `${feedback?.answers[0]}` : ''
  );
  const [hasEdited, setHasEdited] = React.useState(false);

  // It will be used in valid title
  const isValid = metaDataTypeQuestionValidator(question, text);

  const appearanceBackgroundColorStyle = {
    backgroundColor: backgroundColor,
  };

  /** @type {Feedback} */
  const tempFeedback = {
    questionId: question.questionId,
    answers: [text],
    type: 'open',
  };

  // It will be used in valid title
  const hasForgot =
    forgot && !mandatoryQuestionValidator(question, tempFeedback);

  const onEndEditingHandler = () => {
    setHasEdited(true);
    onFeedback({
      questionId: question.questionId,
      answers: [text],
      type: 'open',
    });
  };

  const onChangeTextHandler = (t: string) => {
    setText(t);
  };

  const upperView = (
    <>
      <MandatoryTitle
        forgot={hasForgot}
        invalidMessage={
          // show the error message after the user has done edited
          hasEdited && !isValid
            ? i18n.t(`metadata-invalid-message:${question.metaDataType}`)
            : ''
        }
        question={question}
      />
    </>
  );

  return (
    <ScrollView style={[styles.container, appearanceBackgroundColorStyle]}>
      {upperView}
      <MultiLineTextInput
        onEndEditingHandler={onEndEditingHandler}
        onChangeTextHandler={onChangeTextHandler}
        themeColor={themeColor}
        feedback={feedback}
        question={question}
        anonymous={anonymous}
      />
    </ScrollView>
  );
};

export default React.memo(OpenQuestion);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42,
  },
});
