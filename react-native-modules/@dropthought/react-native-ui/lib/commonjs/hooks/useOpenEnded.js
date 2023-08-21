"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactNative = require("react-native");

var _data = require("../utils/data");

const useOpenEnded = (feedback, index = 0) => {
  var _feedback$answers;

  //@ts-ignore
  const feedbackText = feedback ? (_feedback$answers = feedback.answers) === null || _feedback$answers === void 0 ? void 0 : _feedback$answers[index].toString() : '';
  const [text, setText] = (0, _react.useState)(feedbackText);
  const [isFocus, setIsFocus] = (0, _react.useState)(false);
  const [hasEdited, setHasEdited] = (0, _react.useState)(feedbackText.length > 0);
  (0, _react.useEffect)(() => {
    const keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', onEndEditingHandler);

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
      case _data.QuestionMetaDataType.Email:
        return 'default';

      case _data.QuestionMetaDataType.Phone:
        return 'phone-pad';

      case _data.QuestionMetaDataType.Number:
        return 'numeric';

      case _data.QuestionMetaDataType.Date:
      default:
        return 'default';
    }
  };

  const metadataTypeAutoCapitalize = metadataType => {
    switch (metadataType) {
      case _data.QuestionMetaDataType.Name:
        return 'words';

      case _data.QuestionMetaDataType.Email:
      case _data.QuestionMetaDataType.Phone:
      case _data.QuestionMetaDataType.Date:
      case _data.QuestionMetaDataType.Number:
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

var _default = useOpenEnded;
exports.default = _default;
//# sourceMappingURL=useOpenEnded.js.map