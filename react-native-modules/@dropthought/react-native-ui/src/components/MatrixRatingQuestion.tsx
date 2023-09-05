import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import MandatoryTitle from './MandatoryTitle';
import type { Question, Feedback } from '../data';
import useMatrixRating from '../hooks/useMatrixRating';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

type ColoumProps = {
  title: string;
  rowIndex: number;
  coloumIndex: number;
  themeColor: string;
  selectedAnswer: number[];
  onColoumPress: (rowIndex: number, coloumIndex: number) => void;
};

type RowProps = {
  title: string;
  rowIndex: number;
  question: Question;
  themeColor: string;
  selectedAnswer: number[];
  collapseList: boolean[];
  onRowPress: (rowIndex: number) => void;
  onColoumPress: (rowIndex: number, coloumIndex: number) => void;
};

type Props = {
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  feedback: Feedback;
  forgot: boolean;
  themeColor: string;
};

const MatrixColoum = ({
  title,
  rowIndex,
  coloumIndex,
  themeColor,
  selectedAnswer,
  onColoumPress,
}: ColoumProps) => {
  const isSelected = selectedAnswer[rowIndex] === coloumIndex;
  const { colorScheme } = useTheme();
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

  const optionContainerStyle = [
    styles.optionContainer,
    {
      backgroundColor: containerBackgroundColor,
    },
  ];
  const textStyle = {
    color: textColor,
  };
  const coloumIndexStyle = [
    styles.coloumIndex,
    {
      backgroundColor: coloumIndexBackgroundColor,
    },
  ];

  return (
    <View style={optionContainerStyle}>
      <TouchableOpacity
        style={styles.coloumButton}
        onPress={() => onColoumPress(rowIndex, coloumIndex)}
      >
        <View style={coloumIndexStyle}>
          <Text>{coloumIndex + 1}</Text>
        </View>
        <View style={GlobalStyle.flex1}>
          <Text numberOfLines={2} style={textStyle}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MatrixRow = ({
  title,
  rowIndex,
  question,
  themeColor,
  selectedAnswer,
  collapseList,
  onRowPress,
  onColoumPress,
}: RowProps) => {
  const { questionId, optionsForMatrix } = question;
  const { colorScheme, fontColor } = useTheme();
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  const isCollapse = collapseList[rowIndex];

  const icon = isCollapse
    ? require('../assets/ic-extand-down.png')
    : require('../assets/ic-extand-up.png');

  const optionSelectedIndexStyle = [
    styles.coloumIndex,
    { backgroundColor: themeColor },
  ];
  const containerStyle = [
    styles.rowContainer,
    {
      backgroundColor: isDark
        ? Colors.rankingBGDark
        : addOpacityToColor(themeColor, 0.05),
      borderColor: isDark ? Colors.rankingBorderDark : Colors.rankingBorder,
    },
  ];
  const indexTextStyle = {
    color: Colors.white,
  };
  const textStyle = {
    color: fontColor,
  };

  const optionsList = !isCollapse
    ? optionsForMatrix[0].map((value, index) => (
        <MatrixColoum
          title={value}
          rowIndex={rowIndex}
          coloumIndex={index}
          themeColor={themeColor}
          selectedAnswer={selectedAnswer}
          onColoumPress={onColoumPress}
          key={`${questionId}-${value}-${index}`}
        />
      ))
    : null;

  const optionSelectedText =
    selectedAnswer[rowIndex] !== -1 ? (
      <View style={styles.titleButtonSelected}>
        <View style={optionSelectedIndexStyle}>
          <Text style={indexTextStyle}>{selectedAnswer[rowIndex] + 1}</Text>
        </View>
        <View style={GlobalStyle.flexShrink1}>
          <Text numberOfLines={2} style={textStyle}>
            {optionsForMatrix[0][selectedAnswer[rowIndex]]}
          </Text>
        </View>
      </View>
    ) : null;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.titleButton}
        onPress={() => onRowPress(rowIndex)}
      >
        <View style={styles.titleButtonText}>
          <Text style={textStyle}>{title}</Text>
        </View>
        <View style={styles.titleButtonContent}>
          {optionSelectedText}
          <Image source={icon} />
        </View>
      </TouchableOpacity>
      <View style={styles.titleContent}>{optionsList}</View>
    </View>
  );
};

const MatrixRatingQuestion = ({
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const { questionTitles } = question;
  const {
    collapseList,
    selectedAnswer,
    handleMatrixRatingErrorHint,
    onRowPress,
    onColoumPress,
  } = useMatrixRating(question, feedback, onFeedback);

  return (
    <View style={styles.container}>
      <MandatoryTitle
        forgot={false}
        question={question}
        style={styles.title}
        invalidMessage={handleMatrixRatingErrorHint(forgot)}
      />
      <FlatList
        data={questionTitles}
        style={styles.content}
        renderItem={({ item, index }) => (
          <MatrixRow
            title={item}
            rowIndex={index}
            question={question}
            themeColor={themeColor}
            selectedAnswer={selectedAnswer}
            collapseList={collapseList}
            onRowPress={onRowPress}
            onColoumPress={onColoumPress}
          />
        )}
        keyExtractor={(title, index) => `${title}-${index}`}
      />
    </View>
  );
};

export default React.memo(MatrixRatingQuestion);

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.questionContainer,
    ...GlobalStyle.flex1,
  },
  title: {
    marginBottom: 16,
    paddingHorizontal: 30,
  },
  content: {
    ...GlobalStyle.flex1,
    paddingHorizontal: 30,
  },
  rowContainer: {
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  titleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  titleButtonText: {
    flex: 6,
  },
  titleButtonContent: {
    ...GlobalStyle.row,
    flex: 4,
    justifyContent: 'flex-end',
  },
  titleButtonSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginRight: 6,
  },
  titleContent: {
    paddingHorizontal: 12,
  },
  optionContainer: {
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  coloumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  coloumIndex: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 8,
  },
});
