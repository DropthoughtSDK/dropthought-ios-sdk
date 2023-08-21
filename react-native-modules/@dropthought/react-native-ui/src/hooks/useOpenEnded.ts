import { useState, useEffect } from 'react';
import { Keyboard, KeyboardTypeOptions } from 'react-native';
import { QuestionMetaDataType } from '../utils/data';
import type {
  Feedback,
  QuestionMetaDataType as TypeQuestionMetaDataType,
} from '../data';

const useOpenEnded = (feedback: Feedback, index: number = 0) => {
  //@ts-ignore
  const feedbackText = feedback ? feedback.answers?.[index].toString() : '';
  const [text, setText] = useState(feedbackText);
  const [isFocus, setIsFocus] = useState(false);
  const [hasEdited, setHasEdited] = useState(feedbackText.length > 0);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onEndEditingHandler
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const onEndEditingHandler = () => {
    setHasEdited(true);
  };

  const onChangeTextHandler = (textInput: string) => {
    if (isFocus) {
      setText(textInput);
    }
  };

  const metadataTypeKeyboard = (
    metadataType: TypeQuestionMetaDataType | undefined
  ): KeyboardTypeOptions | undefined => {
    switch (metadataType) {
      case QuestionMetaDataType.Email:
        return 'default';
      case QuestionMetaDataType.Phone:
        return 'phone-pad';
      case QuestionMetaDataType.Number:
        return 'numeric';
      case QuestionMetaDataType.Date:
      default:
        return 'default';
    }
  };

  const metadataTypeAutoCapitalize = (
    metadataType: TypeQuestionMetaDataType | undefined
  ) => {
    switch (metadataType) {
      case QuestionMetaDataType.Name:
        return 'words';
      case QuestionMetaDataType.Email:
      case QuestionMetaDataType.Phone:
      case QuestionMetaDataType.Date:
      case QuestionMetaDataType.Number:
        return 'none';
      default:
        return 'sentences';
    }
  };
  return {
    metadataTypeKeyboard,
    metadataTypeAutoCapitalize,

    text,
    isFocus,
    hasEdited,

    onChangeTextHandler,
    onEndEditingHandler,
    onFocus: () => setIsFocus(true),
    onBlur: () => setIsFocus(false),
  };
};

export default useOpenEnded;
