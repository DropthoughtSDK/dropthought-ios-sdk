"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _KeyboardAvoidingView = require("./KeyboardAvoidingView");
var _styles = _interopRequireWildcard(require("../styles"));
var _MandatoryTitle = _interopRequireDefault(require("./MandatoryTitle"));
var _translation = _interopRequireDefault(require("../translation"));
var _BottomSheet = _interopRequireWildcard(require("./BottomSheet"));
var _DropdownOtherOptionInput = _interopRequireDefault(require("./DropdownOtherOptionInput"));
var _theme = require("../contexts/theme");
var _useDropdown = _interopRequireDefault(require("../hooks/useDropdown"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore

const ScrollView = _reactNative.Platform.OS === 'ios' ? _KeyboardAvoidingView.KeyboardAvoidingScrollView : _reactNative.ScrollView;
const windowHeight = _reactNative.Dimensions.get('window').height * 0.8;
const radioIconSource = {
  ic_radio_selected: require('../assets/radio-on.png'),
  ic_radio_unselected: require('../assets/radio-off.png')
};
const DropdownQuestion = ({
  survey,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor
}) => {
  const rtl = _translation.default.dir() === 'rtl';
  const {
    questionTitlePlain
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
    const iconStyle = [{
      tintColor: colorScheme === _theme.COLOR_SCHEMES.dark ? isSelected ? themeColor : (0, _styles.addOpacityToColor)(_styles.Colors.appearanceSubBlack, 0.4) : themeColor
    }];
    const containerStyle = [bottomSheetStyles.optionContainer, {
      borderColor: isSelected ? themeColor : backgroundColor,
      backgroundColor: isSelected ? (0, _styles.addOpacityToColor)(themeColor, 0.1) : colorScheme === _theme.COLOR_SCHEMES.dark ? (0, _styles.addOpacityToColor)(_styles.Colors.appearanceSubBlack, 0.05) : (0, _styles.addOpacityToColor)(themeColor, 0.05)
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
      style: [bottomSheetStyles.optionText, {
        color: fontColor
      }]
    }, title)), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: bottomSheetStyles.opacity0,
      source: radioIconSource[icon]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null)));
  };
  const buttonContainerStyle = colorScheme === _theme.COLOR_SCHEMES.light ? {
    borderWidth: 1
  } : {
    backgroundColor: (0, _styles.addOpacityToColor)(_styles.Colors.appearanceSubBlack, 0.08)
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
  return /*#__PURE__*/_react.default.createElement(ScrollView, {
    extraAvoidingSpace: 30,
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_MandatoryTitle.default, {
    forgot: forgot,
    invalidMessage: invalidMessage,
    mandatoryErrorMessage: survey.mandatoryErrorMessage,
    question: question,
    style: styles.title
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.buttonContainer, buttonContainerStyle],
    onPress: onOpenBottomSheet
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: labelStyle
  }, optionLabel), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('../assets/ic-expand-more-24-px.png')
  }))), currentSelectedOption ? /*#__PURE__*/_react.default.createElement(_DropdownOtherOptionInput.default, {
    visible: currentSelectedOption.isOther,
    question: question,
    placeholder: currentSelectedOption.placeholder,
    value: otherText,
    onChangeText: onChangeOtherText,
    themeColor: themeColor
  }) : null), /*#__PURE__*/_react.default.createElement(_BottomSheet.default, {
    coverScreen: true,
    navigationComponent: /*#__PURE__*/_react.default.createElement(_BottomSheet.NavigationComponent, {
      backgroundColor: colorScheme === _theme.COLOR_SCHEMES.light ? themeColor : backgroundColor,
      disableOnConfirm: selectedOptionIndexCache === undefined,
      onCancel: onCancel,
      onConfirm: onConfirm
    }),
    componentInside: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: subTitleContainerStyle
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: subTitleTextStyle
    }, questionTitlePlain)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
var _default = exports.default = /*#__PURE__*/_react.default.memo(DropdownQuestion);
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    ..._styles.default.questionContainer,
    ..._styles.default.flex1
  },
  content: {
    marginTop: 140
  },
  title: {
    marginBottom: 16
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
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
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20
  },
  optionLabel: {
    flex: 1
  },
  optionText: {
    textAlign: 'center'
  },
  opacity0: {
    opacity: 0
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: (0, _styles.addOpacityToColor)(_styles.Colors.borderColor, 0.15),
    borderWidth: 1,
    backgroundColor: (0, _styles.addOpacityToColor)(_styles.Colors.appearanceSubBlack, 0.15)
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10
  }
});
//# sourceMappingURL=DropdownQuestion.js.map