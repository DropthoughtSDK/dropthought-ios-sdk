"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _ramda = require("ramda");

var _SmileyIcon = _interopRequireDefault(require("./SmileyIcon"));

var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));

var _styles = _interopRequireDefault(require("../styles"));

var _translation = _interopRequireDefault(require("../translation"));

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _theme = require("../contexts/theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const noop = () => undefined;

const getInitialSelectedValue = (feedback, question) => {
  let prevAnswer;

  if (feedback && feedback.answers && !(0, _ramda.isNil)(feedback.answers[0])) {
    prevAnswer = parseInt(feedback.answers[0], 10);
  }

  return question.options.map((_option, index) => prevAnswer === index);
};

const VeryDislikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_very_dislike_selected.png') : colorScheme === _theme.COLOR_SCHEMES.dark ? require('../assets/btn_very_dislike_dark.png') : require('../assets/btn_very_dislike.png')
  }));
};

const VeryLikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_very_like_selected.png') : colorScheme === _theme.COLOR_SCHEMES.dark ? require('../assets/btn_very_like_dark.png') : require('../assets/btn_very_like.png')
  }));
};

const NotSureIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_not_sure_selected.png') : colorScheme === _theme.COLOR_SCHEMES.dark ? require('../assets/btn_not_sure_dark.png') : require('../assets/btn_not_sure.png')
  }));
};

const LikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_like_selected.png') : colorScheme === _theme.COLOR_SCHEMES.dark ? require('../assets/btn_like_dark.png') : require('../assets/btn_like.png')
  }));
};

const DislikeIcon = ({
  selected,
  onPress,
  label,
  ...restProps
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, _extends({
    selected: selected,
    onPress: onPress,
    label: label
  }, restProps, {
    source: selected ? require('../assets/btn_dislike_selected.png') : colorScheme === _theme.COLOR_SCHEMES.dark ? require('../assets/btn_dislike_dark.png') : require('../assets/btn_dislike.png')
  }));
};

const ClassicSmileyRatingQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot
}) => {
  const [selected, setSelected] = _react.default.useState(getInitialSelectedValue(feedback, question));

  const setSelectedAndFeedback = _react.default.useCallback(index => {
    let selectedMap = question.options.map(() => false);
    selectedMap[index] = true;
    setSelected(selectedMap);
    onFeedback({
      questionId: question.questionId,
      answers: [index],
      type: 'rating'
    });
  }, [onFeedback, question.options, question.questionId]);

  const rtl = _translation.default.dir() === 'rtl';
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isPhone = dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;

  const fakeSmiley = !isPhone && /*#__PURE__*/_react.default.createElement(_SmileyIcon.default, {
    selected: false,
    onPress: noop,
    label: ""
  });

  const renderSmiley = () => {
    const viewStyle = isPhone ? styles.containter : [styles.containter, rtl && _styles.default.flexRowReverse];
    const {
      options
    } = question;

    switch (options.length) {
      case 2:
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: viewStyle
        }, /*#__PURE__*/_react.default.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/_react.default.createElement(VeryLikeIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), fakeSmiley, fakeSmiley, fakeSmiley);

      case 3:
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: viewStyle
        }, /*#__PURE__*/_react.default.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/_react.default.createElement(NotSureIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), /*#__PURE__*/_react.default.createElement(VeryLikeIcon, {
          selected: selected[2],
          onPress: () => setSelectedAndFeedback(2),
          label: options[2]
        }), fakeSmiley, fakeSmiley);

      case 4:
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: viewStyle
        }, /*#__PURE__*/_react.default.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/_react.default.createElement(NotSureIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), /*#__PURE__*/_react.default.createElement(LikeIcon, {
          selected: selected[2],
          onPress: () => setSelectedAndFeedback(2),
          label: options[2]
        }), /*#__PURE__*/_react.default.createElement(VeryLikeIcon, {
          selected: selected[3],
          onPress: () => setSelectedAndFeedback(3),
          label: options[3]
        }), fakeSmiley);

      case 5:
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: viewStyle
        }, /*#__PURE__*/_react.default.createElement(VeryDislikeIcon, {
          selected: selected[0],
          onPress: () => setSelectedAndFeedback(0),
          label: options[0]
        }), /*#__PURE__*/_react.default.createElement(DislikeIcon, {
          selected: selected[1],
          onPress: () => setSelectedAndFeedback(1),
          label: options[1]
        }), /*#__PURE__*/_react.default.createElement(NotSureIcon, {
          selected: selected[2],
          onPress: () => setSelectedAndFeedback(2),
          label: options[2]
        }), /*#__PURE__*/_react.default.createElement(LikeIcon, {
          selected: selected[3],
          onPress: () => setSelectedAndFeedback(3),
          label: options[3]
        }), /*#__PURE__*/_react.default.createElement(VeryLikeIcon, {
          selected: selected[4],
          onPress: () => setSelectedAndFeedback(4),
          label: options[4]
        }));

      default:
        return null;
    }
  };

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.smileyRowContainer, rtl && _styles.default.flexEnd]
  }, renderSmiley()));
};

var _default = /*#__PURE__*/_react.default.memo(ClassicSmileyRatingQuestion);

exports.default = _default;

const phoneStyles = _reactNative.StyleSheet.create({
  containter: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6
  }
});

const tabletStyles = _reactNative.StyleSheet.create({
  containter: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 560,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  smileyRowContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});
//# sourceMappingURL=ClassicSmileyRatingQuestion.js.map