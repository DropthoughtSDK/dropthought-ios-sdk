import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  ActionSheetIOS,
  FlatList,
} from 'react-native';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import MandatoryTitle from './MandatoryTitle';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import type {
  Feedback as OriginFeedback,
  Question as OriginQuestion,
} from '../data';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import DraggableList from '../utils/react-native-draggable-list/DraggableList';
import type {
  DraggableListRenderItem,
  TransformedOption,
} from '../utils/react-native-draggable-list/DraggableList';

type RenderItemProps = {
  item: TransformedOption;
  index: number;
};

interface SwapElements {
  (
    array: TransformedOption[],
    index1: number,
    index2: number
  ): TransformedOption[];
}

type Feedback = OriginFeedback & {
  listForRankingQuestion: TransformedOption[];
};

type Question = OriginQuestion & {
  options: string[];
  scale: string;
  allowNAForRanking: boolean;
};

const swapElements: SwapElements = (array, index1, index2) => {
  let newArray = [...array];
  newArray[index1] = newArray.splice(index2, 1, newArray[index1])[0];
  return newArray;
};

type RankingItemProps = {
  item: TransformedOption;
  index: number;
  allowNAForRanking: boolean;
  themeColor: string;
  onRankPress: (item: TransformedOption) => void;
  onNAPress: (item: TransformedOption) => void;
};

function RankingItem({
  item,
  index,
  allowNAForRanking,
  themeColor,
  onRankPress,
  onNAPress,
}: RankingItemProps) {
  const { fontColor, colorScheme } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;

  const { option, isNA } = item;
  const dragIconStyle = {
    tintColor: isDarkMode ? undefined : themeColor,
    opacity: isNA ? 0.3 : 1,
  };

  const hitSlop = { top: 12, bottom: 12, left: 5, right: 5 };
  const checkBoxStyle = { tintColor: themeColor };
  const naComponent = allowNAForRanking ? (
    <>
      <View style={styles.divider} />
      <TouchableOpacity
        style={GlobalStyle.row}
        hitSlop={hitSlop}
        onPress={() => onNAPress(item)}
      >
        {isNA ? (
          <Image
            style={checkBoxStyle}
            source={require('../assets/icCheckBoxRounded.png')}
          />
        ) : (
          <View
            style={[
              styles.unCheckBox,
              {
                borderColor: isDarkMode
                  ? Colors.rankingCheckBoxBorder
                  : themeColor ?? Colors.rankingCheckBoxBorder,
              },
            ]}
          />
        )}
        <Text style={[styles.naText, { color: fontColor }]}>{'N/A'}</Text>
      </TouchableOpacity>
    </>
  ) : null;

  const rankText = isNA ? 'NA' : `${index + 1}`;
  const renderItemStyle = isDarkMode
    ? {
        backgroundColor: Colors.rankingBGDark,
        borderColor: Colors.rankingBorderDark,
      }
    : {
        backgroundColor: themeColor
          ? addOpacityToColor(themeColor, 0.05)
          : Colors.rankingBGDark,
        borderColor: themeColor
          ? addOpacityToColor(themeColor, 0.1)
          : Colors.rankingBorderDark,
      };
  const rankingContainerStyle = isDarkMode
    ? {
        backgroundColor: Colors.rankingContainerBgDark,
        borderColor: Colors.rankingContainerBorderDark,
      }
    : {
        borderColor: themeColor
          ? addOpacityToColor(themeColor, 0.3)
          : Colors.rankingBorderDark,
      };
  return (
    <View style={[styles.renderItem, renderItemStyle]}>
      <Image style={dragIconStyle} source={require('../assets/icDrag.png')} />
      <Text style={[styles.rankTitle, { color: fontColor }]} numberOfLines={0}>
        {`${option}`}
      </Text>
      <TouchableOpacity
        style={[styles.rankingContainer, rankingContainerStyle]}
        hitSlop={hitSlop}
        disabled={isNA}
        onPress={() => onRankPress(item)}
      >
        <Text style={[styles.rankText, { color: fontColor }]}>{rankText}</Text>
        <Image source={require('../assets/ic-expand-more-24-px.png')} />
      </TouchableOpacity>
      {naComponent}
    </View>
  );
}

type Props = {
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  forgot: boolean;
  feedback: Feedback;
  themeColor: string;
};

