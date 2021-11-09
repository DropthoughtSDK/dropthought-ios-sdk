/**
 * @description Option with a TextInput, this is for other option in multi-choice/single-choice question
 */
import * as React from 'react';
import { StyleSheet, TextInput, View, Text, Platform } from 'react-native';

import GlobalStyles, { Colors, QuestionContentTextSize } from '../styles';
import i18n from '../translation';
import OptionWithHighlight, {
  Props as OptionWithHighlightProps,
} from './OptionWithHighlight';
import { useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme } from '../contexts/theme';

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

type Props = OptionWithHighlightProps & {
  textValue: string | undefined;
  onChangeValue: (
    id: any,
    value: { checked: boolean; value: string | undefined }
  ) => void;
};

function OtherOptionWithHighlightProps(props: Props) {
  const { id, checked, textValue, onChangeValue, checkedColor } = props;
  const { fontColor } = useTheme();

  const dimensionWidthType = useDimensionWidthType();
  const inputRef = React.useRef<TextInput>(null);

  // return checked as true when focus
  const onFocusHandler = () => {
    onChangeValue(id, {
      value: textValue,
      checked: true,
    });
  };

  // return checked as false, if the textValue is empty
  const onBlurHandler = () => {
    if (!textValue || textValue.trim().length <= 0) {
      onChangeValue(id, {
        value: '',
        checked: false,
      });
    }
  };
  const { isFocused, ...focusProps } = useFocus(onBlurHandler, onFocusHandler);

  // when the option is pressed, call focus if current checked is false
  const onPressHandler = () => {
    if (inputRef.current && !checked) {
      inputRef.current.focus();
    } else {
      // toggle checked value when pressing
      onChangeValue(id, {
        value: textValue,
        checked: !checked,
      });
    }
  };

  // when text input is changed, return the text
  const onChangeTextHandler = (text: string) =>
    onChangeValue &&
    onChangeValue(id, {
      checked: true,
      value: text,
    });

  const rtl = i18n.dir() === 'rtl';

  const textInput = (
    <View
      style={[styles.textInputContainer, rtl && GlobalStyles.flexRowReverse]}
    >
      <Text
        style={[
          styles.otherText,
          { color: fontColor },
          checked ? styles.checkedOtherText : {},
          QuestionContentTextSize[dimensionWidthType],
        ]}
      >
        {i18n.t('survey:other-option')}
      </Text>
      <TextInput
        ref={inputRef}
        style={[
          styles.textInput,
          { color: fontColor },
          rtl && GlobalStyles.textAlignRight,
          isFocused
            ? {
                borderBottomColor: checkedColor,
              }
            : {},
          QuestionContentTextSize[dimensionWidthType],
        ]}
        placeholder={i18n.t('survey:other-placeholder')}
        placeholderTextColor={Colors.inputPlaceholder}
        onChangeText={onChangeTextHandler}
        underlineColorAndroid={Colors.transparent}
        selectionColor={checkedColor}
        value={textValue}
        maxLength={50}
        {...focusProps}
      />
    </View>
  );

  return (
    <OptionWithHighlight
      {...props}
      onPress={onPressHandler}
      title={textInput}
      containerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  otherText: {
    fontWeight: 'normal',
    marginHorizontal: 12,
  },
  checkedOtherText: {
    fontWeight: '500',
  },
  textInput: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputPlaceholder,
    ...Platform.select({
      ios: {
        paddingVertical: 13,
      },
    }),
  },
  textInputContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default OtherOptionWithHighlightProps;
