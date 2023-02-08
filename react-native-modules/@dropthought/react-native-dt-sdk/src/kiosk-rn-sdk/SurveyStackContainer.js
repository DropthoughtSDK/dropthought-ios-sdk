import * as React from 'react';
import { StatusBar } from 'react-native';
import { useTheme, COLOR_SCHEMES } from '@dropthought/react-native-ui';
import { useSurvey } from './contexts/survey';
import SurveyStackNavigator from './navigation/SurveyStack';

/**
 * @param {{preview: boolean}} param0
 */
const SurveyStackContainer = ({ preview = false }) => {
  const { colorScheme } = useTheme();
  const survey = useSurvey();
  const themeColor = survey.surveyProperty.hexCode;

  return (
    <>
      <StatusBar
        backgroundColor={themeColor}
        barStyle={
          colorScheme === COLOR_SCHEMES.dark ? 'light-content' : 'dark-content'
        }
      />
      <SurveyStackNavigator preview={preview} />
    </>
  );
};

export default SurveyStackContainer;
