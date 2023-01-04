import * as React from 'react';
import type { TextInput } from 'react-native';
import NewOptionWithHighlight from './NewOptionWithHighlight';
import type { Props as NewOptionWithHighlightProps } from './NewOptionWithHighlight';
import MultiLineTextInput from './MultiLineTextInput';
import type { Question, Feedback } from '../data';

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

type Props = NewOptionWithHighlightProps & {
  textValue: string | undefined;
  onChangeValue: (
    id: any,
    value: { checked: boolean; value: string | undefined }
  ) => void;
  feedback: Feedback;
  question: Question;
  anonymous: boolean;
};

function NewOtherOptionWithHighlight(props: Props) {
  const {
    id,
    checked,
    themeColor,
    textValue,
    onChangeValue,
    feedback,
    question,
    anonymous,
  } = props;

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
        checked: checked,
      });
    }
  };
  const { ...focusProps } = useFocus(onBlurHandler, onFocusHandler);

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

  return (
    <>
      <NewOptionWithHighlight
        {...props}
        onPress={onPressHandler}
        title={'Others'}
      />
      <MultiLineTextInput
        onEndEditingHandler={() => {}}
        onChangeTextHandler={onChangeTextHandler}
        themeColor={themeColor}
        feedback={feedback}
        question={question}
        inputRef={inputRef}
        checked={checked}
        anonymous={anonymous}
        {...focusProps}
      />
    </>
  );
}

export default React.memo(NewOtherOptionWithHighlight);
