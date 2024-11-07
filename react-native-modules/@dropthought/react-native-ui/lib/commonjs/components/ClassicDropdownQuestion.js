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
var _HtmlText = _interopRequireDefault(require("./HtmlText"));
var _htmlHelper = require("../utils/htmlHelper");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
      accessible: false,
      onPress: () => setSelectedOptionIndexCache(index)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: containerStyle
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: iconStyle,
      source: radioIconSource[icon]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: bottomSheetStyles.optionLabel
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      testID: "test:id/dropdown_item",
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
    accessible: false,
    style: styles.buttonContainer,
    onPress: onOpenBottomSheet
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    testID: `test:id/dropdown_selected_item_${fontColor}`,
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
    }, /*#__PURE__*/_react.default.createElement(_HtmlText.default, {
      html: (0, _htmlHelper.htmlTrim)((0, _htmlHelper.toHtml)(questionTitle))
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: bottomSheetStyles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [bottomSheetStyles.searchContainer, rtl && _styles.default.flexRowReverse]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: require('../assets/ic_search.png')
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      testID: "test:id/field_dropdown_search",
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
var _default = exports.default = /*#__PURE__*/_react.default.memo(ClassicDropdownQuestion);
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