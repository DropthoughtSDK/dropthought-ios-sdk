"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _useWindowDimensions = require("../hooks/useWindowDimensions");
var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));
var _styles = _interopRequireWildcard(require("../styles"));
var _theme = require("../contexts/theme");
var _DraggableList = _interopRequireDefault(require("../utils/react-native-draggable-list/DraggableList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const swapElements = (array, index1, index2) => {
  let newArray = [...array];
  // @ts-ignore
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
      borderColor: isDarkMode ? _styles.Colors.rankingCheckBoxBorder : themeColor ?? _styles.Colors.rankingCheckBoxBorder
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
const RankingQuestion = ({
  survey,
  question,
  onFeedback,
  forgot,
  feedback,
  themeColor
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
  const [list, setList] = (0, _react.useState)(() => {
    const {
      listForRankingQuestion
    } = feedback ?? {};
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
      return listForRankingQuestion;
    }
    return originListRef.current;
  });
  const [normalList, setNormalList] = (0, _react.useState)(list);
  const [visible, setVisible] = (0, _react.useState)(false);
  const [selectedOption, setSelectedOption] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    setNormalList(list.filter(current => !current.isNA));
  }, [list]);
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
    };
    // @ts-ignore
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
    backgroundColor: isDarkMode ? 'rgb(55,55,55)' : _styles.Colors.white
  }];
  const modalItemTitleStyle = [styles.modalItemTitle, {
    color: isDarkMode ? _styles.Colors.white : _styles.Colors.black
  }];
  const modalItemStyle = [styles.modalItem, {
    borderTopColor: isDarkMode ? 'rgba(17,17,17,0.5)' : _styles.Colors.divider
  }];
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
    style: modalContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalTitleContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.modalTitle
  }, 'Select your rating')), normalList.map((_value, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
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
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: modalItemTitleStyle
    }, `${index + 1}`)));
  }), allowNAForRanking ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: modalItemStyle,
    onPress: () => {
      if (selectedOption) {
        onNAPressHandler(selectedOption);
      }
      setVisible(false);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: modalItemTitleStyle
  }, 'N/A')) : null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: modalItemStyle,
    onPress: () => setVisible(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: modalItemTitleStyle
  }, 'Cancel'))))));
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
    setList(prev => {
      const result = newList.map(newData => {
        // @ts-ignore
        const {
          isNA
        } = prev.filter(({
          option
        }) => option === newData.option)[0];
        return {
          ...newData,
          isNA
        };
      });
      return result;
    });
  };
  const [scrollEnabled, setScrollEnabled] = (0, _react.useState)(true);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container,
    scrollEnabled: scrollEnabled
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    style: styles.title,
    forgot: forgot,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    question: question
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_DraggableList.default, {
    data: list,
    renderItem: renderItem,
    onDragStart: () => {},
    onDragGrant: () => {
      setScrollEnabled(false);
    },
    onDragRelease: () => {
      setScrollEnabled(true);
    },
    onDragEnd: onDragEndHandler
  }))), rankingModal);
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(RankingQuestion);
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginHorizontal: 16
  },
  renderItem: {
    ..._styles.default.row,
    minHeight: 50,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: _styles.Colors.rankingBorder,
    paddingHorizontal: 12,
    backgroundColor: _styles.Colors.rankingBG,
    paddingVertical: 12
  },
  rankTitle: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 15
  },
  rankingContainer: {
    ..._styles.default.row,
    width: 53,
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
  modalBG: {
    ..._styles.default.row,
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
    borderTopColor: _styles.Colors.divider,
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
    color: _styles.Colors.dateGrey
  },
  modalItemTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: _styles.Colors.black
  },
  scrollViewContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  questionContainer: {
    width: '100%',
    paddingHorizontal: 43
  },
  modalDismissArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=RankingQuestion.js.map