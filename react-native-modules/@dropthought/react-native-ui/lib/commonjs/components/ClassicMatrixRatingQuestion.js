"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireWildcard(require("../styles"));
var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));
var _useMatrixRating = _interopRequireDefault(require("../hooks/useMatrixRating"));
var _theme = require("../contexts/theme");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MatrixColoum = ({
  title,
  rowIndex,
  coloumIndex,
  themeColor,
  selectedAnswer,
  onColoumPress
}) => {
  const {
    colorScheme
  } = (0, _theme.useTheme)();
  const isSelected = selectedAnswer[rowIndex] === coloumIndex;
  const isDark = colorScheme === _theme.COLOR_SCHEMES.dark;
  let containerBackgroundColor;
  let textColor = _styles.Colors.white;
  let coloumIndexBackgroundColor = _styles.Colors.white;
  if (isDark && isSelected) {
    containerBackgroundColor = themeColor;
  } else if (isDark && !isSelected) {
    containerBackgroundColor = _styles.Colors.rankingContainerBgDark;
    coloumIndexBackgroundColor = _styles.Colors.rankingCheckBoxBorder;
  } else if (!isDark && isSelected) {
    containerBackgroundColor = themeColor;
  } else if (!isDark && !isSelected) {
    containerBackgroundColor = _styles.Colors.white;
    textColor = _styles.Colors.black;
  }
  const optionContainerStyle = [styles.optionContainer, {
    backgroundColor: containerBackgroundColor
  }];
  const textStyle = {
    color: textColor
  };
  const coloumIndexStyle = [styles.coloumIndex, {
    backgroundColor: coloumIndexBackgroundColor
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: optionContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: false,
    style: styles.coloumButton,
    onPress: () => onColoumPress(rowIndex, coloumIndex)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: coloumIndexStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, coloumIndex + 1)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.flex1
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/matrix_rating_option",
    numberOfLines: 2,
    style: textStyle
  }, title))));
};
const MatrixRow = ({
  title,
  rowIndex,
  question,
  themeColor,
  selectedAnswer,
  collapseList,
  onRowPress,
  onColoumPress
}) => {
  var _optionsForMatrix$;
  const {
    questionId,
    optionsForMatrix
  } = question;
  const {
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const isDark = colorScheme === _theme.COLOR_SCHEMES.dark;
  const isCollapse = collapseList[rowIndex];
  const icon = isCollapse ? require('../assets/ic-extand-down.png') : require('../assets/ic-extand-up.png');
  const optionSelectedIndexStyle = [styles.coloumIndex, {
    backgroundColor: themeColor
  }];
  const containerStyle = [styles.container, {
    backgroundColor: isDark ? _styles.Colors.rankingBGDark : (0, _styles.addOpacityToColor)(themeColor, 0.05),
    borderColor: isDark ? _styles.Colors.rankingBorderDark : _styles.Colors.rankingBorder
  }];
  const indexTextStyle = {
    color: _styles.Colors.white
  };
  const textStyle = {
    color: fontColor
  };
  const optionsList = !isCollapse ? (_optionsForMatrix$ = optionsForMatrix[0]) === null || _optionsForMatrix$ === void 0 ? void 0 : _optionsForMatrix$.map((value, index) => /*#__PURE__*/_react.default.createElement(MatrixColoum, {
    title: value,
    rowIndex: rowIndex,
    coloumIndex: index,
    themeColor: themeColor,
    selectedAnswer: selectedAnswer,
    onColoumPress: onColoumPress,
    key: `${questionId}-${value}-${index}`
  })) : null;
  const answer = selectedAnswer[rowIndex];
  const optionSelectedText = answer !== undefined && answer !== -1 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleButtonSelected
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: optionSelectedIndexStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/matrix_rating_selected_index",
    style: indexTextStyle
  }, answer + 1)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.flexShrink1
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: "test:id/matrix_rating_selected_option",
    numberOfLines: 2,
    style: textStyle
  }, optionsForMatrix[0] && optionsForMatrix[0][answer]))) : null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessible: false,
    style: styles.titleButton,
    onPress: () => onRowPress(rowIndex)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleButtonText
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: `test:id/matrix_rating_title_${fontColor}`,
    style: textStyle
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleButtonContent
  }, optionSelectedText, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: icon
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleContent
  }, optionsList));
};
const ClassicMatrixRatingQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    questionId,
    questionTitles
  } = question;
  const {
    collapseList,
    selectedAnswer,
    handleMatrixRatingErrorHint,
    onRowPress,
    onColoumPress
  } = (0, _useMatrixRating.default)(question, feedback, onFeedback);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: false,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.title,
    invalidMessage: handleMatrixRatingErrorHint(forgot)
  }), questionTitles.map((title, index) => {
    return /*#__PURE__*/_react.default.createElement(MatrixRow, {
      title: title,
      rowIndex: index,
      question: question,
      themeColor: themeColor,
      selectedAnswer: selectedAnswer,
      collapseList: collapseList,
      onRowPress: onRowPress,
      onColoumPress: onColoumPress,
      key: `${questionId}-${title}-${index}`
    });
  }));
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(ClassicMatrixRatingQuestion);
const styles = _reactNative.StyleSheet.create({
  title: {
    marginBottom: 16
  },
  container: {
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1
  },
  titleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  titleButtonText: {
    flex: 6
  },
  titleButtonContent: {
    ..._styles.default.row,
    flex: 4,
    justifyContent: 'flex-end'
  },
  titleButtonSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginRight: 6
  },
  titleContent: {
    paddingHorizontal: 12
  },
  optionContainer: {
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4
  },
  coloumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  coloumIndex: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 8
  }
});
//# sourceMappingURL=ClassicMatrixRatingQuestion.js.map