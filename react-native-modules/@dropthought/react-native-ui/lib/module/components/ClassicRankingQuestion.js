import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, ScrollView, ActionSheetIOS, Platform } from 'react-native';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import DraggableList from '../utils/react-native-draggable-list/DraggableList';

const swapElements = (array, index1, index2) => {
  let newArray = [...array];
  newArray[index1] = newArray.splice(index2, 1, newArray[index1])[0];
  return newArray;
};

function RankingItem({
  item,
  index,
  allowNAForRanking,
  themeColor,
  onRankPress,
  onNAPress
}) {
  const {
    fontColor,
    colorScheme
  } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const {
    option,
    isNA
  } = item;
  const dragIconStyle = {
    tintColor: isDarkMode ? undefined : themeColor,
    opacity: isNA ? 0.3 : 1
  };
  const hitSlop = {
    top: 12,
    bottom: 12,
    left: 5,
    right: 5
  };
  const checkBoxStyle = {
    tintColor: themeColor
  };
  const naComponent = allowNAForRanking ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.divider
  }), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: GlobalStyle.row,
    hitSlop: hitSlop,
    onPress: () => onNAPress(item)
  }, isNA ? /*#__PURE__*/React.createElement(Image, {
    style: checkBoxStyle,
    source: require('../assets/icCheckBoxRounded.png')
  }) : /*#__PURE__*/React.createElement(View, {
    style: [styles.unCheckBox, {
      borderColor: isDarkMode ? Colors.rankingCheckBoxBorder : themeColor !== null && themeColor !== void 0 ? themeColor : Colors.rankingCheckBoxBorder
    }]
  }), /*#__PURE__*/React.createElement(Text, {
    style: [styles.naText, {
      color: fontColor
    }]
  }, 'N/A'))) : null;
  const rankText = isNA ? 'NA' : `${index + 1}`;
  const renderItemStyle = isDarkMode ? {
    backgroundColor: Colors.rankingBGDark,
    borderColor: Colors.rankingBorderDark
  } : {
    backgroundColor: themeColor ? addOpacityToColor(themeColor, 0.05) : Colors.rankingBGDark,
    borderColor: themeColor ? addOpacityToColor(themeColor, 0.1) : Colors.rankingBorderDark
  };
  const rankingContainerStyle = isDarkMode ? {
    backgroundColor: Colors.rankingContainerBgDark,
    borderColor: Colors.rankingContainerBorderDark
  } : {
    borderColor: themeColor ? addOpacityToColor(themeColor, 0.3) : Colors.rankingBorderDark
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.renderItem, renderItemStyle]
  }, /*#__PURE__*/React.createElement(Image, {
    style: dragIconStyle,
    source: require('../assets/icDrag.png')
  }), /*#__PURE__*/React.createElement(Text, {
    style: [styles.rankTitle, {
      color: fontColor
    }],
    numberOfLines: 0
  }, `${option}`), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.rankingContainer, rankingContainerStyle],
    hitSlop: hitSlop,
    disabled: isNA,
    onPress: () => onRankPress(item)
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.rankText, {
      color: fontColor
    }]
  }, rankText), /*#__PURE__*/React.createElement(Image, {
    source: require('../assets/ic-expand-more-24-px.png')
  })), naComponent);
}

