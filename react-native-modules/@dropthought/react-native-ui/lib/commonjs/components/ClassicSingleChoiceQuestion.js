"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ramda = require("ramda");
var _styles = _interopRequireDefault(require("../styles"));
var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));
var _OptionWithHighlight = _interopRequireDefault(require("./OptionWithHighlight"));
var _OtherOptionWithHighlight = _interopRequireDefault(require("./OtherOptionWithHighlight"));
var _data = require("../utils/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class ClassicSingleChoiceQuestion extends _react.PureComponent {
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
  }

  // when normal option is pressed, set the id(index) as answer
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
  }

  // when other option's value is changed, newValues is {checked: boolean, value: string}
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
          textValue: this.state.otherText,
          question: this.props.question
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
    }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
      forgot: this.props.forgot,
      mandatoryErrorMessage: this.props.mandatoryErrorMessage,
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
var _default = exports.default = ClassicSingleChoiceQuestion;
//# sourceMappingURL=ClassicSingleChoiceQuestion.js.map