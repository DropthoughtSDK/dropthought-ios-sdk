"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _KeyboardAvoidingView = require("./KeyboardAvoidingView");
var _ramda = require("ramda");
var _data = require("../utils/data");
var _NewOptionWithHighlight = _interopRequireDefault(require("./NewOptionWithHighlight"));
var _NewOtherOptionWithHighlight = _interopRequireDefault(require("./NewOtherOptionWithHighlight"));
var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore

const ScrollView = _reactNative.Platform.OS === 'ios' ? _KeyboardAvoidingView.KeyboardAvoidingScrollView : _reactNative.ScrollView;
const getInitialSelectedValuesFromFeedbackProps = (options, feedback) => {
  let otherText = '';
  // default: selected false for each options
  let values = options.map(() => false);

  // if feedback has answers, turn the checked to true
  if (feedback && feedback.answers) {
    feedback.answers.forEach(answer => {
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
  return {
    values,
    otherText
  };
};
const MultiChoiceQuestion = ({
  survey,
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
  const options = (0, _data.getOptionsFromQuestion)(question);
  const initialSelected = getInitialSelectedValuesFromFeedbackProps(options, feedback);
  const [selected, setSelected] = _react.default.useState(initialSelected);
  const handleFeedback = (values, otherText) => {
    var _last;
    onFeedback({
      questionId: questionId,
      // @ts-ignore
      answers: values.map((value, index) => {
        // only return the answer if checked
        if (value) {
          var _options$index;
          // for 'other option', return the text
          if ((_options$index = options[index]) !== null && _options$index !== void 0 && _options$index.isOther) {
            return otherText;
          }
          return index;
        }
        return undefined;
      }).filter(value => value !== undefined),
      type: 'multiChoice',
      // otherFlag if the last option is other type and the last values is true and otherText is not undefined
      otherFlag: ((_last = (0, _ramda.last)(options)) === null || _last === void 0 ? void 0 : _last.isOther) && (0, _ramda.last)(values) && otherText !== undefined
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
  }, index) => isOther ? /*#__PURE__*/_react.default.createElement(_NewOtherOptionWithHighlight.default, {
    key: index,
    id: index,
    type: 'checkbox',
    title: title,
    checked: selected.values[index] ?? false,
    themeColor: themeColor,
    onPress: onOptionPressHandler,
    onChangeValue: onChangeValueHandler,
    textValue: selected.otherText,
    feedback: feedback,
    question: question,
    anonymous: anonymous
  }) : /*#__PURE__*/_react.default.createElement(_NewOptionWithHighlight.default, {
    key: index,
    id: index,
    type: 'checkbox',
    title: title,
    checked: selected.values[index] ?? false,
    themeColor: themeColor,
    onPress: onOptionPressHandler
  }));
  return (
    /*#__PURE__*/
    // @ts-ignore
    _react.default.createElement(ScrollView, {
      extraAvoidingSpace: 30,
      style: commonStyles.container
    }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
      forgot: forgot,
      mandatoryErrorMessage: survey.mandatoryErrorMessage,
      question: question
    }), buttonList)
  );
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(MultiChoiceQuestion);
const commonStyles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  }
});
//# sourceMappingURL=MultiChoiceQuestion.js.map