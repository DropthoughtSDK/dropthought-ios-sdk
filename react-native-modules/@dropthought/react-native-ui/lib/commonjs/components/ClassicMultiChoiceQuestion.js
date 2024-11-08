"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ramda = require("ramda");
var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));
var _OptionWithHighlight = _interopRequireDefault(require("./OptionWithHighlight"));
var _OtherOptionWithHighlight = _interopRequireDefault(require("./OtherOptionWithHighlight"));
var _styles = _interopRequireDefault(require("../styles"));
var _data = require("../utils/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
class ClassicMultiChoiceQuestion extends _react.PureComponent {
  constructor(props) {
    super(props);
    const options = (0, _data.getOptionsFromQuestion)(props.question);
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
          var _this$state$options$i;
          // for 'other option', return the text
          if ((_this$state$options$i = this.state.options[index]) !== null && _this$state$options$i !== void 0 && _this$state$options$i.isOther) {
            return otherText;
          }
          return index;
        }
        return undefined;
      }).filter(value => value !== undefined),
      type: 'multiChoice',
      // otherFlag if the last option is other type and the last values is true and otherText is not undefined
      otherFlag: ((_last = (0, _ramda.last)(this.state.options)) === null || _last === void 0 ? void 0 : _last.isOther) && (0, _ramda.last)(values) && otherText !== undefined
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
    values[index] = newValue.checked;

    // DK-864, if "other" is not selected, reset the other input's value to ''
    this.feedback(values, newValue.checked ? newValue.value : '');
  }
  renderOptions() {
    return this.state.options.map(({
      title: option,
      isOther
    }, index) => {
      if (isOther) {
        return /*#__PURE__*/_react.default.createElement(_OtherOptionWithHighlight.default, {
          key: index,
          id: index,
          textValue: this.state.otherText,
          checked: this.state.values[index] ?? false,
          checkedColor: this.props.themeColor,
          title: option,
          type: "checkbox",
          onPress: this.onOptionPressHandler,
          onChangeValue: this.onChangeValueHandler,
          question: this.props.question
        });
      }
      return /*#__PURE__*/_react.default.createElement(_OptionWithHighlight.default, {
        key: index,
        id: index,
        checked: this.state.values[index] ?? false,
        checkedColor: this.props.themeColor,
        title: option,
        type: "checkbox",
        onPress: this.onOptionPressHandler
      });
    });
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.default.questionContainer
    }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
      forgot: this.props.forgot,
      mandatoryErrorMessage: this.props.mandatoryErrorMessage,
      question: this.props.question
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.title
    }), this.renderOptions());
  }
}
const styles = _reactNative.StyleSheet.create({
  title: {
    marginBottom: 20
  }
});
var _default = exports.default = ClassicMultiChoiceQuestion;
//# sourceMappingURL=ClassicMultiChoiceQuestion.js.map