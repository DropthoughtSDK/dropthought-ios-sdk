"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = _interopRequireWildcard(require("../styles"));

var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));

var _useMatrixChoice = _interopRequireDefault(require("../hooks/useMatrixChoice"));

var _theme = require("../contexts/theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const isSelected = selectedAnswer[rowIndex].some(value => value === coloumIndex);
  const isDark = colorScheme === _theme.COLOR_SCHEMES.dark;
  let containerBackgroundColor;
  let borderColor;

  if (isDark && isSelected) {
    containerBackgroundColor = (0, _styles.addOpacityToColor)(themeColor, 0.1);
    borderColor = themeColor;
  } else if (isDark && !isSelected) {
    containerBackgroundColor = _styles.Colors.rankingContainerBgDark;
    borderColor = _styles.Colors.rankingContainerBgDark;
  } else if (!isDark && isSelected) {
    containerBackgroundColor = (0, _styles.addOpacityToColor)(themeColor, 0.1);
    borderColor = themeColor;
  } else if (!isDark && !isSelected) {
    containerBackgroundColor = _styles.Colors.white;
    borderColor = _styles.Colors.white;
  }

  const optionContainerStyle = [styles.optionContainer, isSelected ? null : styles.optionShadow, {
    backgroundColor: containerBackgroundColor,
    borderColor: borderColor
  }];
  const textStyle = {
    color: fontColor
  };
  const checkBoxIconStyle = [styles.checkBoxIcon, {
    tintColor: themeColor
  }];
  const unCheckBoxStyle = [styles.unCheckBox, {
    borderColor: isDark ? _styles.Colors.white : _styles.Colors.rankingCheckBoxBorder,
    backgroundColor: isDark ? _styles.Colors.rankingContainerBgDark : _styles.Colors.white
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: optionContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.coloumButton,
    onPress: () => onColoumPress(rowIndex, coloumIndex)
  }, isSelected ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: checkBoxIconStyle // @ts-ignore
    ,
    source: require('../assets/icCheckBox24Px.png')
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: unCheckBoxStyle
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.flex1
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 2,
    style: [styles.optionText, textStyle]
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
  const {
    questionId,
    optionsForMatrix
  } = question;
  const optionsMatrix = optionsForMatrix[0];
  const {
    colorScheme,
    fontColor
  } = (0, _theme.useTheme)();
  const isDark = colorScheme === _theme.COLOR_SCHEMES.dark;
  const isCollapse = collapseList[rowIndex];
  const rowSelectedAnswer = selectedAnswer[rowIndex];
  const icon = isCollapse ? require('../assets/ic-extand-down.png') : require('../assets/ic-extand-up.png');
  const containerStyle = [styles.rowContainer, {
    backgroundColor: isDark ? _styles.Colors.rankingBGDark : (0, _styles.addOpacityToColor)(themeColor, 0.05),
    borderColor: isDark ? _styles.Colors.rankingBorderDark : _styles.Colors.rankingBorder
  }];
  const textStyle = {
    color: fontColor
  };
  const optionsList = !isCollapse ? optionsMatrix.map((value, index) => /*#__PURE__*/_react.default.createElement(MatrixColoum, {
    title: value,
    rowIndex: rowIndex,
    coloumIndex: index,
    themeColor: themeColor,
    selectedAnswer: selectedAnswer,
    onColoumPress: onColoumPress,
    key: `${questionId}-${value}-${index}`
  })) : null;
  let optionSelectedText = '';
  let optionOtherText = '';

  if (rowSelectedAnswer[0] !== -1) {
    if (rowSelectedAnswer.length > 1) {
      optionSelectedText = `${optionsMatrix[rowSelectedAnswer[0]]}`;
      optionOtherText = ` +${rowSelectedAnswer.length - 1} Other`;
    } else {
      optionSelectedText = rowSelectedAnswer.map(value => optionsMatrix[value]).join();
    }
  }

  const selectedTextStyle = [styles.selectedText, {
    color: fontColor
  }];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.titleButton,
    onPress: () => onRowPress(rowIndex)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleButtonText
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.optionText, textStyle]
  }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleButtonContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: selectedTextStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, optionSelectedText), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.selectedOtherText
  }, optionOtherText))), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: icon
  })), !isCollapse ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleContent
  }, optionsList) : null);
};

const MatrixChoiceQuestion = ({
  survey,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const {
    questionTitles
  } = question;
  const {
    collapseList,
    selectedAnswer,
    handleMatrixChoiceErrorHint,
    onRowPress,
    onColoumPress
  } = (0, _useMatrixChoice.default)(question, feedback, onFeedback);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    forgot: false,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    question: question,
    style: styles.title,
    invalidMessage: handleMatrixChoiceErrorHint(forgot)
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    horizontal: true,
    scrollEnabled: false,
    contentContainerStyle: styles.scrollViewContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: questionTitles,
    style: _styles.default.flex1,
    contentContainerStyle: styles.constent,
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/_react.default.createElement(MatrixRow, {
      title: item,
      rowIndex: index,
      question: question,
      themeColor: themeColor,
      selectedAnswer: selectedAnswer,
      collapseList: collapseList,
      onRowPress: onRowPress,
      onColoumPress: onColoumPress
    }),
    keyExtractor: (title, index) => `${title}-${index}`
  })));
};

var _default = /*#__PURE__*/_react.default.memo(MatrixChoiceQuestion);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  container: { ..._styles.default.questionContainer,
    ..._styles.default.flex1
  },
  title: {
    marginBottom: 16,
    paddingHorizontal: 30
  },
  constent: {
    paddingHorizontal: 30
  },
  rowContainer: {
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1
  },
  titleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  titleButtonText: {
    flex: 6
  },
  titleButtonContent: { ..._styles.default.row,
    flex: 4,
    justifyContent: 'flex-end',
    paddingHorizontal: 8
  },
  titleContent: {
    paddingHorizontal: 12,
    paddingBottom: 16
  },
  optionContainer: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8
  },
  optionShadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  coloumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  optionText: {
    fontSize: 15
  },
  selectedText: {
    width: '100%'
  },
  selectedOtherText: {
    fontWeight: '500'
  },
  unCheckBox: {
    width: 20,
    height: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: _styles.Colors.rankingCheckBoxBorder,
    marginRight: 18,
    borderRadius: 3
  },
  checkBoxIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    marginRight: 18,
    borderRadius: 3
  },
  scrollViewContainer: {
    width: '100%'
  }
});
//# sourceMappingURL=MatrixChoiceQuestion.js.map