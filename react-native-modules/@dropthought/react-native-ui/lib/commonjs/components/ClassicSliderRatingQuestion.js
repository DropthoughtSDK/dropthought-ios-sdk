"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));
var _styles = _interopRequireWildcard(require("../styles"));
var _ramda = require("ramda");
var _translation = _interopRequireDefault(require("../translation"));
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _theme = require("../contexts/theme");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
const ClassicSliderRatingQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    colorScheme,
    fontColor,
    backgroundColor: themeBackgroundColor
  } = (0, _theme.useTheme)();
  const [value, setValue] = _react.default.useState(getInitialSelectedValue(feedback));
  const maximumValue = parseInt(question.scale, 10);
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const getBackgroundColorStyle = ({
    selected,
    darkMode
  }) => {
    if (selected) {
      return {
        backgroundColor: themeColor,
        resizeMode: 'contain'
      };
    }
    if (darkMode) {
      return styles.backgroundDark;
    }
    return {
      backgroundColor: themeBackgroundColor
    };
  };
  const getSliderIndicator = () => {
    const textStyle = [styles.label, {
      color: fontColor,
      minHeight: _translation.default.language === 'te' ? 25 : 0,
      marginTop: _translation.default.language === 'te' ? 8 : 0,
      marginBottom: _translation.default.language === 'te' ? 2 : 0
    }];
    return [...Array(maximumValue).keys()].map((valueData, index) => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableHighlight, {
      accessible: false,
      testID: `test:id/scale_option_${index === value}`,
      underlayColor: themeBackgroundColor,
      key: index.toString(),
      onPress: () => {
        onFeedback({
          questionId: question.questionId,
          answers: [index],
          type: question.type
        });
        setValue(index);
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [isPhone ? styles.backgroundPhone : styles.backgroundTablet, getBackgroundColorStyle({
        selected: index === value,
        darkMode: colorScheme === _theme.COLOR_SCHEMES.dark
      })]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: `test:id/scale_label_${fontColor}`,
      style: [textStyle, index === value ? styles.selectedLabel : {}]
    }, getLabelText({
      isPhone,
      question,
      maximumValue,
      valueData
    })))));
  };
  const getWidthStyle = () => {
    let width = maximumValue / 10.0 * 100 > 100 ? 100 : maximumValue / 10.0 * 100;
    return {
      maxWidth: width + '%',
      marginTop: 22,
      paddingHorizontal: 10
    };
  };
  const rtl = _translation.default.dir() === 'rtl';
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    style: styles.marginBottom25,
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question
  }), isPhone ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.vertical]
  }, getSliderIndicator()) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: rtl && _styles.default.flexRowReverse
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View
  // @ts-ignore
  , {
    style: getWidthStyle()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.line
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.horizontal, rtl && _styles.default.flexRowReverse]
  }, getSliderIndicator()))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: rtl && _styles.default.flexRowReverse
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.horizontal, styles.marginTop10, getWidthStyle(), rtl && _styles.default.flexRowReverse]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.options
  }, question.options[0]), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.options
  }, question.options[question.options.length - 1])))));
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(ClassicSliderRatingQuestion);
const styles = _reactNative.StyleSheet.create({
  backgroundPhone: {
    backgroundColor: _styles.Colors.white,
    borderColor: _styles.Colors.sliderShadowColor,
    borderRadius: 2,
    elevation: 5,
    minHeight: 33,
    justifyContent: 'center',
    shadowColor: _styles.Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    width: '100%',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backgroundTablet: {
    backgroundColor: _styles.Colors.white,
    borderColor: _styles.Colors.sliderShadowColor,
    borderRadius: 1000,
    elevation: 5,
    height: 45,
    justifyContent: 'center',
    shadowColor: _styles.Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 45
  },
  backgroundDark: {
    backgroundColor: _styles.Colors.sliderBackgroundDark,
    elevation: 0
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  vertical: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    ..._reactNative.Platform.select({
      android: {
        paddingHorizontal: 7
      }
    })
  },
  label: {
    textAlign: 'center'
  },
  line: {
    backgroundColor: _styles.Colors.sliderShadowColor,
    height: 1,
    top: '50%',
    width: '100%'
  },
  marginBottom10: {
    marginBottom: 10
  },
  marginBottom25: {
    marginBottom: 25
  },
  marginTop10: {
    marginTop: 10
  },
  options: {
    fontSize: 12
  },
  selectedLabel: {
    textAlign: 'center'
  }
});
//# sourceMappingURL=ClassicSliderRatingQuestion.js.map