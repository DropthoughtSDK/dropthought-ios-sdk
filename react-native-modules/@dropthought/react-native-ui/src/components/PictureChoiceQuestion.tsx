import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView as RNScrollView,
  Platform,
} from 'react-native';
import GlobalStyle from '../styles';
import PictureChoiceItem from './PictureChoiceItem';
import PictureChoiceOtherItem from './PictureChoiceOtherItem';
import { usePictureChoice } from '../hooks/usePictureChoice';
import type { Question, Feedback, ImageFileProps } from '../data';
import MandatoryTitle from './MandatoryTitle';
import { KeyboardAvoidingScrollView } from './KeyboardAvoidingView';
import i18n from '../translation';

const ScrollView =
  Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

type Props = {
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  onUpload: (file: ImageFileProps) => Promise<string | undefined>;
  isUploading: boolean;
  feedback?: Feedback;
  forgot: boolean;
  themeColor: string;
};

const PictureChoiceQuestion = ({
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
        columnGap={24}
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
      columnGap={24}
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
    <ScrollView extraAvoidingSpace={30} style={styles.container}>
      <MandatoryTitle
        forgot={forgot}
        question={question}
        style={styles.mandatoryTitle}
        invalidMessage={invalidMessage}
      />
      <View style={styles.pictureGridContainer}>
        {imageItems}
        {otherImageItem}
      </View>
    </ScrollView>
  );
};

export default React.memo(PictureChoiceQuestion);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    ...GlobalStyle.flex1,
  },
  mandatoryTitle: {
    marginBottom: 12,
  },
  pictureGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
