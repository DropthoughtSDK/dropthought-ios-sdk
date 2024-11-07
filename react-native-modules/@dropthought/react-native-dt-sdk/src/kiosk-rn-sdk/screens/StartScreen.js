import React from 'react';
import {
  StartScreenLayout,
  PlaceholderImageTypes,
  PlaceholderScreen,
  i18n,
} from '@dropthought/react-native-ui';
import ErrorHintScreen from './ErrorHintScreen';
import { useSurveyContext } from '../contexts/survey/SurveyContext';
import { fromAPIDateStrToJS } from '../../lib/DateTimerParser';

/**
 *
 * @param {import('../../data').ProgramStateType} surveyState
 * @param {Date} surveyStartDate
 * @param {Date} surveyEndDate
 */
const checkSurveyStatus = (surveyState, surveyStartDate, surveyEndDate) => {
  let imageType;
  switch (surveyState) {
    case 'active':
      imageType = null;
      break;
    case 'expired':
      imageType = PlaceholderImageTypes.ProgramExpired;
      break;
    case 'scheduled':
      imageType = PlaceholderImageTypes.ProgramScheduled;
      break;
    case 'inactive':
      imageType = PlaceholderImageTypes.ProgramDeactivated;
      break;
    case 'drafts':
    default:
      imageType = PlaceholderImageTypes.ProgramUnavailable;
  }
  // still need to check the start-end time
  if (!imageType) {
    const now = new Date();
    if (now < surveyStartDate) {
      imageType = PlaceholderImageTypes.ProgramScheduled;
    } else if (now > surveyEndDate) {
      imageType = PlaceholderImageTypes.ProgramExpired;
    }
  }
  return imageType;
};

/**
 * @type {React.FunctionComponent<ScreenProps>}
 * @param {ScreenProps} props
 */
const StartScreen = (props) => {
  const { onStart, onClose } = props;
  const { survey, changeLanguage } = useSurveyContext();
  const {
    state: surveyState,
    surveyEndDate: surveyEndDateStr,
    surveyStartDate: surveyStartDateStr,
  } = survey;
  const surveyStartDate = fromAPIDateStrToJS(surveyStartDateStr);
  const surveyEndDate = fromAPIDateStrToJS(surveyEndDateStr);

  const onLanguageSelectHandler = React.useCallback(
    (language) => {
      changeLanguage(language);
    },
    [changeLanguage]
  );

  // render placeholder
  const imageType = checkSurveyStatus(
    surveyState,
    surveyStartDate,
    surveyEndDate
  );
  if (imageType) {
    // need to render placeholder
    return (
      <ErrorHintScreen onClose={onClose}>
        <PlaceholderScreen
          imageType={imageType}
          message={i18n.t('start-survey:placeholder-message')}
        />
      </ErrorHintScreen>
    );
  }

  return (
    <StartScreenLayout
      survey={survey}
      onClose={onClose}
      onStart={onStart}
      onLanguageSelect={onLanguageSelectHandler}
    />
  );
};

export default StartScreen;

/**
 * @typedef {Object} ScreenProps
 * @property {() => void} onStart
 * @property {() => void} onClose
 */