const RankingQuestion = ({
  question,
  onFeedback,
  forgot,
  feedback,
  themeColor,
}: Props) => {
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;

  const dimensionWidthType = useDimensionWidthType();
  const isIPhone =
    Platform.OS === 'ios' && dimensionWidthType === DimensionWidthType.phone;

  const { questionId, options = [], allowNAForRanking = true } = question;

  const originListRef = useRef<TransformedOption[]>(
    options.map((option, index) => {
      return { option, index, isNA: false };
    })
  );

  const [list, setList] = useState(originListRef.current);

  const [normalList, setNormalList] = useState(list);
  const [naList, setNaList] = useState<TransformedOption[]>([]);

  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TransformedOption>();

  useEffect(() => {
    console.log('recalculate');

    setNormalList(list.filter((current) => !current.isNA));
    setNaList(list.filter((current) => current.isNA));
  }, [list]);

  useEffect(() => {
    const { listForRankingQuestion } = feedback ?? {};
    if (
      feedback &&
      listForRankingQuestion &&
      listForRankingQuestion.length > 0
    ) {
      let feedbackToOptions: TransformedOption[] = [];
      let feedbackToNAOptions: TransformedOption[] = [];
      listForRankingQuestion.forEach(({ option, isNA }, index) => {
        const newOption = { option, index, isNA };
        if (isNA) {
          feedbackToNAOptions = [...feedbackToNAOptions, newOption];
        } else {
          feedbackToOptions = [...feedbackToOptions, newOption];
        }
      });
      setList(listForRankingQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const answers: (number | string)[] = list.map(({ isNA, index }) => {
      return isNA ? 'N/A' : index;
    });
    const result = {
      questionId,
      answers,
      type: 'ranking',
      listForRankingQuestion: list, // for render usage after page navigations
    };
    // @ts-ignore
    onFeedback(result);
  }, [list, onFeedback, questionId]);

  const onRankPressHandler = (item: TransformedOption) => {
    setSelectedOption(item);
    isIPhone ? oniOSModal(item) : setVisible(true);
  };

  const onNAPressHandler = (item: TransformedOption) => {
    if (list) {
      item.isNA = !item.isNA;
      setList((prev) => {
        const withoutItem = prev.filter(({ option }) => option !== item.option);
        const normalList = withoutItem.filter((current) => !current.isNA);
        const naList = withoutItem.filter((current) => current.isNA);
        return item.isNA
          ? [...normalList, ...naList, item]
          : [...normalList, item, ...naList];
      });
    }
  };

  const oniOSModal = (selectedItem: TransformedOption) => {
    const actionSheetOptions = [
      'Cancel',
      ...normalList.map((_, index) => (index + 1).toString()),
      'N/A',
    ];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Select your rating',
        options: actionSheetOptions,
        tintColor: isDarkMode ? Colors.white : Colors.black,
        cancelButtonIndex: 0,
        // @ts-ignore
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return;
        } else if (buttonIndex === actionSheetOptions.length - 1) {
          onNAPressHandler(selectedItem);
        } else {
          setList((prev) => {
            // swap
            const currentIndex = prev.findIndex(
              ({ option }) => option === selectedItem.option
            );
            const index = buttonIndex - 1;
            const newList = swapElements(prev, index, currentIndex);
            return newList;
          });
        }
      }
    );
  };

  const rankingModal = (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalBG}>
        <TouchableOpacity
          style={styles.modalDismissArea}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{'Select your rating'}</Text>
            {normalList.map((_value, index) => {
              return (
                <View key={index}>
                  <View style={styles.modalDivider} />
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedOption) {
                        setList((prev) => {
                          // swap
                          const currentIndex = prev.findIndex(
                            ({ option }) => option === selectedOption.option
                          );
                          const newList = swapElements(
                            prev,
                            index,
                            currentIndex
                          );
                          return newList;
                        });
                        setVisible(false);
                      }
                    }}
                  >
                    <Text style={styles.modalTitle}>{`${index + 1}`}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            {allowNAForRanking ? (
              <TouchableOpacity
                onPress={() => {
                  if (selectedOption) {
                    onNAPressHandler(selectedOption);
                  }
                  setVisible(false);
                }}
              >
                <View style={styles.modalDivider} />
                <Text style={styles.modalTitle}>{'N/A'}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const renderItem: DraggableListRenderItem = ({
    item,
    index,
  }: RenderItemProps) => {
    return (
      <RankingItem
        item={item}
        index={index}
        allowNAForRanking={allowNAForRanking}
        themeColor={themeColor}
        onRankPress={onRankPressHandler}
        onNAPress={onNAPressHandler}
      />
    );
  };

  useEffect(() => {
    console.log('==== na list changed: ', naList);
  }, [naList]);

  return (
    <>
      <ScrollView style={styles.container} scrollEnabled={false}>
        <MandatoryTitle
          style={styles.mandatoryTitle}
          forgot={forgot}
          question={question}
        />
        {/* keep the ScrollView below to prevent error => "VirtualizedLists 
            should never be nested inside plain ScrollViews with the same 
            orientation because it can break windowing and other functionality
            - use another VirtualizedList-backed container instead" */}
        <ScrollView
          horizontal={true}
          scrollEnabled={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.questionContainer}>
            <DraggableList
              data={normalList}
              renderItem={renderItem}
              onDragEnd={(newList) => {
                setList((prev) => {
                  const localNAList = prev.filter((current) => current.isNA);
                  return [...newList, ...localNAList];
                });
              }}
            />
            <FlatList
              scrollEnabled={false}
              data={naList}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </ScrollView>
      {rankingModal}
    </>
  );
};

export default React.memo(RankingQuestion);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 43,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 54,
  },
  renderItem: {
    ...GlobalStyle.row,
    minHeight: 50,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.rankingBorder,
    paddingHorizontal: 12,
    backgroundColor: Colors.rankingBG,
    paddingVertical: 12,
  },
  rankTitle: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 15,
  },
  rankingContainer: {
    ...GlobalStyle.row,
    width: 53,
    height: 24,
    borderRadius: 4,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.rankingContainerBorder,
    paddingHorizontal: 7,
    justifyContent: 'space-between',
  },
  rankText: {
    fontSize: 15,
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: Colors.rankingBorder,
    marginHorizontal: 16,
  },
  naText: {
    fontSize: 13,
    marginLeft: 8,
  },
  unCheckBox: {
    width: 18,
    height: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#a8a8a8',
    borderRadius: 4,
    margin: 3,
  },
  modalBG: {
    ...GlobalStyle.row,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
  },
  modalContainer: {
    width: 268,
    backgroundColor: Colors.white,
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
  },
  modalTitle: {
    height: 24,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    color: Colors.white,
  },
  modalDivider: {
    backgroundColor: Colors.divider,
    height: 1,
  },
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  mandatoryTitle: {
    marginHorizontal: -23,
  },
  questionContainer: {
    width: '100%',
  },
  modalDismissArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
