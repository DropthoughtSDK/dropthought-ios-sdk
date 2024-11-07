"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));
var _styles = require("../styles");
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _theme = require("../contexts/theme");
var _ramda = require("ramda");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MIN_VALUE = 1;
const NPS_MIN_VALUE = 0;
const getInitialSelectedValue = feedback => {
  if (feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0])) {
    return parseInt(feedback.answers[0], 10);
  }
  return undefined;
};
const getLabelText = ({
  isPhone,
  question,
  maximumValue,
  valueData
}) => {
  const labelText = `${valueData + (question.type === 'nps' ? NPS_MIN_VALUE : MIN_VALUE)}`;
  if (isPhone) {
    if (valueData === 0) {
      return `${labelText} - ${question.options[0]}`;
    }
    if (valueData === maximumValue - 1) {
      return `${labelText} - ${question.options[question.options.length - 1]}`;
    }
  }
  return labelText;
};
const SliderRatingQuestion = ({
  survey,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    questionId,
    scale,
    type
  } = question;
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const {
    colorScheme,
    fontColor,
    backgroundColor
  } = (0, _theme.useTheme)();
  const appearanceBackgroundColor = (0, _styles.addOpacityToColor)(colorScheme === _theme.COLOR_SCHEMES.dark ? _styles.Colors.appearanceSubBlack : themeColor, 0.08);
  const buttonTextSelected = {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.dark ? (0, _styles.addOpacityToColor)(themeColor, 0.3) : appearanceBackgroundColor,
    borderColor: themeColor,
    color: colorScheme === _theme.COLOR_SCHEMES.dark ? fontColor : themeColor
  };
  const buttonTextStyle = {
    backgroundColor: appearanceBackgroundColor,
    borderColor: backgroundColor,
    color: fontColor
  };
  const [value, setValue] = (0, _react.useState)(getInitialSelectedValue(feedback));
  const onSelected = index => {
    onFeedback({
      questionId,
      answers: [index],
      type: type
    });
    setValue(index);
  };
  const maximumValue = parseInt(scale, 10);
  const getSliderIndicator = () => {
    return [...Array(maximumValue).keys()].map((valueData, index) => {
      const textStyle = value === index ? [styles.buttonText, buttonTextStyle, buttonTextSelected] : [styles.buttonText, buttonTextStyle];
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        key: index,
        onPress: () => onSelected(index)
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: textStyle
      }, getLabelText({
        isPhone,
        question,
        maximumValue,
        valueData
      })));
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: commonStyles.container
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    forgot: forgot,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    question: question
  }), getSliderIndicator());
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(SliderRatingQuestion);
const commonStyles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 42
  }
});
const phoneStyles = _reactNative.StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 24
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 9,
    marginBottom: 10,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1
  }
});
const tabletStyles = _reactNative.StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 24
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 9,
    marginBottom: 10,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1
  }
});
//# sourceMappingURL=SliderRatingQuestion.js.map