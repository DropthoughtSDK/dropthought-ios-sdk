import React from 'react';
import { View, StyleSheet } from 'react-native';
import GlobalStyle from '../styles';
import PictureChoiceItem from './PictureChoiceItem';
import PictureChoiceOtherItem from './PictureChoiceOtherItem';
import { usePictureChoice } from '../hooks/usePictureChoice';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import i18n from '../translation';

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
  } = usePictureChoice(question, onFeedback, feedback);
  const rtl = i18n.dir() === 'rtl';
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

    return /*#__PURE__*/React.createElement(PictureChoiceItem, {
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
  const otherImageItem = otherPictureEnable ? /*#__PURE__*/React.createElement(PictureChoiceOtherItem, {
    otherPicture: otherPictureAnswer,
    isMultipleChoice: isMultipleChoice,
    selected: otherPictureSelected,
    placeholder: otherText.length > 0 ? otherText : i18n.t('survey:other-placeholder'),
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
      const url = await onUpload(file);

      if (typeof url !== 'string') {
        setInvalidMessage(`${i18n.t('picture-choice:uploadFailed')}`);
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
  return /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.questionContainer
  }, /*#__PURE__*/React.createElement(ClassicMandatoryTitle, {
    forgot: forgot,
    mandatoryErrorMessage: mandatoryErrorMessage,
    question: question,
    style: styles.mandatoryTitle,
    invalidMessage: invalidMessage
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.pictureGridContainer, rtl && GlobalStyle.flexRowReverse]
  }, imageItems, otherImageItem));
};

export default /*#__PURE__*/React.memo(ClassicPictureChoiceQuestion);
const styles = StyleSheet.create({
  mandatoryTitle: {
    marginBottom: 12
  },
  pictureGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
//# sourceMappingURL=ClassicPictureChoiceQuestion.js.map