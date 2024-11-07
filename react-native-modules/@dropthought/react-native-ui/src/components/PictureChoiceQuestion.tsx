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
import type { Question, Feedback, Survey } from '../data';
import MandatoryTitle from './MandatoryTitle';
// @ts-ignore
import { KeyboardAvoidingScrollView } from './KeyboardAvoidingView';
import i18n from '../translation';
// @ts-ignore
import type { onUploadType } from '../dt-common';

const ScrollView =
  Platform.OS === 'ios' ? KeyboardAvoidingScrollView : RNScrollView;

type Props = {
  survey: Survey;
  question: Question;
  onFeedback: (feedback: Feedback) => void;
  onUpload: onUploadType;
  isUploading: boolean;
  feedback?: Feedback;
  forgot: boolean;
  themeColor: string;
  preview: boolean;
};

const PictureChoiceQuestion = ({
  survey,
  question,
  feedback,
  onFeedback,
  forgot,
  themeColor,
  onUpload,
  preview,
}: Props) => {
  const { otherText = '' } = question;

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
  const rtl = i18n.dir() === 'rtl';

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
        const url = await onUpload(file, 'pictureChoice');
        if (typeof url !== 'string') {
          setInvalidMessage(`${i18n.t('picture-choice:uploadFailed')}`);
        } else if (url) {
          setOtherPictureAnswerUrl(url);
        }
      }}
      onError={(msg) => {
        setInvalidMessage(msg);
      }}
      onChangeText={(text) => {
        setOtherPictureAnswerText(text);
      }}
      themeColor={themeColor}
      preview={preview}
    />
  ) : null;

  return (
    <ScrollView extraAvoidingSpace={30} style={styles.container}>
      <MandatoryTitle
        forgot={forgot}
        mandatoryErrorMessage={survey.mandatoryErrorMessage}
        question={question}
        style={styles.mandatoryTitle}
        invalidMessage={invalidMessage}
      />
      <View
        style={[styles.pictureGridContainer, rtl && GlobalStyle.flexRowReverse]}
      >
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
