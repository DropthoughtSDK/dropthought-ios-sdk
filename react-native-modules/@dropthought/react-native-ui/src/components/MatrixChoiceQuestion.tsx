import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import MandatoryTitle from './MandatoryTitle';
import type { Question, Survey } from '../data';
import useMatrixChoice from '../hooks/useMatrixChoice';
import type { MatrixChoiceFeedback } from '../hooks/useMatrixChoice';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

type ColoumProps = {
  title: string;
  rowIndex: number;
  coloumIndex: number;
  themeColor: string;
  selectedAnswer: number[][];
  onColoumPress: (rowIndex: number, coloumIndex: number) => void;
};

type RowProps = {
  title: string;
  rowIndex: number;
  question: Question;
  themeColor: string;
  selectedAnswer: number[][];
  collapseList: boolean[];
  onRowPress: (rowIndex: number) => void;
  onColoumPress: (rowIndex: number, coloumIndex: number) => void;
};

type Props = {
  survey: Survey;
  question: Question;
  onFeedback: (feedback: MatrixChoiceFeedback) => void;
  feedback: MatrixChoiceFeedback;
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
  const { colorScheme, fontColor } = useTheme();
  const isSelected = selectedAnswer[rowIndex]?.some(
    (value) => value === coloumIndex
  );
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  let containerBackgroundColor;
  let borderColor;

  if (isDark && isSelected) {
    containerBackgroundColor = addOpacityToColor(themeColor, 0.1);
    borderColor = themeColor;
  } else if (isDark && !isSelected) {
    containerBackgroundColor = Colors.rankingContainerBgDark;
    borderColor = Colors.rankingContainerBgDark;
  } else if (!isDark && isSelected) {
    containerBackgroundColor = addOpacityToColor(themeColor, 0.1);
    borderColor = themeColor;
  } else if (!isDark && !isSelected) {
    containerBackgroundColor = Colors.white;
    borderColor = Colors.white;
  }

  const optionContainerStyle = [
    styles.optionContainer,
    isSelected ? null : styles.optionShadow,
    {
      backgroundColor: containerBackgroundColor,
      borderColor: borderColor,
    },
  ];
  const textStyle = {
    color: fontColor,
  };
  const checkBoxIconStyle = [
    styles.checkBoxIcon,
    {
      tintColor: themeColor,
    },
  ];
  const unCheckBoxStyle = [
    styles.unCheckBox,
    {
      borderColor: isDark ? Colors.white : Colors.rankingCheckBoxBorder,
      backgroundColor: isDark ? Colors.rankingContainerBgDark : Colors.white,
    },
  ];

  return (
    <View style={optionContainerStyle}>
      <TouchableOpacity
        style={styles.coloumButton}
        onPress={() => onColoumPress(rowIndex, coloumIndex)}
      >
        {isSelected ? (
          <Image
            style={checkBoxIconStyle}
            // @ts-ignore
            source={require('../assets/icCheckBox24Px.png')}
          />
        ) : (
          <View style={unCheckBoxStyle} />
        )}
        <View style={GlobalStyle.flex1}>
          <Text numberOfLines={2} style={[styles.optionText, textStyle]}>
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
  const optionsMatrix = optionsForMatrix[0];
  const { colorScheme, fontColor } = useTheme();
  const isDark = colorScheme === COLOR_SCHEMES.dark;
  const isCollapse = collapseList[rowIndex];
  const rowSelectedAnswer = selectedAnswer[rowIndex];

  const icon = isCollapse
    ? require('../assets/ic-extand-down.png')
    : require('../assets/ic-extand-up.png');

  const containerStyle = [
    styles.rowContainer,
    {
      backgroundColor: isDark
        ? Colors.rankingBGDark
        : addOpacityToColor(themeColor, 0.05),
      borderColor: isDark ? Colors.rankingBorderDark : Colors.rankingBorder,
    },
  ];
  const textStyle = {
    color: fontColor,
  };

  const optionsList = !isCollapse
    ? optionsMatrix?.map((value, index) => (
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

  let optionSelectedText = '';
  let optionOtherText = '';
  if (rowSelectedAnswer && rowSelectedAnswer[0] !== -1 && optionsMatrix) {
    if (rowSelectedAnswer.length > 1 && rowSelectedAnswer[0] !== undefined) {
      optionSelectedText = `${optionsMatrix[rowSelectedAnswer[0]]}`;
      optionOtherText = ` +${rowSelectedAnswer.length - 1} Other`;
    } else {
      optionSelectedText = rowSelectedAnswer
        .map((value) => optionsMatrix[value])
        .join();
    }
  }
  const selectedTextStyle = [
    styles.selectedText,
    {
      color: fontColor,
    },
  ];

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.titleButton}
        onPress={() => onRowPress(rowIndex)}
      >
        <View style={styles.titleButtonText}>
          <Text style={[styles.optionText, textStyle]}>{title}</Text>
        </View>
        <View style={styles.titleButtonContent}>
          <Text style={selectedTextStyle}>
            <Text>{optionSelectedText}</Text>
            <Text style={styles.selectedOtherText}>{optionOtherText}</Text>
          </Text>
        </View>
        <Image source={icon} />
      </TouchableOpacity>
      {!isCollapse ? (
        <View style={styles.titleContent}>{optionsList}</View>
      ) : null}
    </View>
  );
};

const MatrixChoiceQuestion = ({
  survey,
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
    handleMatrixChoiceErrorHint,
    onRowPress,
    onColoumPress,
  } = useMatrixChoice(question, feedback, onFeedback);

  return (
    <View style={styles.container}>
      <MandatoryTitle
        forgot={false}
        mandatoryErrorMessage={survey.mandatoryErrorMessage}
        question={question}
        style={styles.title}
        invalidMessage={handleMatrixChoiceErrorHint(forgot)}
      />
      {/* keep the ScrollView below to prevent error => "VirtualizedLists
          should never be nested inside plain ScrollViews with the same
          orientation because it can break windowing and other functionality
          - use another VirtualizedList-backed container instead" */}
      <ScrollView
        horizontal
        scrollEnabled={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <FlatList
          data={questionTitles}
          style={GlobalStyle.flex1}
          contentContainerStyle={styles.constent}
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
      </ScrollView>
    </View>
  );
};

export default React.memo(MatrixChoiceQuestion);

const styles = StyleSheet.create({
  container: {
    ...GlobalStyle.questionContainer,
    ...GlobalStyle.flex1,
  },
  title: {
    marginBottom: 16,
    paddingHorizontal: 30,
  },
  constent: {
    paddingHorizontal: 30,
  },
  rowContainer: {
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  titleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  titleButtonText: {
    flex: 6,
  },
  titleButtonContent: {
    ...GlobalStyle.row,
    flex: 4,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  titleContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  optionContainer: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  optionShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  coloumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 15,
  },
  selectedText: {
    width: '100%',
  },
  selectedOtherText: {
    fontWeight: '500',
  },
  unCheckBox: {
    width: 20,
    height: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.rankingCheckBoxBorder,
    marginRight: 18,
    borderRadius: 3,
  },
  checkBoxIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    marginRight: 18,
    borderRadius: 3,
  },
  scrollViewContainer: {
    width: '100%',
  },
});
