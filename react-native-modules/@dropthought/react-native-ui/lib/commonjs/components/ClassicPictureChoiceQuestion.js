"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireDefault(require("../styles"));
var _PictureChoiceItem = _interopRequireDefault(require("./PictureChoiceItem"));
var _PictureChoiceOtherItem = _interopRequireDefault(require("./PictureChoiceOtherItem"));
var _usePictureChoice = require("../hooks/usePictureChoice");
var _ClassicMandatoryTitle = _interopRequireDefault(require("./ClassicMandatoryTitle"));
var _translation = _interopRequireDefault(require("../translation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore

const ClassicPictureChoiceQuestion = ({
  mandatoryErrorMessage,
  question,
  feedback,
  onFeedback,
  forgot,
  themeColor,
  onUpload,
  preview
}) => {
  const {
    otherText = ''
  } = question;
  const {
    images,
    otherPictureEnable,
    otherPictureAnswer,
    setOtherPictureAnswerText,
    setOtherPictureAnswerUrl,
    otherPictureSelected,
    setOtherPictureSelected,
    selectIndex,
    onSelectIndex,
    replaceSelectIndex,
    isMultipleChoice,
    resetOtherPicture,
    invalidMessage,
    setInvalidMessage
  } = (0, _usePictureChoice.usePictureChoice)(question, onFeedback, feedback);
  const rtl = _translation.default.dir() === 'rtl';
  const imageItems = images.map(({
    uri,
    option
  }, index) => {
    const selected = selectIndex.includes(index);
    const onPress = () => {
      setInvalidMessage(undefined);
      if (isMultipleChoice) {
        onSelectIndex(index);
      } else {
        replaceSelectIndex([index]);
        resetOtherPicture();
      }
    };
    return /*#__PURE__*/_react.default.createElement(_PictureChoiceItem.default, {
      title: option,
      uri: uri,
      isMultipleChoice: isMultipleChoice,
      selected: selected,
      columnGap: 16,
      onPress: onPress,
      index: index,
      themeColor: themeColor,
      key: index.toString()
    });
  });
  const otherImageItem = otherPictureEnable ? /*#__PURE__*/_react.default.createElement(_PictureChoiceOtherItem.default, {
    otherPicture: otherPictureAnswer,
    isMultipleChoice: isMultipleChoice,
    selected: otherPictureSelected,
    placeholder: otherText.length > 0 ? otherText : _translation.default.t('survey:other-placeholder'),
    columnGap: 16,
    onChooseImage: () => {
      if (!isMultipleChoice) {
        replaceSelectIndex([]);
      }
      setOtherPictureSelected(true);
    },
    onSelect: () => {
      if (otherPictureSelected) {
        setInvalidMessage(undefined);
        resetOtherPicture();
      } else {
        if (!isMultipleChoice) {
          replaceSelectIndex([]);
        }
        setOtherPictureSelected(true);
      }
    },
    onUpload: async file => {
      setInvalidMessage(undefined);
      const url = await onUpload(file, 'pictureChoice');
      if (typeof url !== 'string') {
        setInvalidMessage(`${_translation.default.t('picture-choice:uploadFailed')}`);
      } else if (url) {
        setOtherPictureAnswerUrl(url);
      }
    },
    onError: msg => {
      setInvalidMessage(msg);
    },
    onChangeText: text => {
      setOtherPictureAnswerText(text);
    },
    themeColor: themeColor,
    preview: preview
  }) : null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.default.questionContainer
  }, /*#__PURE__*/_react.default.createElement(_ClassicMandatoryTitle.default, {
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.mandatoryTitle,
    invalidMessage: invalidMessage
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.pictureGridContainer, rtl && _styles.default.flexRowReverse]
  }, imageItems, otherImageItem));
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(ClassicPictureChoiceQuestion);
const styles = _reactNative.StyleSheet.create({
  mandatoryTitle: {
    marginBottom: 12
  },
  pictureGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
//# sourceMappingURL=ClassicPictureChoiceQuestion.js.map