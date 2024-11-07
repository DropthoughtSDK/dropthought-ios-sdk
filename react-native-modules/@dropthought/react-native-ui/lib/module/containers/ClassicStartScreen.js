import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../styles';
import { DimensionWidthType, useDimensionWidthType } from '../hooks/useWindowDimensions';
import Button from '../components/Button';
import HtmlText from '../components/HtmlText';
import { THEME_OPTION, useTheme } from '../contexts/theme';
import { getLanguageBy } from '../utils/LanguageUtils';
import { usePollingRecord } from '../hooks/usePollingRecord';
import { htmlTrim } from '../utils/htmlHelper';
const defaultIconSource = require('../assets/rating.png');
const defaultIconSize = {
  [DimensionWidthType.phone]: 65,
  [DimensionWidthType.tablet]: 72
};
const ClassicStartScreen = ({
  onLanguageSelect,
  onStart,
  survey
}) => {
  const dimensionWidthType = useDimensionWidthType();
  const {
    themeOption,
    hexCode,
    fontColor,
    backgroundColor
  } = useTheme();
  const isPhone = dimensionWidthType === DimensionWidthType.phone;
  const styles = isPhone ? phoneStyles : tabletStyles;
  const {
    surveyProperty,
    surveyName,
    welcomeText,
    welcomeTextPlain,
    language,
    takeSurvey
  } = survey;
  const {
    image
  } = surveyProperty;
  const [imageHeight, setImageHeight] = useState(65);
  const iconStyle = {
    width: '100%',
    height: imageHeight
  };
  useEffect(() => {
    Image.getSize(image, (_, height) => {
      if (height < defaultIconSize[dimensionWidthType]) {
        setImageHeight(height);
      }
    }, _ => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    resetRecord
  } = usePollingRecord();
  useEffect(() => {
    resetRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iconSource = image === undefined ? defaultIconSource : {
    uri: image
  };
  const iconView = /*#__PURE__*/React.createElement(Image, {
    resizeMode: "contain"
    // @ts-ignore
    ,
    style: iconStyle,
    source: iconSource
  });
  const buttonWidth = isPhone ? 143 : 160;
  const languagesView = () => {
    const {
      languages
    } = survey;

    // if there's only one language or no languages, no need to display
    if (!languages || !languages.length || languages.length <= 1) return null;
    const languageView = languages.map((lang, index) => /*#__PURE__*/React.createElement(TouchableOpacity, {
      key: index,
      onPress: () => {
        onLanguageSelect && onLanguageSelect(lang);
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.language_label, {
        color: lang !== language ? hexCode : fontColor
      }]
    }, getLanguageBy(lang))));
    return /*#__PURE__*/React.createElement(View, {
      style: styles.languages
    }, languageView);
  };
  const containerStyle = [shareStyles.container, {
    backgroundColor: themeOption === THEME_OPTION.BIJLIRIDE ? Colors.bijlirideBackgroundColor : backgroundColor
  }];
  return /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: containerStyle,
    scrollEnabled: false
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.main
  }, iconView, /*#__PURE__*/React.createElement(Text, {
    testID: "test:id/take_survey_name",
    style: [styles.title, {
      color: fontColor
    }]
  }, surveyName), !!welcomeTextPlain && welcomeText && /*#__PURE__*/React.createElement(View, {
    style: styles.subtitle
  }, /*#__PURE__*/React.createElement(HtmlText, {
    accessibilityLabel: `welcome_${welcomeText}`,
    html: htmlTrim(welcomeText),
    width: Dimensions.get('window').width - 76,
    maxHeight: Dimensions.get('window').height * 0.4
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.divider
  }), /*#__PURE__*/React.createElement(Button, {
    testID: "test:id/button_take_survey",
    width: buttonWidth,
    title: takeSurvey,
    color: hexCode,
    onPress: onStart,
    containerStyle: styles.takeSurveyButton
  })), languagesView());
};
export default ClassicStartScreen;
const shareStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  }
});
const phoneStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 22,
    opacity: 0.9,
    lineHeight: 27
  },
  subtitle: {
    marginTop: 17
  },
  divider: {
    backgroundColor: '#c3c3c3',
    height: 1,
    width: '100%',
    marginTop: 26
  },
  takeSurveyButton: {
    marginTop: 21
  },
  language_label: {
    fontSize: 13,
    paddingHorizontal: 8
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '12%',
    maxHeight: 90,
    flexWrap: 'wrap',
    marginHorizontal: 38
  }
});
const tabletStyles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 70,
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    lineHeight: 38,
    marginTop: 18,
    fontSize: 31,
    opacity: 0.9
  },
  subtitle: {
    marginTop: 17
  },
  divider: {
    backgroundColor: '#c3c3c3',
    height: 1,
    width: '100%',
    marginTop: 46
  },
  takeSurveyButton: {
    marginTop: 37
  },
  language_label: {
    fontSize: 13,
    paddingHorizontal: 8
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '10%',
    maxHeight: 80
  }
});
//# sourceMappingURL=ClassicStartScreen.js.map