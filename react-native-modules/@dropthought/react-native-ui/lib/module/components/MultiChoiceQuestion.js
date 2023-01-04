import React from 'react';
import { StyleSheet, Platform, ScrollView as RNScrollView } from 'react-native';
import { KeyboardAvoidingScrollView } from './KeyboardAvoidingView';
import { last } from 'ramda';
import { getOptionsFromQuestion } from '../utils/data';
import NewOptionWithHighlight from './NewOptionWithHighlight';
import NewOtherOptionWithHighlight from './NewOtherOptionWithHighlight';
import MandatoryTitle from './MandatoryTitle';
const ScrollView = Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

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

const MultiChoiceQuestion = ({
  anonymous,
  question,
  onFeedback,
  // need add new design about if user forgot answer
  forgot,
  feedback,
  themeColor
}) => {
  const {
    questionId
  } = question;
  const options = getOptionsFromQuestion(question);
  const initialSelected = getInitialSelectedValuesFromFeedbackProps(options, feedback);
  const [selected, setSelected] = React.useState(initialSelected);

  const handleFeedback = (values, otherText) => {
    var _last;

    onFeedback({
      questionId: questionId,
      // @ts-ignore
      answers: values.map((value, index) => {
        // only return the answer if checked
        if (value) {
          // for 'other option', return the text
          if (options[index].isOther) {
            return otherText;
          }

          return index;
        }

        return undefined;
      }).filter(value => value !== undefined),
      type: 'multiChoice',
      // otherFlag if the last option is other type and the last values is true and otherText is not undefined
      otherFlag: ((_last = last(options)) === null || _last === void 0 ? void 0 : _last.isOther) && last(values) && otherText !== undefined
    });
    setSelected({
      values: values,
      otherText
    });
  };

  const onOptionPressHandler = index => {
    // copy the values, and toggle the checked value
    let values = [...selected.values];
    values[index] = !selected.values[index];
    handleFeedback(values, selected.otherText);
  };

  const onChangeValueHandler = (index, newValue) => {
    // copy the values, and set the value
    let values = [...selected.values];
    values[index] = newValue.checked;
    handleFeedback(values, newValue.value);
  };

  const buttonList = options.map(({
    title,
    isOther
  }, index) => isOther ? /*#__PURE__*/React.createElement(NewOtherOptionWithHighlight, {
    key: index,
    id: index,
    type: 'checkbox',
    title: title,
    checked: selected.values[index],
    themeColor: themeColor,
    onPress: onOptionPressHandler,
    onChangeValue: onChangeValueHandler,
    textValue: selected.otherText,
    feedback: feedback,
    question: question,
    anonymous: anonymous
  }) : /*#__PURE__*/React.createElement(NewOptionWithHighlight, {
    key: index,
    id: index,
    type: 'checkbox',
    title: title,
    checked: selected.values[index],
    themeColor: themeColor,
    onPress: onOptionPressHandler
  }));
  return (
    /*#__PURE__*/
    // @ts-ignore
    React.createElement(ScrollView, {
      extraAvoidingSpace: 30,
      style: commonStyles.container
    }, /*#__PURE__*/React.createElement(MandatoryTitle, {
      forgot: forgot,
      question: question
    }), buttonList)
  );
};

export default /*#__PURE__*/React.memo(MultiChoiceQuestion);
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  }
});
//# sourceMappingURL=MultiChoiceQuestion.js.map