/**
 * @description
 * survey context expose two data: survey and changeLanguage function
 * it only renders children when survey is available,
 * therefore, the children would always be sure to have "survey" in context
 */
import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  Alert,
  NativeModules,
} from 'react-native';

import { evolve, merge, isNil } from 'ramda';
import { useAsync } from 'react-async';
import {
  i18n,
  ActivityIndicatorMask,
  GlobalStyle,
  PlaceholderScreen,
  PlaceholderImageTypes,
} from '@dropthought/react-native-ui';

import FakeScreen from '../../screens/FakeScreen';
import { saveCache, loadCache } from '../../../lib/Storage';
import { apiGetProgramById } from '../../../lib/API';
import { isRequestTimeoutError, isNoInternetError } from '../../../lib/Fetcher';

const DT_ERR_MISSING_PARAMS = 'dt-missing-parameters';

/**
 * @typedef {object} SurveyContextValue
 * @property {Survey} survey
 * @property {(language: string) => void} changeLanguage
 * @property {() => void} onClose
 */
/** @typedef {import('../../../data').Survey} Survey */

/** @type {React.Context<SurveyContextValue>} */
const SurveyContext = React.createContext({
  survey: undefined,
  changeLanguage: () => undefined,
});

export const useSurveyContext = () => {
  return React.useContext(SurveyContext);
};

export const useSurvey = () => {
  const surveyContextValue = React.useContext(SurveyContext);
  return surveyContextValue.survey;
};

/**
 * pre-fetch survey's image, get the width and height of the survey image
 * @param {Survey} survey
 * @return {Promise<Survey>}
 */
const preFetchImage = (survey) =>
  new Promise((resolve) => {
    const { image: uri, width, height } = survey?.surveyProperty || {};
    if (!uri || typeof uri !== 'string') {
      resolve(survey);
      return;
    }

    // pre-fetch the uri if it is not base64
    const base64Reg = /^data:image\/.+;base64/;
    if (!uri.match(base64Reg)) {
      Image.prefetch(uri);
    }

    // if height and width already existed
    if (width && height) {
      resolve(survey);
      return;
    }

    // get image's width and height
    Image.getSize(
      uri,
      (w, h) => {
        // resolve the updated survey with surveyProperty merge with {width, height}
        resolve(
          evolve({
            surveyProperty: merge({
              width: w,
              height: h,
            }),
          })(survey)
        );
      },
      () => {
        resolve(survey);
      }
    );
  });

/**
 * load the program data from cache or api
 * @param {{surveyId: string, language: string}} param0
 */
const getProgram = async ({ surveyId, language }) => {
  const programCacheKey = `survey-${surveyId}-${language}`;
  if (!surveyId) {
    throw new Error(DT_ERR_MISSING_PARAMS);
  }

  const { timeZone } = NativeModules.DtSdk.getConstants();

  /** @type {Survey} */
  let survey = await loadCache(programCacheKey);
  if (!survey) {
    survey = await apiGetProgramById(
      {
        programId: surveyId,
        language,
        timezone: timeZone,
      },
      {
        timeout: 10000,
      }
    );
  }
  // pre-fetch image
  survey = await preFetchImage(survey);

  // only save to cache when state is active
  if (survey.state === 'active') {
    await saveCache(programCacheKey, survey);
  }

  // change the i18n language
  i18n.changeLanguage(survey.language);

  return survey;
};

// we want to "remember" the previous selected language
// so that, later when there's error, we could fallback to the previous selected language
const useSelectedLanguageState = (defaultLanguage) => {
  const [selectedLanguage, setSelectedLanguage] =
    React.useState(defaultLanguage);
  const prevSelectedLanguage = React.useRef();

  // backup the previous selected language
  const setSelectedLanguageWithBackup = React.useCallback(
    (languageToSet) => {
      prevSelectedLanguage.current = selectedLanguage;
      setSelectedLanguage(languageToSet);
    },
    [selectedLanguage]
  );
  return [
    selectedLanguage,
    prevSelectedLanguage.current,
    setSelectedLanguageWithBackup,
    setSelectedLanguage,
  ];
};

const showAlert = () => {
  const title = 'Unable to fetch data';
  const message = 'Please check if you are connected to the internet';
  // @TODO: SurveyNativeBridge
  Alert.alert(title, message, [
    {
      text: 'OK',
    },
  ]);
};

const defaultOnCloseHandler = () => {
  console.log('please provide your own onClose function when using SDKEntry');
};

/**
 * @param {Props} param0
 */
export const SurveyContextProvider = ({
  surveyId,
  children,
  defaultLanguage = 'en',
  onClose = defaultOnCloseHandler,
}) => {
  const [
    selectedLanguage,
    prevSelectedLanguage,
    setSelectedLanguageWithBackup,
    setSelectedLanguage,
  ] = useSelectedLanguageState(defaultLanguage);

  // handler the rejection when switching language
  const onRejectHandler = React.useCallback(() => {
    if (
      !isNil(prevSelectedLanguage) &&
      prevSelectedLanguage !== selectedLanguage
    ) {
      // fallback to previous language directly
      setSelectedLanguage(prevSelectedLanguage);
      showAlert();
    }
  }, [selectedLanguage, prevSelectedLanguage, setSelectedLanguage]);

  const { data, error, isPending } = useAsync({
    promiseFn: getProgram,
    onReject: onRejectHandler,

    surveyId,
    language: selectedLanguage,

    // watch, only re-run the promise, when language is changed or surveyId is changed
    watchFn: (props, prevProps) =>
      (props.language !== prevProps.language &&
        props.language !== prevSelectedLanguage) ||
      props.surveyId !== prevProps.surveyId,
  });

  /** @type {SurveyContextValue} */
  const contextValue = React.useMemo(
    () => ({
      onClose,
      survey: data,
      changeLanguage: setSelectedLanguageWithBackup,
    }),
    [data, onClose, setSelectedLanguageWithBackup]
  );

  // initial loading data view
  if (!data) {
    // loading
    let content = (
      <View style={GlobalStyle.fullCenter}>
        <ActivityIndicator size="large" />
      </View>
    );
    if (error) {
      let placeholderProps = {
        imageType: PlaceholderImageTypes.ProgramUnavailable,
        message:
          'Sorry for the inconvenience.\nPlease come back and check later on.',
      };
      if (isRequestTimeoutError(error) || isNoInternetError(error)) {
        placeholderProps = {
          imageType: PlaceholderImageTypes.NoInternet,
          message: 'Please check if you are connected to the internet',
        };
      }
      content = <PlaceholderScreen {...placeholderProps} />;
    }
    return <FakeScreen onClose={onClose}>{content}</FakeScreen>;
  }

  return (
    <SurveyContext.Provider value={contextValue}>
      <View style={GlobalStyle.flex1}>
        {children}
        <ActivityIndicatorMask loading={isPending} />
      </View>
    </SurveyContext.Provider>
  );
};

/** @typedef {import('../../SDKEntry').SDKEntryProps} Props */
