import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { last } from 'ramda';

import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import OptionWithHighlight from './OptionWithHighlight';
import OtherOptionWithHighlight from './OtherOptionWithHighlight';
import GlobalStyles from '../styles';
import { getOptionsFromQuestion } from '../utils/data';
import type { Question, Option, Feedback as OriginFeedback } from '../data';

type Feedback = OriginFeedback & {
  answers: (string | number)[];
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

type Props = {
  mandatoryErrorMessage: string;
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  forgot: boolean;
  feedback: Feedback;
  themeColor: string;
};

type State = {
  values: boolean[];
  options: Option[];
  otherText: string | undefined;
};

class ClassicMultiChoiceQuestion extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const options = getOptionsFromQuestion(props.question);

    this.onChangeValueHandler = this.onChangeValueHandler.bind(this);
    this.onOptionPressHandler = this.onOptionPressHandler.bind(this);
    const { values, otherText } = getInitialSelectedValuesFromFeedbackProps(
      options,
      props.feedback
    );

    this.state = {
      values,
      options,
      otherText,
    };
  }

  feedback(values: boolean[], otherText: string | undefined) {
    this.props.onFeedback({
      questionId: this.props.question.questionId,
      // @ts-ignore
      answers: values
        .map((value, index) => {
          // only return the answer if checked
          if (value) {
            // for 'other option', return the text
            if (this.state.options[index]?.isOther) {
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
        last(this.state.options)?.isOther &&
        last(values) &&
        otherText !== undefined,
    });
    this.setState({
      values: values,
      otherText,
    });
  }

  onOptionPressHandler(index: number) {
    // copy the values, and toggle the checked value
    let values = [...this.state.values];
    values[index] = !this.state.values[index];

    this.feedback(values, this.state.otherText);
  }

  onChangeValueHandler(
    index: number,
    newValue: {
      value: string | undefined;
      checked: boolean;
    }
  ) {
    // copy the values, and set the value
    let values = [...this.state.values];
    values[index] = newValue.checked;

    // DK-864, if "other" is not selected, reset the other input's value to ''
    this.feedback(values, newValue.checked ? newValue.value : '');
  }

  renderOptions() {
    return this.state.options.map(({ title: option, isOther }, index) => {
      if (isOther) {
        return (
          <OtherOptionWithHighlight
            key={index}
            id={index}
            textValue={this.state.otherText}
            checked={this.state.values[index] ?? false}
            checkedColor={this.props.themeColor}
            title={option}
            type="checkbox"
            onPress={this.onOptionPressHandler}
            onChangeValue={this.onChangeValueHandler}
            question={this.props.question}
          />
        );
      }

      return (
        <OptionWithHighlight
          key={index}
          id={index}
          checked={this.state.values[index] ?? false}
          checkedColor={this.props.themeColor}
          title={option}
          type="checkbox"
          onPress={this.onOptionPressHandler}
        />
      );
    });
  }

  render() {
    return (
      <View style={GlobalStyles.questionContainer}>
        <ClassicMandatoryTitle
          forgot={this.props.forgot}
          mandatoryErrorMessage={this.props.mandatoryErrorMessage}
          question={this.props.question}
        />
        <View style={styles.title} />
        {this.renderOptions()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
});

export default ClassicMultiChoiceQuestion;
