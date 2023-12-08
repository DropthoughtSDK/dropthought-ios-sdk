import React from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import i18n from '../translation';
import BottomSheet, { NavigationComponent } from './BottomSheet';
import ClassicDropdownOtherOptionInput from './ClassicDropdownOtherOptionInput';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import useDropdown from '../hooks/useDropdown';
const windowHeight = Dimensions.get('window').height * 0.8;
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
  const rtl = i18n.dir() === 'rtl';
  const {
    questionTitle
  } = question;
  const {
    fontColor,
    backgroundColor,
    colorScheme
  } = useTheme();
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
  } = useDropdown(question, feedback, onFeedback);

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
      backgroundColor: isSelected ? addOpacityToColor(themeColor, 0.1) : undefined
    }];
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => setSelectedOptionIndexCache(index)
    }, /*#__PURE__*/React.createElement(View, {
      style: containerStyle
    }, /*#__PURE__*/React.createElement(Image, {
      style: iconStyle,
      source: radioIconSource[icon]
    }), /*#__PURE__*/React.createElement(View, {
      style: bottomSheetStyles.optionLabel
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        color: fontColor
      }
    }, title))));
  };

  const labelStyle = [styles.optionLabel, {
    color: fontColor
  }];
  const subTitleContainerStyle = [bottomSheetStyles.subTitleContainer, {
    backgroundColor: colorScheme === COLOR_SCHEMES.light ? Colors.contentBackground : Colors.rankingContainerBgDark
  }];
  const subTitleTextStyle = [bottomSheetStyles.subTitleText, {
    color: fontColor
  }];
  const flatListContainerStyle = {
    paddingBottom: 200
  };
  const searchInputStyle = [bottomSheetStyles.textInput, {
    color: fontColor
  }, rtl && GlobalStyle.textAlignRight];
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    forgot: forgot,
    invalidMessage: invalidMessage,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.title
  }), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.buttonContainer,
    onPress: onOpenBottomSheet
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContent
  }, /*#__PURE__*/React.createElement(Text, {
    style: labelStyle
  }, optionLabel), /*#__PURE__*/React.createElement(Image, {
    source: require('../assets/ic-expand-more-24-px.png')
  }))), currentSelectedOption ? /*#__PURE__*/React.createElement(ClassicDropdownOtherOptionInput, {
    visible: currentSelectedOption.isOther,
    question: question,
    placeholder: currentSelectedOption.placeholder,
    value: otherText,
    onChangeText: onChangeOtherText,
    themeColor: themeColor
  }) : null, /*#__PURE__*/React.createElement(BottomSheet, {
    coverScreen: true,
    navigationComponent: /*#__PURE__*/React.createElement(NavigationComponent, {
      backgroundColor: colorScheme === COLOR_SCHEMES.light ? themeColor : Colors.rankingBGDark,
      disableOnConfirm: selectedOptionIndexCache === undefined,
      onCancel: onCancel,
      onConfirm: onConfirm
    }),
    componentInside: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: subTitleContainerStyle
    }, /*#__PURE__*/React.createElement(Text, {
      style: subTitleTextStyle
    }, questionTitle)), /*#__PURE__*/React.createElement(View, {
      style: bottomSheetStyles.content
    }, /*#__PURE__*/React.createElement(View, {
      style: [bottomSheetStyles.searchContainer, rtl && GlobalStyle.flexRowReverse]
    }, /*#__PURE__*/React.createElement(Image, {
      source: require('../assets/ic_search.png')
    }), /*#__PURE__*/React.createElement(TextInput, {
      onChangeText: onChangeSearchText,
      placeholder: i18n.t('survey:find-Option'),
      placeholderTextColor: Colors.inputPlaceholder,
      style: searchInputStyle
    })), /*#__PURE__*/React.createElement(FlatList, {
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

export default /*#__PURE__*/React.memo(ClassicDropdownQuestion);
const styles = StyleSheet.create({
  title: {
    marginBottom: 16
  },
  buttonContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.rankingContainerBorder,
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
const bottomSheetStyles = StyleSheet.create({
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
    borderColor: Colors.borderColor,
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