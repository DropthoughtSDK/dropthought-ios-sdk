"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _useWindowDimensions = require("../hooks/useWindowDimensions");

var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));

var _styles = _interopRequireWildcard(require("../styles"));

var _theme = require("../contexts/theme");

var _DraggableList = _interopRequireDefault(require("../utils/react-native-draggable-list/DraggableList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  } = (0, _theme.useTheme)();
  const isDarkMode = colorScheme === _theme.COLOR_SCHEMES.dark;
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
  const naComponent = allowNAForRanking ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.divider
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: _styles.default.row,
    hitSlop: hitSlop,
    onPress: () => onNAPress(item)
  }, isNA ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: checkBoxStyle,
    source: require('../assets/icCheckBoxRounded.png')
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.unCheckBox, {
      borderColor: isDarkMode ? _styles.Colors.rankingCheckBoxBorder : themeColor !== null && themeColor !== void 0 ? themeColor : _styles.Colors.rankingCheckBoxBorder
    }]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.naText, {
      color: fontColor
    }]
  }, 'N/A'))) : null;
  const rankText = isNA ? 'NA' : `${index + 1}`;
  const renderItemStyle = isDarkMode ? {
    backgroundColor: _styles.Colors.rankingBGDark,
    borderColor: _styles.Colors.rankingBorderDark
  } : {
    backgroundColor: themeColor ? (0, _styles.addOpacityToColor)(themeColor, 0.05) : _styles.Colors.rankingBGDark,
    borderColor: themeColor ? (0, _styles.addOpacityToColor)(themeColor, 0.1) : _styles.Colors.rankingBorderDark
  };
  const rankingContainerStyle = isDarkMode ? {
    backgroundColor: _styles.Colors.rankingContainerBgDark,
    borderColor: _styles.Colors.rankingContainerBorderDark
  } : {
    borderColor: themeColor ? (0, _styles.addOpacityToColor)(themeColor, 0.3) : _styles.Colors.rankingBorderDark
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.renderItem, renderItemStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: dragIconStyle,
    source: require('../assets/icDrag.png')
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.rankTitle, {
      color: fontColor
    }],
    numberOfLines: 0
  }, `${option}`), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.rankingContainer, rankingContainerStyle],
    hitSlop: hitSlop,
    disabled: isNA,
    onPress: () => onRankPress(item)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.rankText, {
      color: fontColor
    }]
  }, rankText), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
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
  } = (0, _theme.useTheme)();
  const isDarkMode = colorScheme === _theme.COLOR_SCHEMES.dark;
  const dimensionWidthType = (0, _useWindowDimensions.useDimensionWidthType)();
  const isIPhone = _reactNative.Platform.OS === 'ios' && dimensionWidthType === _useWindowDimensions.DimensionWidthType.phone;
  const {
    questionId,
    options = [],
    allowNAForRanking = true
  } = question;
  const originListRef = (0, _react.useRef)(options.map((option, index) => {
    return {
      option,
      index,
      isNA: false
    };
  }));
  const [list, setList] = (0, _react.useState)(originListRef.current);
  const [normalList, setNormalList] = (0, _react.useState)(list);
  const [visible, setVisible] = (0, _react.useState)(false);
  const [selectedOption, setSelectedOption] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    setNormalList(list.filter(current => !current.isNA));
  }, [list]);
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
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
    const actionSheetOptions = ['Cancel', ...normalList.map((_, index) => (index + 1).toString()), 'N/A'];

    _reactNative.ActionSheetIOS.showActionSheetWithOptions({
      title: 'Select your rating',
      options: actionSheetOptions,
      tintColor: isDarkMode ? _styles.Colors.white : _styles.Colors.black,
      cancelButtonIndex: 0,
      // @ts-ignore
      userInterfaceStyle: colorScheme
    }, buttonIndex => {
      if (buttonIndex === 0) {
        return;
      } else if (buttonIndex === actionSheetOptions.length - 1) {
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

  const rankingModal = /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    transparent: true,
    animationType: "fade",
    visible: visible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalBG
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.modalDismissArea,
    onPress: () => setVisible(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.modalTitle
  }, 'Select your rating'), normalList.map((_value, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.modalDivider
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
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
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.modalTitle
    }, `${index + 1}`)));
  }), allowNAForRanking ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => {
      if (selectedOption) {
        onNAPressHandler(selectedOption);
      }

      setVisible(false);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalDivider
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.modalTitle
  }, 'N/A')) : null))));

  const renderItem = ({
    item,
    index
  }) => {
    return /*#__PURE__*/_react.default.createElement(RankingItem, {
      item: item,
      index: index,
      allowNAForRanking: allowNAForRanking,
      themeColor: themeColor,
      onRankPress: onRankPressHandler,
      onNAPress: onNAPressHandler
    });
  };

  const onDragEndHandler = newList => {
    onDragEnd && onDragEnd();
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

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container,
    scrollEnabled: false
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    style: styles.mandatoryTitle,
    forgot: forgot,
    question: question
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    horizontal: true,
    scrollEnabled: false,
    contentContainerStyle: styles.scrollViewContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_DraggableList.default, {
    data: list,
    renderItem: renderItem,
    onDragStart: () => {
      console.log('start');
      onDragStart && onDragStart();
    },
    onDragEnd: onDragEndHandler
  })))), rankingModal);
};

var _default = /*#__PURE__*/_react.default.memo(ClassicRankingQuestion);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45
  },
  renderItem: { ..._styles.default.row,
    height: 48,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: _styles.Colors.rankingBorder,
    paddingHorizontal: 12,
    backgroundColor: _styles.Colors.rankingBG
  },
  rankTitle: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 15
  },
  rankingContainer: { ..._styles.default.row,
    width: 50,
    height: 24,
    borderRadius: 4,
    backgroundColor: _styles.Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: _styles.Colors.rankingContainerBorder,
    paddingHorizontal: 7,
    justifyContent: 'space-between'
  },
  rankText: {
    fontSize: 15
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: _styles.Colors.rankingBorder,
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
  modalBG: { ..._styles.default.row,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.24)'
  },
  modalContainer: {
    width: 268,
    backgroundColor: _styles.Colors.white,
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowRadius: 16,
    shadowOpacity: 1
  },
  modalTitle: {
    height: 24,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500'
  },
  modalDivider: {
    backgroundColor: _styles.Colors.divider,
    height: 1
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