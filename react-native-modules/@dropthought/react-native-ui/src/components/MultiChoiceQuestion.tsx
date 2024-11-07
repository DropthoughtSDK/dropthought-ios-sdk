import React from 'react';
import { StyleSheet, Platform, ScrollView as RNScrollView } from 'react-native';
// @ts-ignore
import { KeyboardAvoidingScrollView } from './KeyboardAvoidingView';
import { last } from 'ramda';
import type {
  Question as OriginQuestion,
  Option,
  Feedback,
  Survey,
} from '../data';
import { getOptionsFromQuestion } from '../utils/data';
import NewOptionWithHighlight from './NewOptionWithHighlight';
import NewOtherOptionWithHighlight from './NewOtherOptionWithHighlight';
import MandatoryTitle from './MandatoryTitle';

const ScrollView =
  Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

type Question = OriginQuestion & {
  options: string[];
};

type Props = {
  survey: Survey;
  anonymous: boolean;
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  forgot: boolean;
  feedback: Feedback;
  themeColor: string;
};

const getInitialSelectedValuesFromFeedbackProps = (
  options: Option[],
  feedback: Feedback
): {
  values: boolean[];
  otherText: string | undefined;
} => {
  let otherText = '';
  // default: selected false for each options
  let values = options.map(() => false);

  // if feedback has answers, turn the checked to true
  if (feedback && feedback.answers) {
    feedback.answers.forEach((answer) => {
      // if the answer is a number type, turn the corresponding value's checked to true
      if (typeof answer === 'number' && Number.isInteger(answer)) {
        values[answer] = true;
      } else {
        // if the strValue is not a number type,
        // it is for other label, always the last of the values
        values[values.length - 1] = true;
        // @ts-ignore
        otherText = answer;
      }
    });
  }
  return { values, otherText };
};

const MultiChoiceQuestion = ({
  survey,
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
  const initialSelected = getInitialSelectedValuesFromFeedbackProps(
    options,
    feedback
  );

  const [selected, setSelected] = React.useState(initialSelected);

  const handleFeedback = (values: boolean[], otherText: string | undefined) => {
    onFeedback({
      questionId: questionId,
      // @ts-ignore
      answers: values
        .map((value, index) => {
          // only return the answer if checked
          if (value) {
            // for 'other option', return the text
            if (options[index]?.isOther) {
              return otherText;
            }
            return index;
          }
          return undefined;
        })
        .filter((value) => value !== undefined),
      type: 'multiChoice',

      // otherFlag if the last option is other type and the last values is true and otherText is not undefined
      otherFlag:
        last(options)?.isOther && last(values) && otherText !== undefined,
    });

    setSelected({
      values: values,
      otherText,
    });
  };

  const onOptionPressHandler = (index: number) => {
    // copy the values, and toggle the checked value
    let values = [...selected.values];
    values[index] = !selected.values[index];

    handleFeedback(values, selected.otherText);
  };

  const onChangeValueHandler = (
    index: number,
    newValue: {
      value: string | undefined;
      checked: boolean;
    }
  ) => {
    // copy the values, and set the value
    let values = [...selected.values];
    values[index] = newValue.checked;

    handleFeedback(values, newValue.value);
  };

  const buttonList = options.map(({ title, isOther }, index) =>
    isOther ? (
      <NewOtherOptionWithHighlight
        key={index}
        id={index}
        type={'checkbox'}
        title={title}
        checked={selected.values[index] ?? false}
        themeColor={themeColor}
        onPress={onOptionPressHandler}
        onChangeValue={onChangeValueHandler}
        textValue={selected.otherText}
        feedback={feedback}
        question={question}
        anonymous={anonymous}
      />
    ) : (
      <NewOptionWithHighlight
        key={index}
        id={index}
        type={'checkbox'}
        title={title}
        checked={selected.values[index] ?? false}
        themeColor={themeColor}
        onPress={onOptionPressHandler}
      />
    )
  );

  return (
    // @ts-ignore
    <ScrollView extraAvoidingSpace={30} style={commonStyles.container}>
      <MandatoryTitle
        forgot={forgot}
        mandatoryErrorMessage={survey.mandatoryErrorMessage}
        question={question}
      />
      {buttonList}
    </ScrollView>
  );
};

export default React.memo(MultiChoiceQuestion);

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42,
  },
});
