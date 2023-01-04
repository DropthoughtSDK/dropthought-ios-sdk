import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyle, Colors } from '../styles';
import i18n from '../translation';
import type { Survey, Question } from '../data';
import ProgressBar from '../components/ProgressBar';
import { useTheme, THEME_OPTION } from '../contexts/theme';
// @ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  survey: Survey;
  pageIndex: number;
  question?: Question;
  // To apply backgroundColor for those smiley question which has full backgroundColor
  backgroundColor?: string;
  onClose: () => void;
};

const SurveyHeader = (props: Props) => {
  const rtl = i18n.dir() === 'rtl';
  const insets = useSafeAreaInsets();
  const { survey, pageIndex, backgroundColor, question, onClose } = props;

  const { fontColor, themeOption, customFontColor } = useTheme();

  let color = fontColor;
  const isOption6Smiley =
    themeOption === THEME_OPTION.OPTION6 &&
    question?.type === 'rating' &&
    question?.subType === 'smiley';
  if (
    (customFontColor === undefined || customFontColor === '') &&
    isOption6Smiley
  ) {
    color = Colors.white;
  }

  const containerStyle = [
    styles.container,
    { paddingTop: insets.top },
    rtl && GlobalStyle.flexRowReverse,
    {
      backgroundColor,
    },
  ];

  const iconStyle = { tintColor: survey.surveyProperty.hexCode };
  const titleStyle = [styles.title, { color }];

  return (
    <View style={containerStyle}>
      <View style={styles.headerRowContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            style={iconStyle}
            source={require('../assets/icClose24Px.png')}
          />
        </TouchableOpacity>
        <Text style={titleStyle} numberOfLines={1}>
          {survey.surveyName}
        </Text>
      </View>
      <ProgressBar
        value={pageIndex + 1}
        maxValue={survey.pageOrder.length}
        themeColor={survey.surveyProperty.hexCode}
        color={color}
        rtl={rtl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    marginTop: 17,
  },
  closeButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1,
  },
});

export default React.memo(SurveyHeader);
