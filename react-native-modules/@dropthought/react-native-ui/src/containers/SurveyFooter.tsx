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
//@ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

  const insets = useSafeAreaInsets();
  const { keyboardShown } = useKeyboard();

  const insetsBottom =
    // if it is android, and the insets bottom is not normal,
    // maybe it is because the keyboard is showed, don't use this insets
    isAndroid && insets.bottom >= 100 ? 0 : insets.bottom;

  const containerStyle = [
    styles.container,
    rtl && GlobalStyle.flexRowReverse,
    {
      backgroundColor,
      paddingBottom: insetsBottom || 15,
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

  const submitButtonStyle = [
    styles.centerButtonContainer,
    { backgroundColor: surveyColor },
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

  const submitButton = (
    <TouchableOpacity
      style={submitButtonStyle}
      disabled={submitDisabled}
      onPress={() => {
        setSubmitDisabled(true);
        setTimeout(() => setSubmitDisabled(false), 1000);
        onNextPage();
      }}
    >
      <Text style={styles.submitText}>{submitSurvey}</Text>
    </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'center',
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
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    top: 14,
  },
  submitText: {
    color: Colors.white,
    fontSize: 17,
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
