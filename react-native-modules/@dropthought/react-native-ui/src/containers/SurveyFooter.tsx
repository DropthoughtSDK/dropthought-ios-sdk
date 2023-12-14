/**
 * @description a extension UI/UX component of SurveyScreenLayout
 * it displays three buttons:
 *  - Back, displayed when page is > 0
 *  - Next, displayed when page is not end
 *  - Submit, displayed when page is the last page
 * When "Back" is pressed, call props.onPrevPage
 * When "Next" or "Submit" is pressed, call props.onNextPage
 */
import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { Colors, GlobalStyle } from '../styles';
import i18n from '../translation';
import { useTheme, COLOR_SCHEMES } from '../contexts/theme';

type Props = {
  submitSurvey: string;
  surveyColor: string;
  isFirstPage: boolean;
  isLastPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;

  // To apply backgroundColor for those smiley question which has full backgroundColor
  backgroundColor?: string;
};

const isAndroid = Platform.OS === 'android';

const SurveyFooter = (props: Props) => {
  const rtl = i18n.dir() === 'rtl';
  const {
    submitSurvey,
    surveyColor,
    isFirstPage,
    isLastPage,
    onPrevPage,
    onNextPage,
    backgroundColor,
  } = props;

  const { keyboardShown } = useKeyboard();

  const containerStyle = [
    styles.container,
    rtl && GlobalStyle.flexRowReverse,
    {
      backgroundColor,
    },
  ];
  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === COLOR_SCHEMES.dark;
  const iconStyle = [
    styles.icon,
    { tintColor: isDarkMode ? Colors.white : surveyColor },
  ];
  const iconBgStyle = [
    styles.iconBg,
    { tintColor: surveyColor, opacity: isDarkMode ? 1 : 0.1 },
  ];

  const [submitDisabled, setSubmitDisabled] = React.useState(false);

  const leftIcon = (
    <>
      <Image
        style={iconBgStyle}
        source={require('../assets/icPreviousButtonBg.png')}
      />
      <Image
        style={iconStyle}
        source={require('../assets/icPreviousButton.png')}
      />
    </>
  );

  const rightIcon = (
    <>
      <Image
        style={iconBgStyle}
        source={require('../assets/icNextButtonBg.png')}
      />
      <Image style={iconStyle} source={require('../assets/icNextButton.png')} />
    </>
  );

  const submitButtonStyle = [
    styles.centerButtonContainer,
    {
      backgroundColor: surveyColor,
      borderRadius: i18n.language === 'te' ? 25 : 20,
    },
  ];

  const textStyle = [
    styles.submitText,
    { lineHeight: i18n.language === 'te' ? 26 : undefined },
  ];

  const submitButton = (
    <View style={GlobalStyle.row}>
      <TouchableOpacity
        style={submitButtonStyle}
        disabled={submitDisabled}
        onPress={() => {
          setSubmitDisabled(true);
          setTimeout(() => setSubmitDisabled(false), 1000);
          onNextPage();
        }}
      >
        <Text style={textStyle}>{submitSurvey}</Text>
      </TouchableOpacity>
    </View>
  );

  const leftButton = (
    <TouchableOpacity style={styles.leftButtonContainer} onPress={onPrevPage}>
      {rtl ? rightIcon : leftIcon}
    </TouchableOpacity>
  );

  const rightButton = (
    <TouchableOpacity style={styles.rightButtonContainer} onPress={onNextPage}>
      {rtl ? leftIcon : rightIcon}
    </TouchableOpacity>
  );

  // hide this bar when it is android and keyboard is shown
  if (isAndroid && keyboardShown) return null;
  return (
    <View style={containerStyle}>
      {isFirstPage ? null : leftButton}
      {isLastPage ? submitButton : rightButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0,
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  centerButtonContainer: {
    minWidth: 100,
    borderRadius: 20,
    top: 14,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  submitText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    position: 'absolute',
    top: 21,
    left: 13,
  },
  iconBg: {
    opacity: 0.5,
  },
});

export default React.memo(SurveyFooter);
