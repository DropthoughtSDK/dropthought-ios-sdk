import React from 'react';
import { StyleSheet, Platform, ScrollView as RNScrollView } from 'react-native';
import { KeyboardAvoidingScrollView } from './KeyboardAvoidingView';
import MandatoryTitle from './MandatoryTitle';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
} from '../data';
import { getOptionsFromQuestion } from '../utils/data';
import { isNil } from 'ramda';
import NewOtherOptionWithHighlight from './NewOtherOptionWithHighlight';
import NewOptionWithHighlight from './NewOptionWithHighlight';

const ScrollView =
  Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

type Question = OriginQuestion & {
  options: string[];
  otherText: string;
};

type Feedback = OriginFeedback & {
  answers: (string | number)[];
};

type Props = {
  anonymous: boolean;
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  forgot: boolean;
  feedback: Feedback;
  themeColor: string;
};

const SingleChoiceQuestion = ({
  anonymous,
  question,
  onFeedback,
  // need add new design about if user forgot answer
  forgot,
  feedback,
  themeColor,
}: Props) => {
  const { questionId } = question;
  const options = getOptionsFromQuestion(question);

  function getInitialValueFromFeedbackProps() {
    let value;
    let otherText;
    if (feedback && feedback.answers && !isNil(feedback.answers[0])) {
      const answer = feedback.answers[0];

      if (Number.isInteger(answer)) {
        value = answer;
      } else {
        // if the answer is not a number type,
        // it is for other label, return the last index
        // @ts-ignore
        otherText = answer;
        value = question.options.length;
      }
    }
    return {
      value: value,
      otherText,
    };
  }
  const initialSelected = getInitialValueFromFeedbackProps();

  const [selected, setSelected] = React.useState(initialSelected);

  const handleFeedback = (id: number) => {
    setSelected({
      value: id,
      otherText: selected.otherText,
    });
    onFeedback({
      questionId: questionId,
      answers: [id],
      type: 'singleChoice',
    });
  };

  // when other option's value is changed, newValues is {checked: boolean, value: string}
  const onChangeValueHandler = (
    index: any,
    newValue: { checked: boolean; value: string | undefined }
  ) => {
    setSelected({
      // if newValues is checked, set value to this index
      value: newValue.checked ? index : undefined,
      otherText: newValue.checked ? newValue.value : '',
    });
    onFeedback({
      questionId: questionId,
      // the answer of this feedback is the text value
      // @ts-ignore
      answers: newValue.checked ? [newValue.value] : [],
      type: 'singleChoice',

      // set otherFlag if newValue is checked
      otherFlag: newValue.checked,
    });
  };

  const buttonList = options.map(({ title, isOther }, index) => {
    const isActive = selected.value === index;

    return isOther ? (
      <NewOtherOptionWithHighlight
        key={index}
        id={index}
        type={'radio'}
        title={title}
        checked={isActive}
        themeColor={themeColor}
        onPress={handleFeedback}
        onChangeValue={onChangeValueHandler}
        textValue={selected.otherText?.toString()}
        question={question}
        feedback={feedback}
        anonymous={anonymous}
      />
    ) : (
      <NewOptionWithHighlight
        key={index}
        id={index}
        type={'radio'}
        title={title}
        checked={isActive}
        themeColor={themeColor}
        onPress={handleFeedback}
      />
    );
  });

  return (
    // @ts-ignore
    <ScrollView extraAvoidingSpace={30} style={commonStyles.container}>
      <MandatoryTitle forgot={forgot} question={question} />
      {buttonList}
    </ScrollView>
  );
};

export default React.memo(SingleChoiceQuestion);

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 54,
  },
});
