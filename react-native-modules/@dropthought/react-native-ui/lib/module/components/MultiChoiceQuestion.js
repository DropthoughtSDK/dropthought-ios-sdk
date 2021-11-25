import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { last } from 'ramda';
import MandatoryTitle from './MandatoryTitle';
import OptionWithHighlight from './OptionWithHighlight';
import OtherOptionWithHighlight from './OtherOptionWithHighlight';
import GlobalStyles from '../styles';
import { getOptionsFromQuestion } from '../utils/data';

const getInitialSelectedValuesFromFeedbackProps = (options, feedback) => {
  let otherText = ''; // default: selected false for each options

  let values = options.map(() => false); // if feedback has answers, turn the checked to true

  if (feedback && feedback.answers) {
    feedback.answers.forEach(answer => {
      // if the answer is a number type, turn the corresponding value's checked to true
      if (typeof answer === 'number' && Number.isInteger(answer)) {
        values[answer] = true;
      } else {
        // if the strValue is not a number type,
        // it is for other label, always the last of the values
        values[values.length - 1] = true; // @ts-ignore

        otherText = answer;
      }
    });
  }

  return {
    values,
    otherText
  };
};

class MultiChoiceQuestion extends PureComponent {
  constructor(props) {
    super(props);
    const options = getOptionsFromQuestion(props.question);
    this.onChangeValueHandler = this.onChangeValueHandler.bind(this);
    this.onOptionPressHandler = this.onOptionPressHandler.bind(this);
    const {
      values,
      otherText
    } = getInitialSelectedValuesFromFeedbackProps(options, props.feedback);
    this.state = {
      values,
      options,
      otherText
    };
  }

  feedback(values, otherText) {
    var _last;

    this.props.onFeedback({
      questionId: this.props.question.questionId,
      // @ts-ignore
      answers: values.map((value, index) => {
        // only return the answer if checked
        if (value) {
          // for 'other option', return the text
          if (this.state.options[index].isOther) {
            return otherText;
          }

          return index;
        }

        return undefined;
      }).filter(value => value !== undefined),
      type: 'multiChoice',
      // otherFlag if the last option is other type and the last values is true and otherText is not undefined
      otherFlag: ((_last = last(this.state.options)) === null || _last === void 0 ? void 0 : _last.isOther) && last(values) && otherText !== undefined
    });
    this.setState({
      values: values,
      otherText
    });
  }

  onOptionPressHandler(index) {
    // copy the values, and toggle the checked value
    let values = [...this.state.values];
    values[index] = !this.state.values[index];
    this.feedback(values, this.state.otherText);
  }

  onChangeValueHandler(index, newValue) {
    // copy the values, and set the value
    let values = [...this.state.values];
    values[index] = newValue.checked; // DK-864, if "other" is not selected, reset the other input's value to ''

    this.feedback(values, newValue.checked ? newValue.value : '');
  }

  renderOptions() {
    return this.state.options.map(({
      title: option,
      isOther
    }, index) => {
      if (isOther) {
        return /*#__PURE__*/React.createElement(OtherOptionWithHighlight, {
          key: index,
          id: index,
          textValue: this.state.otherText,
          checked: this.state.values[index],
          checkedColor: this.props.themeColor,
          title: option,
          type: "checkbox",
          onPress: this.onOptionPressHandler,
          onChangeValue: this.onChangeValueHandler
        });
      }

      return /*#__PURE__*/React.createElement(OptionWithHighlight, {
        key: index,
        id: index,
        checked: this.state.values[index],
        checkedColor: this.props.themeColor,
        title: option,
        type: "checkbox",
        onPress: this.onOptionPressHandler
      });
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(View, {
      style: GlobalStyles.questionContainer
    }, /*#__PURE__*/React.createElement(MandatoryTitle, {
      forgot: this.props.forgot,
      question: this.props.question
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.title
    }), this.renderOptions());
  }

}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20
  }
});
export default MultiChoiceQuestion;
//# sourceMappingURL=MultiChoiceQuestion.js.map