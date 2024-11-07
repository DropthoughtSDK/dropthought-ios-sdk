import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import type { TransformOptionType } from '../utils/data';
import GlobalStyle, { Colors, addOpacityToColor } from '../styles';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import i18n from '../translation';
import type { Question, Feedback } from '../data';
import BottomSheet, { NavigationComponent } from './BottomSheet';
import ClassicDropdownOtherOptionInput from './ClassicDropdownOtherOptionInput';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';
import useDropdown from '../hooks/useDropdown';
import HtmlText from './HtmlText';
import { htmlTrim, toHtml } from '../utils/htmlHelper';

const windowHeight = Dimensions.get('window').height * 0.8;

const radioIconSource = {
  ic_radio_selected: require('../assets/radio-on.png'),
  ic_radio_unselected: require('../assets/radio-off.png'),
};

type Props = {
  mandatoryErrorMessage: string;
  anonymous: boolean;
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  feedback: Feedback;
  forgot: boolean;
  themeColor: string;
};

const ClassicDropdownQuestion = ({
  mandatoryErrorMessage,
  question,
  onFeedback,
  feedback,
  forgot,
  themeColor,
}: Props) => {
  const rtl = i18n.dir() === 'rtl';
  const { questionTitle } = question;
  const { fontColor, backgroundColor, colorScheme } = useTheme();
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
    onCancel,
  } = useDropdown(question, feedback, onFeedback);

  const renderItem: ListRenderItem<TransformOptionType> = ({ item }) => {
    const { title, index } = item;

    const isSelected = selectedOptionIndexCache === index;
    const icon = isSelected ? 'ic_radio_selected' : 'ic_radio_unselected';
    const iconStyle = [
      bottomSheetStyles.radioButton,
      {
        tintColor: isSelected ? themeColor : fontColor,
      },
    ];
    const containerStyle = [
      bottomSheetStyles.optionContainer,
      {
        borderColor: isSelected ? themeColor : backgroundColor,
        backgroundColor: isSelected
          ? addOpacityToColor(themeColor, 0.1)
          : undefined,
      },
    ];
    return (
      <TouchableOpacity
        accessible={false}
        onPress={() => setSelectedOptionIndexCache(index)}
      >
        <View style={containerStyle}>
          <Image style={iconStyle} source={radioIconSource[icon]} />
          <View style={bottomSheetStyles.optionLabel}>
            <Text testID="test:id/dropdown_item" style={{ color: fontColor }}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const labelStyle = [styles.optionLabel, { color: fontColor }];
  const subTitleContainerStyle = [
    bottomSheetStyles.subTitleContainer,
    {
      backgroundColor:
        colorScheme === COLOR_SCHEMES.light
          ? Colors.contentBackground
          : Colors.rankingContainerBgDark,
    },
  ];
  const flatListContainerStyle = { paddingBottom: 200 };
  const searchInputStyle = [
    bottomSheetStyles.textInput,
    { color: fontColor },
    rtl && GlobalStyle.textAlignRight,
  ];

  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        forgot={forgot}
        invalidMessage={invalidMessage}
        mandatoryErrorMessage={mandatoryErrorMessage}
        question={question}
        style={styles.title}
      />
      <TouchableOpacity
        accessible={false}
        style={styles.buttonContainer}
        onPress={onOpenBottomSheet}
      >
        <View style={styles.buttonContent}>
          <Text
            testID={`test:id/dropdown_selected_item_${fontColor}`}
            style={labelStyle}
          >
            {optionLabel}
          </Text>
          <Image source={require('../assets/ic-expand-more-24-px.png')} />
        </View>
      </TouchableOpacity>
      {currentSelectedOption ? (
        <ClassicDropdownOtherOptionInput
          visible={currentSelectedOption.isOther}
          question={question}
          placeholder={currentSelectedOption.placeholder}
          value={otherText}
          onChangeText={onChangeOtherText}
          themeColor={themeColor}
        />
      ) : null}
      <BottomSheet
        coverScreen
        navigationComponent={
          <NavigationComponent
            backgroundColor={
              colorScheme === COLOR_SCHEMES.light
                ? themeColor
                : Colors.rankingBGDark
            }
            disableOnConfirm={selectedOptionIndexCache === undefined}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        }
        componentInside={
          <>
            <View style={subTitleContainerStyle}>
              <HtmlText html={htmlTrim(toHtml(questionTitle))} />
            </View>
            <View style={bottomSheetStyles.content}>
              <View
                style={[
                  bottomSheetStyles.searchContainer,
                  rtl && GlobalStyle.flexRowReverse,
                ]}
              >
                <Image source={require('../assets/ic_search.png')} />
                <TextInput
                  testID="test:id/field_dropdown_search"
                  onChangeText={onChangeSearchText}
                  placeholder={i18n.t('survey:find-Option')}
                  placeholderTextColor={Colors.inputPlaceholder}
                  style={searchInputStyle}
                />
              </View>
              <FlatList
                contentContainerStyle={flatListContainerStyle}
                data={renderList}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          </>
        }
        componentHeight={windowHeight}
        onBackdropPress={onCloseBottomSheet}
        visible={bottomSheetVisible}
      />
    </View>
  );
};

export default React.memo(ClassicDropdownQuestion);

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.rankingContainerBorder,
    marginBottom: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  optionLabel: {
    marginRight: 10,
    flex: 1,
  },
});

const bottomSheetStyles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  subTitleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  radioButton: {
    tintColor: 'blue',
  },
  optionLabel: {
    marginLeft: 10,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
  },
});
