import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyle } from '../styles';
import {
  DimensionWidthType,
  useDimensionWidthType,
} from '../hooks/useWindowDimensions';
import i18n from '../translation';
import { useTheme } from '../contexts/theme';
import type { Survey as OriginSurvey } from '../data';
// @ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Survey = OriginSurvey & {
  languages: ('en' | 'ar')[];
};

const defaultIconSource = require('../assets/rating.png');
const defaultIconSize = {
  [DimensionWidthType.phone]: 65,
  [DimensionWidthType.tablet]: 72,
};

const LANG_TITLE = {
  en: 'English',
  ar: 'العربي',
};

type Props = {
  onLanguageSelect: (language: string) => void;
  onClose: () => void;
  onStart: () => void;
  survey: Survey;
};

const StartScreen = ({ onLanguageSelect, onClose, onStart, survey }: Props) => {
  const rtl = i18n.dir() === 'rtl';
  const insets = useSafeAreaInsets();
  const dimensionWidthType = useDimensionWidthType();
  const { fontColor, backgroundColor } = useTheme();

  const { surveyProperty, surveyName, welcomeText } = survey;
  const {
    image,
    hexCode,
    width = defaultIconSize[dimensionWidthType],
    height = defaultIconSize[dimensionWidthType],
  } = surveyProperty;
  const iconStyle = {
    width,
    height,
  };
  const iconSource = image === undefined ? defaultIconSource : { uri: image };

  const iconView = (
    <Image resizeMode="cover" style={iconStyle} source={iconSource} />
  );

  const languagesView = () => {
    const { languages } = survey;

    // if there's only one language or no languages, no need to display
    if (!languages || !languages.length || languages.length <= 1) return null;

    const languageView = languages.map((language: 'en' | 'ar', index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onLanguageSelect && onLanguageSelect(language);
        }}
      >
        <Text
          style={[
            styles.language_label,
            {
              color:
                language !== survey.language
                  ? survey.surveyProperty.hexCode
                  : fontColor,
            },
          ]}
        >
          {LANG_TITLE[language]}
        </Text>
      </TouchableOpacity>
    ));
    return <View style={styles.languages}>{languageView}</View>;
  };
  const buttonStyle = [styles.button, { backgroundColor: hexCode }];

  const containerStyle = [
    styles.headerContainer,
    { paddingTop: insets.top },
    rtl && GlobalStyle.flexRowReverse,
    {
      backgroundColor,
    },
  ];
  const titleStyle = [styles.headerTitle, { color: fontColor }];
  const headerIconStyle = { tintColor: survey.surveyProperty.hexCode };
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={containerStyle}>
        <View style={styles.headerRowContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              style={headerIconStyle}
              source={require('../assets/icClose24Px.png')}
            />
          </TouchableOpacity>
          <Text style={titleStyle} numberOfLines={1}>
            {survey.surveyName}
          </Text>
        </View>
      </View>
      <View style={styles.main}>
        {iconView}
        <Text style={[styles.title, { color: fontColor }]}>{surveyName}</Text>
        {!!welcomeText && (
          <Text style={[styles.subtitle, { color: fontColor }]}>
            {welcomeText}
          </Text>
        )}
        <TouchableOpacity style={buttonStyle} onPress={onStart}>
          <Text style={styles.buttonTitle}>
            {i18n.t('start-survey:start-btn')}
          </Text>
        </TouchableOpacity>
      </View>
      {languagesView()}
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 24,
    opacity: 0.9,
    lineHeight: 27,
  },
  subtitle: {
    lineHeight: 23,
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.72,
  },
  button: {
    marginTop: 31,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'center',
  },
  language_label: {
    fontSize: 13,
    marginRight: 19,
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '12%',
    maxHeight: 90,
  },
  headerContainer: {
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 30,
    textAlign: 'center',
    flexGrow: 1,
  },
});
