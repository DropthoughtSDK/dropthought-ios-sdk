import React, { useRef } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

import GlobalStyle, { Colors } from '../styles';
import i18n from '../translation';
import {
  metadataTypeKeyboard,
  metadataTypeAutoCapitalize,
} from './ClassicOpenQuestion';
import MetadataDesc from './MetadataDesc';
import type { Question } from '../data';
import { useTheme } from '../contexts/theme';

type Props = {
  visible: boolean;
  question: Question;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  themeColor: string;
};

const useFocus = (onBlur: () => void, onFocus: () => void) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const onFocusHandler = React.useCallback(() => {
    onFocus && onFocus();
    setIsFocused(true);
  }, [onFocus]);
  const onBlurHandler = React.useCallback(() => {
    onBlur && onBlur();
    setIsFocused(false);
  }, [onBlur]);
  return {
    isFocused,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
  };
};

const ClassicDropdownOtherOptionInput: React.FC<Props> = ({
  visible,
  question,
  placeholder,
  value,
  onChangeText,
  themeColor,
}) => {
  const rtl = i18n.dir() === 'rtl';
  const inputRef = useRef(null);
  const { fontColor } = useTheme();

  const onFocusHandler = () => {};
  const onBlurHandler = () => {};
  const { isFocused, ...focusProps } = useFocus(onBlurHandler, onFocusHandler);

  const inputTextBorderStyle = isFocused
    ? { borderColor: themeColor }
    : undefined;
  const inputTextColorStyle = { color: fontColor };

  if (!visible) return null;
  return (
    <>
      <MetadataDesc question={question} rtl={rtl} />
      <View
        style={[styles.textInputContainer, rtl && GlobalStyle.flexRowReverse]}
      >
        <TextInput
          testID="test:id/field_dropdown_other"
          ref={inputRef}
          style={[
            styles.textInput,
            rtl && GlobalStyle.textAlignRight,
            inputTextBorderStyle,
            inputTextColorStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.inputPlaceholder}
          multiline
          onChangeText={onChangeText}
          underlineColorAndroid={Colors.transparent}
          selectionColor={themeColor}
          value={value}
          maxLength={100}
          keyboardType={metadataTypeKeyboard(question.metaDataType)}
          autoCapitalize={metadataTypeAutoCapitalize(question.metaDataType)}
          {...focusProps}
        />
      </View>
      <Text
        testID="test:id/dropdown_text_length"
        style={[styles.descText, rtl && GlobalStyle.textAlignLeft]}
      >
        {value.length}/100
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    height: 80,
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.rankingContainerBorder,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
  descText: {
    color: Colors.openQuestionSubTitle,
    textAlign: 'right',
    width: '100%',
    marginTop: 6,
  },
});

export default ClassicDropdownOtherOptionInput;
