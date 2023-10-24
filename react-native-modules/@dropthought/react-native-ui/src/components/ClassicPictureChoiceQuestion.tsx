import React from 'react';
import { View, StyleSheet } from 'react-native';
import GlobalStyle from '../styles';
import PictureChoiceItem from './PictureChoiceItem';
import PictureChoiceOtherItem from './PictureChoiceOtherItem';
import { usePictureChoice } from '../hooks/usePictureChoice';
import type { Question, Feedback, ImageFileProps } from '../data';
import ClassicMandatoryTitle from './ClassicMandatoryTitle';
import i18n from '../translation';

type Props = {
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  feedback?: Feedback;
  onUpload: (file: ImageFileProps) => Promise<string | undefined>;
  isUploading: boolean;
  forgot: boolean;
  themeColor: string;
};

const ClassicPictureChoiceQuestion = ({
  question,
  feedback,
  onFeedback,
  forgot,
  themeColor,
  onUpload,
  isUploading,
}: Props) => {
  const { otherText } = question;

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
    setInvalidMessage,
  } = usePictureChoice(question, onFeedback, feedback);

  const imageItems = images.map(({ uri, option }, index) => {
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
    return (
      <PictureChoiceItem
        title={option}
        uri={uri}
        isMultipleChoice={isMultipleChoice}
        selected={selected}
        columnGap={16}
        onPress={onPress}
        index={index}
        themeColor={themeColor}
        key={index.toString()}
      />
    );
  });

  const otherImageItem = otherPictureEnable ? (
    <PictureChoiceOtherItem
      otherPicture={otherPictureAnswer}
      isMultipleChoice={isMultipleChoice}
      selected={otherPictureSelected}
      placeholder={
        otherText.length > 0 ? otherText : i18n.t('survey:other-placeholder')
      }
      columnGap={16}
      onChooseImage={() => {
        if (!isMultipleChoice) {
          replaceSelectIndex([]);
        }
        setOtherPictureSelected(true);
      }}
      onSelect={() => {
        if (otherPictureSelected) {
          setInvalidMessage(undefined);
          resetOtherPicture();
        } else {
          if (!isMultipleChoice) {
            replaceSelectIndex([]);
          }
          setOtherPictureSelected(true);
        }
      }}
      onUpload={async (file) => {
        setInvalidMessage(undefined);
        const url = await onUpload(file);
        if (url) {
          setOtherPictureAnswerUrl(url);
        }
      }}
      onError={(msg) => {
        setInvalidMessage(msg);
      }}
      isUploading={isUploading}
      onChangeText={(text) => {
        setOtherPictureAnswerText(text);
      }}
      themeColor={themeColor}
    />
  ) : null;

  return (
    <View style={GlobalStyle.questionContainer}>
      <ClassicMandatoryTitle
        forgot={forgot}
        question={question}
        style={styles.mandatoryTitle}
        invalidMessage={invalidMessage}
      />
      <View style={styles.pictureGridContainer}>
        {imageItems}
        {otherImageItem}
      </View>
    </View>
  );
};

export default React.memo(ClassicPictureChoiceQuestion);

const styles = StyleSheet.create({
  mandatoryTitle: {
    marginBottom: 12,
  },
  pictureGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
