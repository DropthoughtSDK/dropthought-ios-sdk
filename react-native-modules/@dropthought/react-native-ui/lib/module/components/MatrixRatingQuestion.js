import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import MandatoryTitle from './MandatoryTitle';
import useMatrixRating from '../hooks/useMatrixRating';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

const MatrixColoum = ({
  title,
  rowIndex,
  coloumIndex,
  themeColor,
  selectedAnswer,
  onColoumPress
}) => {
  const isSelected = selectedAnswer[rowIndex] === coloumIndex;
  const {
    colorScheme
  } = useTheme();
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  let containerBackgroundColor;
  let textColor = Colors.white;
  let coloumIndexBackgroundColor = Colors.white;

  if (isDark && isSelected) {
    containerBackgroundColor = themeColor;
  } else if (isDark && !isSelected) {
    containerBackgroundColor = Colors.rankingContainerBgDark;
    coloumIndexBackgroundColor = Colors.rankingCheckBoxBorder;
  } else if (!isDark && isSelected) {
    containerBackgroundColor = themeColor;
  } else if (!isDark && !isSelected) {
    containerBackgroundColor = Colors.white;
    textColor = Colors.black;
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
  return /*#__PURE__*/React.createElement(View, {
    style: optionContainerStyle
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.coloumButton,
    onPress: () => onColoumPress(rowIndex, coloumIndex)
  }, /*#__PURE__*/React.createElement(View, {
    style: coloumIndexStyle
  }, /*#__PURE__*/React.createElement(Text, null, coloumIndex + 1)), /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, /*#__PURE__*/React.createElement(Text, {
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
  const {
    questionId,
    optionsForMatrix
  } = question;
  const {
    colorScheme,
    fontColor
  } = useTheme();
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  const isCollapse = collapseList[rowIndex];
  const icon = isCollapse ? require('../assets/ic-extand-down.png') : require('../assets/ic-extand-up.png');
  const optionSelectedIndexStyle = [styles.coloumIndex, {
    backgroundColor: themeColor
  }];
  const containerStyle = [styles.rowContainer, {
    backgroundColor: isDark ? Colors.rankingBGDark : addOpacityToColor(themeColor, 0.05),
    borderColor: isDark ? Colors.rankingBorderDark : Colors.rankingBorder
  }];
  const indexTextStyle = {
    color: Colors.white
  };
  const textStyle = {
    color: fontColor
  };
  const optionsList = !isCollapse ? optionsForMatrix[0].map((value, index) => /*#__PURE__*/React.createElement(MatrixColoum, {
    title: value,
    rowIndex: rowIndex,
    coloumIndex: index,
    themeColor: themeColor,
    selectedAnswer: selectedAnswer,
    onColoumPress: onColoumPress,
    key: `${questionId}-${value}-${index}`
  })) : null;
  const optionSelectedText = selectedAnswer[rowIndex] !== -1 ? /*#__PURE__*/React.createElement(View, {
    style: styles.titleButtonSelected
  }, /*#__PURE__*/React.createElement(View, {
    style: optionSelectedIndexStyle
  }, /*#__PURE__*/React.createElement(Text, {
    style: indexTextStyle
  }, selectedAnswer[rowIndex] + 1)), /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flexShrink1
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 2,
    style: textStyle
  }, optionsForMatrix[0][selectedAnswer[rowIndex]]))) : null;
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.titleButton,
    onPress: () => onRowPress(rowIndex)
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.titleButtonText
  }, /*#__PURE__*/React.createElement(Text, {
    style: textStyle
  }, title)), /*#__PURE__*/React.createElement(View, {
    style: styles.titleButtonContent
  }, optionSelectedText, /*#__PURE__*/React.createElement(Image, {
    source: icon
  }))), /*#__PURE__*/React.createElement(View, {
    style: styles.titleContent
  }, optionsList));
};

const MatrixRatingQuestion = ({
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
    handleMatrixRatingErrorHint,
    onRowPress,
    onColoumPress
  } = useMatrixRating(question, feedback, onFeedback);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(MandatoryTitle, {
    forgot: false,
    question: question,
    style: styles.title,
    invalidMessage: handleMatrixRatingErrorHint(forgot)
  }), /*#__PURE__*/React.createElement(FlatList, {
    data: questionTitles,
    style: GlobalStyle.flex1,
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/React.createElement(MatrixRow, {
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
  }));
};

export default /*#__PURE__*/React.memo(MatrixRatingQuestion);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    ...GlobalStyle.questionContainer,
    ...GlobalStyle.flex1
  },
  title: {
    marginBottom: 16
  },
  rowContainer: {
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
  titleButtonContent: { ...GlobalStyle.row,
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
//# sourceMappingURL=MatrixRatingQuestion.js.map