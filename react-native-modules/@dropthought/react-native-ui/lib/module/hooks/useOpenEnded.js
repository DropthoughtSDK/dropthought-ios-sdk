import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { QuestionMetaDataType } from '../utils/data';

const useOpenEnded = (feedback, index = 0) => {
  var _feedback$answers;

  //@ts-ignore
  const feedbackText = feedback ? (_feedback$answers = feedback.answers) === null || _feedback$answers === void 0 ? void 0 : _feedback$answers[index].toString() : '';
  const [text, setText] = useState(feedbackText);
  const [isFocus, setIsFocus] = useState(false);
  const [hasEdited, setHasEdited] = useState(feedbackText.length > 0);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onEndEditingHandler);
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const onEndEditingHandler = () => {
    setHasEdited(true);
  };

  const onChangeTextHandler = textInput => {
    if (isFocus) {
      setText(textInput);
    }
  };

  const metadataTypeKeyboard = metadataType => {
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

  const metadataTypeAutoCapitalize = metadataType => {
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
    onBlur: () => setIsFocus(false)
  };
};

export default useOpenEnded;
//# sourceMappingURL=useOpenEnded.js.map