"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireWildcard(require("../styles"));
var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));
var _data = require("../utils/data");
var _usePolling = _interopRequireDefault(require("../hooks/usePolling"));
var _ActivityIndicatorMask = _interopRequireDefault(require("./ActivityIndicatorMask"));
var _PollingItem = _interopRequireDefault(require("./PollingItem"));
var _reactNativeUi = require("@dropthought/react-native-ui");
var _KeyboardAvoidingView = require("./KeyboardAvoidingView");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//@ts-ignore

const ScrollView = _reactNative.Platform.OS === 'ios' ? _KeyboardAvoidingView.KeyboardAvoidingScrollView : _reactNative.ScrollView;
const PollingQuestion = ({
  mandatoryErrorMessage,
  question,
  feedback,
  onFeedback,
  forgot,
  onPostPollChoice,
  isPostingPollChoice
}) => {
  const {
    selectedOption,
    onPoll,
    pollingResult
  } = (0, _usePolling.default)(question, onFeedback, onPostPollChoice, feedback);
  const {
    options,
    optionIds,
    questionBrand,
    otherText,
    otherTextLabel
  } = question;
  const {
    colorScheme
  } = (0, _reactNativeUi.useTheme)();
  const isDarkMode = colorScheme === _reactNativeUi.COLOR_SCHEMES.dark;
  const hasSelectedOption = selectedOption !== undefined;
  const optionList = () => {
    const {
      choice: selectedChoice,
      otherFlag: selectedIsOther = false
    } = selectedOption || {};
    const result = options === null || options === void 0 ? void 0 : options.map((title, index) => {
      const choice = `${optionIds === null || optionIds === void 0 ? void 0 : optionIds[index]}` || '';
      const option = {
        title,
        choice,
        otherFlag: false
      };
      const isSelected = choice === selectedChoice;
      const percentage = pollingResult !== undefined ? pollingResult[choice] : undefined;
      return /*#__PURE__*/_react.default.createElement(_PollingItem.default, {
        disabled: hasSelectedOption,
        option: option,
        selected: isSelected,
        percentage: percentage,
        onPoll: onPoll,
        feedback: feedback,
        key: `${title}-${selectedChoice}`
      });
    });
    if (questionBrand === _data.QuestionBrandType.Other) {
      if (feedback && !feedback.otherFlag) return result;
      const option = {
        title: otherTextLabel,
        choice: '',
        otherFlag: true
      };
      result === null || result === void 0 || result.push( /*#__PURE__*/_react.default.createElement(_PollingItem.default, {
        disabled: hasSelectedOption,
        option: option,
        selected: selectedIsOther,
        placeholder: otherText,
        onPoll: onPoll,
        feedback: feedback,
        key: `Other`
      }));
    }
    return result;
  };
  const maskStyle = isDarkMode ? {
    backgroundColor: (0, _styles.addOpacityToHex)(_styles.Colors.backgroundColorDark, 0.5)
  } : undefined;
  return /*#__PURE__*/_react.default.createElement(ScrollView, {
    extraAvoidingSpace: 30,
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    subTitleMessage: `Heads up! Once you’ve made your selection, it cannot be changed.`,
    style: styles.mandatoryTitle
  }), optionList(), /*#__PURE__*/_react.default.createElement(_ActivityIndicatorMask.default, {
    loading: isPostingPollChoice,
    style: maskStyle
  }));
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(PollingQuestion);
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    ..._styles.default.flex1
  },
  mandatoryTitle: {
    marginBottom: 24
  }
});
//# sourceMappingURL=PollingQuestion.js.map