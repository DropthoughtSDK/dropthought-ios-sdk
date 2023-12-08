"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _SmileyIcon = _interopRequireDefault(require("./SmileyIcon"));

var _ramda = require("ramda");

var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));

var _styles = _interopRequireDefault(require("../styles"));

var _translation = _interopRequireDefault(require("../translation"));

var _RatingQuestionConstants = require("../constants/RatingQuestionConstants");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const FakeSmiley = () => {
  return /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, {
    selected: false,
    onPress: () => {},
    label: ""
  });
};

const ClassicIconRatingQuestion = ({
  mandatoryErrorMessage,
  question,
  feedback,
  forgot,
  onFeedback
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  const rtl = _translation.default.dir() === 'rtl';
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const {
    options = [],
    subType = 'smiley',
    questionId
  } = question;
  const optionAmount = options.length;
  const fakeSmileyAmount = 5 - optionAmount;
  const [selectedIndex, setSelectedIndex] = (0, _react.useState)();
  const baseIcon = (0, _react.useMemo)(() => (0, _RatingQuestionConstants.defaultIcon)(subType, colorScheme), [colorScheme, subType]);
  const icons = (0, _react.useMemo)(() => (0, _RatingQuestionConstants.getIcons)(subType, optionAmount), [subType, optionAmount]);
  const selectedIcons = (0, _react.useMemo)(() => (0, _RatingQuestionConstants.getSelectedIcons)(subType, optionAmount), [subType, optionAmount]);
  (0, _react.useEffect)(() => {
    getInitialSelectedValueFromFeedbackProps(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialSelectedValueFromFeedbackProps = () => {
    let prevAnswer;

    if (feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0])) {
      prevAnswer = parseInt(feedback.answers[0], 10);
      setSelectedIndex(prevAnswer);
    }
  };

  const setSelectedAndFeedback = index => {
    setSelectedIndex(index);
    const result = {
      questionId,
      answers: [index],
      type: 'rating'
    };
    onFeedback(result);
  };

  const iconRow = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.horizontal, rtl && _styles.default.flexRowReverse]
  }, options.map((option, index) => {
    const isSelected = selectedIndex === index;
    let source;

    if (subType === _RatingQuestionConstants.RatingIconType.star || subType === _RatingQuestionConstants.RatingIconType.heart) {
      if (selectedIndex !== undefined) {
        source = selectedIndex >= index ? icons[selectedIndex] : baseIcon;
      } else {
        source = baseIcon;
      }
    } else {
      source = isSelected ? selectedIcons[index] : icons[index];
    }

    return /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, {
      selected: isSelected,
      source: source,
      label: option,
      onPress: () => setSelectedAndFeedback(index),
      key: index.toString()
    });
  }), Array(fakeSmileyAmount).map((_, index) => /*#__PURE__*/_react.default.createElement(FakeSmiley, {
    key: index.toString()
  })));

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.smileyRowContainer, rtl && _styles.default.flexEnd]
  }, iconRow));
};

var _default = /*#__PURE__*/_react.default.memo(ClassicIconRatingQuestion);

exports.default = _default;

const phoneStyles = _reactNative.StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6
  }
});
//# sourceMappingURL=ClassicIconRatingQuestion.js.map