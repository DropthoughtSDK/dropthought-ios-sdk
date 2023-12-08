"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _KeyboardAvoidingView = require("./KeyboardAvoidingView");

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

var _data = require("../utils/data");

var _ramda = require("ramda");

var _NewOtherOptionWithHighlight = _interopRequireDefault(require("./NewOtherOptionWithHighlight"));

var _NewOptionWithHighlight = _interopRequireDefault(require("./NewOptionWithHighlight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ScrollView = _reactNative.Platform.OS === 'ios' ? _KeyboardAvoidingView.KeyboardAvoidingScrollView : _reactNative.ScrollView;

const SingleChoiceQuestion = ({
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

  function getInitialValueFromFeedbackProps() {
    let value;
    let otherText;

    if (feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0])) {
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
      otherText
    };
  }

  const initialSelected = getInitialValueFromFeedbackProps();

  const [selected, setSelected] = _react.default.useState(initialSelected);

  const handleFeedback = id => {
    setSelected({
      value: id,
      otherText: selected.otherText
    });
    onFeedback({
      questionId: questionId,
      answers: [id],
      type: 'singleChoice'
    });
  }; // when other option's value is changed, newValues is {checked: boolean, value: string}


  const onChangeValueHandler = (index, newValue) => {
    setSelected({
      // if newValues is checked, set value to this index
      value: newValue.checked ? index : undefined,
      otherText: newValue.checked ? newValue.value : ''
    });
    onFeedback({
      questionId: questionId,
      // the answer of this feedback is the text value
      // @ts-ignore
      answers: newValue.checked ? [newValue.value] : [],
      type: 'singleChoice',
      // set otherFlag if newValue is checked
      otherFlag: newValue.checked
    });
  };

  const buttonList = options.map(({
    title,
    isOther
  }, index) => {
    var _selected$otherText;

    const isActive = selected.value === index;
    return isOther ? /*#__PURE__*/_react.default.createElement(_NewOtherOptionWithHighlight.default, {
      key: index,
      id: index,
      type: 'radio',
      title: title,
      checked: isActive,
      themeColor: themeColor,
      onPress: handleFeedback,
      onChangeValue: onChangeValueHandler,
      textValue: (_selected$otherText = selected.otherText) === null || _selected$otherText === void 0 ? void 0 : _selected$otherText.toString(),
      question: question,
      feedback: feedback,
      anonymous: anonymous
    }) : /*#__PURE__*/_react.default.createElement(_NewOptionWithHighlight.default, {
      key: index,
      id: index,
      type: 'radio',
      title: title,
      checked: isActive,
      themeColor: themeColor,
      onPress: handleFeedback
    });
  });
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

var _default = /*#__PURE__*/_react.default.memo(SingleChoiceQuestion);

exports.default = _default;

const commonStyles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 54
  }
});
//# sourceMappingURL=SingleChoiceQuestion.js.map