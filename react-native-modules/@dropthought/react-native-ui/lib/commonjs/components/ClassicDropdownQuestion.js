"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _styles = _interopRequireWildcard(require("../styles"));

var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));

var _translation = _interopRequireDefault(require("../translation"));

var _BottomSheet = _interopRequireWildcard(require("./BottomSheet"));

var _ClassicDropdownOtherOptionInput = _interopRequireDefault(require("./ClassicDropdownOtherOptionInput"));

var _theme = require("../contexts/theme");

var _useDropdown = _interopRequireDefault(require("../hooks/useDropdown"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const windowHeight = _reactNative.Dimensions.get('window').height * 0.8;
const radioIconSource = {
  ic_radio_selected: require('../assets/radio-on.png'),
  ic_radio_unselected: require('../assets/radio-off.png')
};

const ClassicDropdownQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const {
    questionTitle
  } = question;
  const {
    fontColor,
    backgroundColor,
    colorScheme
  } = (0, _theme.useTheme)();
  const {
    selectedOptionIndexCache,
    setSelectedOptionIndexCache,
    currentSelectedOption,
    invalidMessage,
    bottomSheetVisible,
    optionLabel,
    renderList,
    otherText,
    onChangeOtherText,
    onChangeSearchText,
    onCloseBottomSheet,
    onOpenBottomSheet,
    onConfirm,
    onCancel
  } = (0, _useDropdown.default)(question, feedback, onFeedback);

  const renderItem = ({
    item
  }) => {
    const {
      title,
      index
    } = item;
    const isSelected = selectedOptionIndexCache === index;
    const icon = isSelected ? 'ic_radio_selected' : 'ic_radio_unselected';
    const iconStyle = [bottomSheetStyles.radioButton, {
      tintColor: isSelected ? themeColor : fontColor
    }];
    const containerStyle = [bottomSheetStyles.optionContainer, {
      borderColor: isSelected ? themeColor : backgroundColor,
      backgroundColor: isSelected ? (0, _styles.addOpacityToColor)(themeColor, 0.1) : undefined
    }];
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => setSelectedOptionIndexCache(index)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: containerStyle
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: iconStyle,
      source: radioIconSource[icon]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: bottomSheetStyles.optionLabel
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: {
        color: fontColor
      }
    }, title))));
  };

  const labelStyle = [styles.optionLabel, {
    color: fontColor
  }];
  const subTitleContainerStyle = [bottomSheetStyles.subTitleContainer, {
    backgroundColor: colorScheme === _theme.COLOR_SCHEMES.light ? _styles.Colors.contentBackground : _styles.Colors.rankingContainerBgDark
  }];
  const subTitleTextStyle = [bottomSheetStyles.subTitleText, {
    color: fontColor
  }];
  const flatListContainerStyle = {
    paddingBottom: 200
  };
  const searchInputStyle = [bottomSheetStyles.textInput, {
    color: fontColor
  }, rtl && _styles.default.textAlignRight];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: forgot,
    invalidMessage: invalidMessage,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.title
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.buttonContainer,
    onPress: onOpenBottomSheet
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: labelStyle
  }, optionLabel), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('../assets/ic-expand-more-24-px.png')
  }))), currentSelectedOption ? /*#__PURE__*/_react.default.createElement(_ClassicDropdownOtherOptionInput.default, {
    visible: currentSelectedOption.isOther,
    question: question,
    placeholder: currentSelectedOption.placeholder,
    value: otherText,
    onChangeText: onChangeOtherText,
    themeColor: themeColor
  }) : null, /*#__PURE__*/_react.default.createElement(_BottomSheet.default, {
    coverScreen: true,
    navigationComponent: /*#__PURE__*/_react.default.createElement(_BottomSheet.NavigationComponent, {
      backgroundColor: colorScheme === _theme.COLOR_SCHEMES.light ? themeColor : _styles.Colors.rankingBGDark,
      disableOnConfirm: selectedOptionIndexCache === undefined,
      onCancel: onCancel,
      onConfirm: onConfirm
    }),
    componentInside: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: subTitleContainerStyle
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: subTitleTextStyle
    }, questionTitle)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: bottomSheetStyles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [bottomSheetStyles.searchContainer, rtl && _styles.default.flexRowReverse]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: require('../assets/ic_search.png')
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      onChangeText: onChangeSearchText,
      placeholder: _translation.default.t('survey:find-Option'),
      placeholderTextColor: _styles.Colors.inputPlaceholder,
      style: searchInputStyle
    })), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      contentContainerStyle: flatListContainerStyle,
      data: renderList,
      showsVerticalScrollIndicator: false,
      renderItem: renderItem,
      keyExtractor: (_, index) => index.toString()
    }))),
    componentHeight: windowHeight,
    onBackdropPress: onCloseBottomSheet,
    visible: bottomSheetVisible
  }));
};

var _default = /*#__PURE__*/_react.default.memo(ClassicDropdownQuestion);

exports.default = _default;

const styles = _reactNative.StyleSheet.create({
  title: {
    marginBottom: 16
  },
  buttonContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: _styles.Colors.rankingContainerBorder,
    marginBottom: 16
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  optionLabel: {
    marginRight: 10,
    flex: 1
  }
});

const bottomSheetStyles = _reactNative.StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  subTitleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 24
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4
  },
  radioButton: {
    tintColor: 'blue'
  },
  optionLabel: {
    marginLeft: 10
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: _styles.Colors.borderColor,
    borderWidth: 1
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10
  }
});
//# sourceMappingURL=ClassicDropdownQuestion.js.map