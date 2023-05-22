import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { isNil } from 'ramda';

import GlobalStyle from '../styles';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import OptionWithHighlight from './OptionWithHighlight';
import OtherOptionWithHighlight from './OtherOptionWithHighlight';
import { getOptionsFromQuestion } from '../utils/data';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
  Option,
} from '../data';

type Feedback = OriginFeedback & {
  answers: (string | number)[];
};

type Question = OriginQuestion & {
  options: string[];
  scale: string;
};

type Props = {
  question: Question;
  feedback: Feedback;
  onFeedback: (feedback: Feedback) => void;
  forgot: boolean;
  themeColor: string; // use hex color string
};

type State = {
  options: Option[];
  value: number | undefined;
  otherText: string | undefined;
};

class ClassicSingleChoiceQuestion extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    let otherText = '';
    function getInitialValueFromFeedbackProps() {
      if (
        props.feedback &&
        props.feedback.answers &&
        !isNil(props.feedback.answers[0])
      ) {
        const answer = props.feedback.answers[0];
        if (Number.isInteger(answer)) {
          return answer;
        } else {
          // if the answer is not a number type,
          // it is for other label, return the last index
          // @ts-ignore
          otherText = answer;
          return props.question.options.length;
        }
      }
      return undefined;
    }

    this.onFeedback = this.onFeedback.bind(this);
    this.onChangeValueHandler = this.onChangeValueHandler.bind(this);
    this.state = {
      // @ts-ignore
      value: getInitialValueFromFeedbackProps(),
      options: getOptionsFromQuestion(props.question),
      otherText,
    };
  }

  // when normal option is pressed, set the id(index) as answer
  onFeedback(id: number) {
    this.setState({
      value: id,

      // DK-864, when selecting normal options, reset the other input's value
      otherText: '',
    });
    this.props.onFeedback({
      questionId: this.props.question.questionId,
      answers: [id],
      type: 'singleChoice',
    });
  }

  // when other option's value is changed, newValues is {checked: boolean, value: string}
  onChangeValueHandler(
    index: any,
    newValue: { checked: boolean; value: string | undefined }
  ) {
    this.setState({
      // if newValues is checked, set value to this index
      value: newValue.checked ? index : undefined,
      otherText: newValue.checked ? newValue.value : '',
    });
    this.props.onFeedback({
      questionId: this.props.question.questionId,
      // the answer of this feedback is the text value
      // @ts-ignore
      answers: newValue.checked ? [newValue.value] : [],
      type: 'singleChoice',

      // set otherFlag if newValue is checked
      otherFlag: newValue.checked,
    });
  }

  renderRadios() {
    return this.state.options.map(({ title: option, isOther }, index) => {
      const isActive = this.state.value === index;

      if (isOther) {
        return (
          <OtherOptionWithHighlight
            id={index}
            key={index}
            onPress={this.onFeedback}
            title={option}
            checked={isActive}
            checkedColor={this.props.themeColor}
            onChangeValue={this.onChangeValueHandler}
            textValue={this.state.otherText}
            question={this.props.question}
          />
        );
      }

      return (
        <OptionWithHighlight
          id={index}
          key={index}
          onPress={this.onFeedback}
          title={option}
          checked={isActive}
          checkedColor={this.props.themeColor}
        />
      );
    });
  }

  render() {
    return (
      <View style={GlobalStyle.questionContainer}>
        <ClassicMandatoryTitle
          forgot={this.props.forgot}
          question={this.props.question}
        />
        <View style={styles.radioForm}>{this.renderRadios()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioForm: {
    marginTop: 20,
  },
});

export default ClassicSingleChoiceQuestion;