const ClassicRankingQuestion = ({
  question,
  onFeedback,
  forgot,
  feedback,
  themeColor,
  onDragStart,
  onDragEnd
}) => {
  const {
    colorScheme
  } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const dimensionWidthType = useDimensionWidthType();
  const isIPhone = Platform.OS === 'ios' && dimensionWidthType === DimensionWidthType.phone;
  const {
    questionId,
    options = [],
    allowNAForRanking = true
  } = question;
  const originListRef = useRef(options.map((option, index) => {
    return {
      option,
      index,
      isNA: false
    };
  }));
  const [list, setList] = useState(originListRef.current);
  const [normalList, setNormalList] = useState(list);
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  useEffect(() => {
    setNormalList(list.filter(current => !current.isNA));
  }, [list]);
  useEffect(() => {
    const {
      listForRankingQuestion
    } = feedback !== null && feedback !== void 0 ? feedback : {};

    if (feedback && listForRankingQuestion && listForRankingQuestion.length > 0) {
      let feedbackToOptions = [];
      let feedbackToNAOptions = [];
      listForRankingQuestion.forEach(({
        option,
        isNA
      }, index) => {
        const newOption = {
          option,
          index,
          isNA
        };

        if (isNA) {
          feedbackToNAOptions = [...feedbackToNAOptions, newOption];
        } else {
          feedbackToOptions = [...feedbackToOptions, newOption];
        }
      });
      setList(listForRankingQuestion);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  useEffect(() => {
    const answers = list.map(({
      isNA,
      index
    }) => {
      return isNA ? 'N/A' : index;
    });
    const result = {
      questionId,
      answers,
      type: 'ranking',
      listForRankingQuestion: list // for render usage after page navigations

    }; // @ts-ignore

    onFeedback(result);
  }, [list, onFeedback, questionId]);

  const onRankPressHandler = item => {
    setSelectedOption(item);
    isIPhone ? oniOSModal(item) : setVisible(true);
  };

  const onNAPressHandler = item => {
    if (list) {
      item.isNA = !item.isNA;
      setList(prev => {
        const withoutItem = prev.filter(({
          option
        }) => option !== item.option);
        const localNormalList = withoutItem.filter(current => !current.isNA);
        const localNaList = withoutItem.filter(current => current.isNA);
        return item.isNA ? [...localNormalList, ...localNaList, item] : [...localNormalList, item, ...localNaList];
      });
    }
  };

  const oniOSModal = selectedItem => {
    let actionSheetOptions = ['Cancel', ...normalList.map((_, index) => (index + 1).toString())];

    if (allowNAForRanking) {
      actionSheetOptions = [...actionSheetOptions, 'N/A'];
    }

    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Select your rating',
      options: actionSheetOptions,
      tintColor: isDarkMode ? Colors.white : Colors.black,
      cancelButtonIndex: 0,
      // @ts-ignore
      userInterfaceStyle: colorScheme
    }, buttonIndex => {
      if (buttonIndex === 0) {
        return;
      } else if (allowNAForRanking && buttonIndex === actionSheetOptions.length - 1) {
        onNAPressHandler(selectedItem);
      } else {
        setList(prev => {
          // swap
          const currentIndex = prev.findIndex(({
            option
          }) => option === selectedItem.option);
          const index = buttonIndex - 1;
          const newList = swapElements(prev, index, currentIndex);
          return newList;
        });
      }
    });
  };

  const modalContainerStyle = [styles.modalContainer, {
    backgroundColor: isDarkMode ? 'rgb(55,55,55)' : Colors.white
  }];
  const modalItemTitleStyle = [styles.modalItemTitle, {
    color: isDarkMode ? Colors.white : Colors.black
  }];
  const modalItemStyle = [styles.modalItem, {
    borderTopColor: isDarkMode ? 'rgba(17,17,17,0.5)' : Colors.divider
  }];
  const rankingModal = /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    animationType: "fade",
    visible: visible
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalBG
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.modalDismissArea,
    onPress: () => setVisible(false)
  }, /*#__PURE__*/React.createElement(View, {
    style: modalContainerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalTitleContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.modalTitle
  }, 'Select your rating')), normalList.map((_value, index) => {
    return /*#__PURE__*/React.createElement(View, {
      key: index
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: modalItemStyle,
      onPress: () => {
        if (selectedOption) {
          setList(prev => {
            // swap
            const currentIndex = prev.findIndex(({
              option
            }) => option === selectedOption.option);
            const newList = swapElements(prev, index, currentIndex);
            return newList;
          });
          setVisible(false);
        }
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: modalItemTitleStyle
    }, `${index + 1}`)));
  }), allowNAForRanking ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: modalItemStyle,
    onPress: () => {
      if (selectedOption) {
        onNAPressHandler(selectedOption);
      }

      setVisible(false);
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: modalItemTitleStyle
  }, 'N/A')) : null, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: modalItemStyle,
    onPress: () => setVisible(false)
  }, /*#__PURE__*/React.createElement(Text, {
    style: modalItemTitleStyle
  }, 'Cancel'))))));

  const renderItem = ({
    item,
    index
  }) => {
    return /*#__PURE__*/React.createElement(RankingItem, {
      item: item,
      index: index,
      allowNAForRanking: allowNAForRanking,
      themeColor: themeColor,
      onRankPress: onRankPressHandler,
      onNAPress: onNAPressHandler
    });
  };

  const onDragEndHandler = newList => {
    setList(prev => {
      const result = newList.map(newData => {
        const {
          isNA
        } = prev.filter(({
          option
        }) => option === newData.option)[0];
        return { ...newData,
          isNA
        };
      });
      return result;
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container,
    scrollEnabled: false
  }, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    style: styles.mandatoryTitle,
    forgot: forgot,
    question: question
  }), /*#__PURE__*/React.createElement(ScrollView, {
    horizontal: true,
    scrollEnabled: false,
    contentContainerStyle: styles.scrollViewContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.questionContainer
  }, /*#__PURE__*/React.createElement(DraggableList, {
    data: list,
    renderItem: renderItem,
    onDragStart: () => {
      console.log('start');
      onDragStart && onDragStart();
    },
    onDragRelease: onDragEnd,
    onDragEnd: onDragEndHandler
  })))), rankingModal);
};

export default /*#__PURE__*/React.memo(ClassicRankingQuestion);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45
  },
  renderItem: { ...GlobalStyle.row,
    height: 48,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.rankingBorder,
    paddingHorizontal: 12,
    backgroundColor: Colors.rankingBG
  },
  rankTitle: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 15
  },
  rankingContainer: { ...GlobalStyle.row,
    width: 50,
    height: 24,
    borderRadius: 4,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.rankingContainerBorder,
    paddingHorizontal: 7,
    justifyContent: 'space-between'
  },
  rankText: {
    fontSize: 15
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: Colors.rankingBorder,
    marginHorizontal: 16
  },
  naText: {
    fontSize: 13,
    marginLeft: 8
  },
  unCheckBox: {
    width: 18,
    height: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#a8a8a8',
    borderRadius: 4,
    margin: 3
  },
  modalBG: { ...GlobalStyle.row,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.24)'
  },
  modalContainer: {
    width: 268,
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowRadius: 16,
    shadowOpacity: 1
  },
  modalItem: {
    paddingVertical: 10,
    borderTopColor: Colors.divider,
    borderTopWidth: 1
  },
  modalTitleContainer: {
    paddingVertical: 10,
    minHeight: 50,
    justifyContent: 'center'
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dateGrey
  },
  modalItemTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: Colors.black
  },
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  mandatoryTitle: {
    marginBottom: 12
  },
  questionContainer: {
    width: '100%'
  },
  modalDismissArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=ClassicRankingQuestion.js.map