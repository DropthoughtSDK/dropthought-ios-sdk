"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _ramda = require("ramda");

var _styles = _interopRequireDefault(require("../styles"));

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

var _OptionWithHighlight = _interopRequireDefault(require("./OptionWithHighlight"));

var _OtherOptionWithHighlight = _interopRequireDefault(require("./OtherOptionWithHighlight"));

var _data = require("../utils/data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class SingleChoiceQuestion extends _react.PureComponent {
  constructor(props) {
    super(props);
    let otherText = '';

    function getInitialValueFromFeedbackProps() {
      if (props.feedback && props.feedback.answers && !(0, _ramda.isNil)(props.feedback.answers[0])) {
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
      options: (0, _data.getOptionsFromQuestion)(props.question),
      otherText
    };
  } // when normal option is pressed, set the id(index) as answer


  onFeedback(id) {
    this.setState({
      value: id,
      // DK-864, when selecting normal options, reset the other input's value
      otherText: ''
    });
    this.props.onFeedback({
      questionId: this.props.question.questionId,
      answers: [id],
      type: 'singleChoice'
    });
  } // when other option's value is changed, newValues is {checked: boolean, value: string}


  onChangeValueHandler(index, newValue) {
    this.setState({
      // if newValues is checked, set value to this index
      value: newValue.checked ? index : undefined,
      otherText: newValue.checked ? newValue.value : ''
    });
    this.props.onFeedback({
      questionId: this.props.question.questionId,
      // the answer of this feedback is the text value
      // @ts-ignore
      answers: newValue.checked ? [newValue.value] : [],
      type: 'singleChoice',
      // set otherFlag if newValue is checked
      otherFlag: newValue.checked
    });
  }

  renderRadios() {
    return this.state.options.map(({
      title: option,
      isOther
    }, index) => {
      const isActive = this.state.value === index;

      if (isOther) {
        return /*#__PURE__*/_react.default.createElement(_OtherOptionWithHighlight.default, {
          id: index,
          key: index,
          onPress: this.onFeedback,
          title: option,
          checked: isActive,
          checkedColor: this.props.themeColor,
          onChangeValue: this.onChangeValueHandler,
          textValue: this.state.otherText
        });
      }

      return /*#__PURE__*/_react.default.createElement(_OptionWithHighlight.default, {
        id: index,
        key: index,
        onPress: this.onFeedback,
        title: option,
        checked: isActive,
        checkedColor: this.props.themeColor
      });
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.default.questionContainer
    }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
      forgot: this.props.forgot,
      question: this.props.question
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.radioForm
    }, this.renderRadios()));
  }

}

const styles = _reactNative.StyleSheet.create({
  radioForm: {
    marginTop: 20
  }
});

var _default = SingleChoiceQuestion;
exports.default = _default;
//# sourceMappingURL=SingleChoiceQuestion.js.map