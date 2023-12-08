/**
 * @description Option with a TextInput, this is for other option in multi-choice/single-choice question
 */
import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
  Keyboard,
} from 'react-native';

import GlobalStyles, { Colors, QuestionContentTextSize } from '../styles';
import i18n from '../translation';
import OptionWithHighlight, {
  Props as OptionWithHighlightProps,
} from './OptionWithHighlight';
import { useDimensionWidthType } from '../hooks/useWindowDimensions';
import { useTheme } from '../contexts/theme';
import type { Question } from '../data';

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
  question: Question;
};

function OtherOptionWithHighlightProps(props: Props) {
  const { id, checked, textValue, onChangeValue, checkedColor, question } =
    props;
  const { otherText = '', otherTextLabel, questionBrand = '' } = question;
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

  React.useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      inputRef.current?.blur();
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const inputStyle = [
    styles.textInput,
    {
      color: fontColor,
      minHeight: i18n.language === 'te' ? 50 : undefined,
      ...Platform.select({
        ios: {
          paddingVertical: i18n.language === 'te' ? undefined : 13,
        },
      }),
    },
    rtl && GlobalStyles.textAlignRight,
    isFocused
      ? {
          borderBottomColor: checkedColor,
        }
      : {},
    QuestionContentTextSize[dimensionWidthType],
  ];

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
        {otherTextLabel}
      </Text>
      <TextInput
        ref={inputRef}
        style={inputStyle}
        placeholder={
          otherText.length > 0
            ? otherText
            : questionBrand.length > 0
            ? questionBrand
            : otherText
        }
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
  },
  textInputContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default OtherOptionWithHighlightProps;
