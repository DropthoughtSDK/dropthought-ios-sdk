import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  metaDataFormatValidator,
  mandatoryQuestionValidator,
} from '../utils/data';
import MandatoryTitle from './MandatoryTitle';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';
import type { Question, Feedback, Survey } from '../data';
import MultiLineTextInput from './MultiLineTextInput';
import MetadataDesc from './MetadataDesc';

type Props = {
  survey: Survey;
  anonymous: boolean;
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  feedback: Feedback;
  forgot: boolean;
  themeColor: string;
};

const OpenQuestion = ({
  survey,
  anonymous,
  question,
  // onValueChange, // Keep it for Kiosk usage
  onFeedback,
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const rtl = i18n.dir() === 'rtl';
  const { backgroundColor } = useTheme();
  const [text, setText] = React.useState<string>(
    feedback?.answers[0] ? `${feedback?.answers[0]}` : ''
  );
  const textRef = React.useRef<string>(
    feedback?.answers[0] ? `${feedback?.answers[0]}` : ''
  );
  const [hasEdited, setHasEdited] = React.useState(false);

  // It will be used in valid title
  const isValid = metaDataFormatValidator(text, question.metaDataType);

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
      answers: [textRef.current],
      type: 'open',
    });
  };

  const onChangeTextHandler = (t: string) => {
    setText(t);
    textRef.current = t;
  };

  const upperView = (
    <View style={styles.upperView}>
      <MandatoryTitle
        forgot={hasForgot}
        invalidMessage={
          // show the error message after the user has done edited
          hasEdited && !isValid ? question.responseErrorText : ''
        }
        mandatoryErrorMessage={survey.mandatoryErrorMessage}
        question={question}
      />
      <MetadataDesc question={question} rtl={rtl} />
    </View>
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
        showErrorHint={hasForgot || (hasEdited && !isValid)}
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
  upperView: {
    marginBottom: 5,
  },
});
