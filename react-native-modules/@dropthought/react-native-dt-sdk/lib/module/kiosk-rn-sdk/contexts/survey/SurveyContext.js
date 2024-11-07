/**
 * @description
 * survey context expose two data: survey and changeLanguage function
 * it only renders children when survey is available,
 * therefore, the children would always be sure to have "survey" in context
 */
import * as React from 'react';
import { View, ActivityIndicator, Image, Alert } from 'react-native';
import { evolve, merge, isNil } from 'ramda';
import { useAsync } from 'react-async';
import { i18n, ActivityIndicatorMask, GlobalStyle, PlaceholderScreen, PlaceholderImageTypes, THEME_OPTION, ThemeProvider } from '@dropthought/react-native-ui';
import ErrorHintScreen from '../../screens/ErrorHintScreen';
import { saveCache, loadCache } from '../../../lib/Storage';
import { apiGetProgramById, apiGetProgramTokenById, apiGetVisibilityById, sdkFetcher } from '../../../lib/API';
import { isRequestTimeoutError, isNoInternetError } from '../../../lib/Fetcher';
const DT_ERR_MISSING_PARAMS = 'dt-missing-parameters';
const DT_ERR_NO_BIND_PROGRAM = 'dt-no-bind-program';

/** @type {React.Context<SurveyContextValue>} */
const SurveyContext = /*#__PURE__*/React.createContext({
  survey: undefined,
  changeLanguage: () => undefined
});
export const useSurveyContext = () => {
  return React.useContext(SurveyContext);
};
export const useSurvey = () => {
  const surveyContextValue = React.useContext(SurveyContext);
  return surveyContextValue.survey;
};

/**
 * load the visibility data from cache or api
 * @param {{visibilityId: string, language: string, timezone: string}} param0
 */
const getVisibility = async ({
  visibilityId,
  language,
  timezone
}) => {
  if (!visibilityId) {
    throw new Error(DT_ERR_MISSING_PARAMS);
  }

  /** @type {Visibility} */
  const visibility = await apiGetVisibilityById(visibilityId, {
    timeout: 10000
  });
  if (!visibility.program || !visibility.program.programId) {
    throw new Error(DT_ERR_NO_BIND_PROGRAM);
  }

  /** @type {ThemeData} */
  const theme = {
    themeOption: visibility.themeOption,
    appearance: visibility.appearance,
    fontColor: visibility.fontColor,
    backgroundColor: visibility.backgroundColor,
    autoClose: visibility.autoClose,
    autoCloseCountdown: visibility.autoCloseCountdown
  };
  return getProgram({
    surveyId: visibility.program.programId,
    language,
    timezone,
    theme
  });
};

/**
 * pre-fetch survey's image, get the width and height of the survey image
 * @param {Survey} survey
 * @return {Promise<Survey>}
 */
const preFetchImage = survey => new Promise(resolve => {
  const {
    image: uri,
    width,
    height
  } = (survey === null || survey === void 0 ? void 0 : survey.surveyProperty) || {};
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
  Image.getSize(uri, (w, h) => {
    // resolve the updated survey with surveyProperty merge with {width, height}
    resolve(evolve({
      surveyProperty: merge({
        width: w,
        height: h
      })
    })(survey));
  }, () => {
    resolve(survey);
  });
});

/**
 * load the program data from cache or api
 * @param {{surveyId: string, language: string, timezone?: string, theme?: ThemeData }} param0
 */
const getProgram = async ({
  surveyId,
  language,
  timezone,
  theme
}) => {
  const programCacheKey = `survey-${surveyId}-${language}`;
  if (!surveyId) {
    throw new Error(DT_ERR_MISSING_PARAMS);
  }

  /** @type {Survey} */
  let survey = await loadCache(programCacheKey);
  if (!survey) {
    survey = await apiGetProgramById({
      programId: surveyId,
      language,
      timezone
    }, {
      timeout: 10000
    });
    const token = await apiGetProgramTokenById({
      programId: surveyId
    });
    survey.token = token;
  }
  // pre-fetch image
  survey = await preFetchImage(survey);

  // only save to cache when state is active
  if (survey.state === 'active') {
    await saveCache(programCacheKey, survey);
  }

  // change the i18n language
  i18n.changeLanguage(survey.language);
  return {
    survey,
    theme
  };
};

/**
 * extract questions in page and make them as its' independent page
 * @param {Survey} survey
 */
const singleQuestionPerPageTransformer = survey => {
  /** @type {Survey} */
  let result = {};
  if (survey) {
    const newPageOrder = [];
    const newPages = [];
    const {
      pages
    } = survey;
    pages.map(page => {
      const {
        pageId,
        questions
      } = page;
      questions.forEach((question, index) => {
        const newPageId = `${pageId}_${index}`;
        newPageOrder.push(newPageId);
        const newPage = {
          ...page,
          pageId: newPageId,
          questions: [question]
        };
        newPages.push(newPage);
      });
    });
    result = {
      ...survey,
      pageOrder: newPageOrder,
      pages: newPages
    };
  }
  return result;
};

// we want to "remember" the previous selected language
// so that, later when there's error, we could fallback to the previous selected language
const useSelectedLanguageState = defaultLanguage => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(defaultLanguage);
  const prevSelectedLanguage = React.useRef();

  // backup the previous selected language
  const setSelectedLanguageWithBackup = React.useCallback(languageToSet => {
    prevSelectedLanguage.current = selectedLanguage;
    setSelectedLanguage(languageToSet);
  }, [selectedLanguage]);
  return [selectedLanguage, prevSelectedLanguage.current, setSelectedLanguageWithBackup, setSelectedLanguage];
};
const showAlert = () => {
  const title = 'Unable to fetch data';
  const message = 'Please check if you are connected to the internet';
  // @TODO: SurveyNativeBridge
  Alert.alert(title, message, [{
    text: 'OK'
  }]);
};
const defaultOnCloseHandler = () => {
  console.log('please provide your own onClose function when using SDKEntry');
};

/**
 * @param {SDKEntryProps} param0
 */
export const SurveyContextProvider = ({
  baseURL,
  apiKey,
  visibilityId,
  surveyId,
  children,
  defaultLanguage = 'en',
  onClose = defaultOnCloseHandler,
  themeOption,
  appearance,
  fontColor,
  backgroundColor,
  timezone,
  autoClose,
  autoCloseCountdown
}) => {
  if (baseURL || apiKey) {
    sdkFetcher.init({
      baseURL,
      apiKey
    });
  }
  const themeDataFromSDKEntry = {
    themeOption,
    appearance,
    fontColor,
    backgroundColor,
    autoClose,
    autoCloseCountdown
  };
  const [selectedLanguage, prevSelectedLanguage, setSelectedLanguageWithBackup, setSelectedLanguage] = useSelectedLanguageState(defaultLanguage);

  // handler the rejection when switching language
  const onRejectHandler = React.useCallback(() => {
    if (!isNil(prevSelectedLanguage) && prevSelectedLanguage !== selectedLanguage) {
      // fallback to previous language directly
      setSelectedLanguage(prevSelectedLanguage);
      showAlert();
    }
  }, [selectedLanguage, prevSelectedLanguage, setSelectedLanguage]);
  const {
    data,
    error,
    isPending
  } = useAsync({
    promiseFn: visibilityId ? getVisibility : getProgram,
    onReject: onRejectHandler,
    visibilityId,
    surveyId,
    language: selectedLanguage,
    timezone,
    // watch, only re-run the promise, when language is changed or visibilityId is changed
    watchFn: (props, prevProps) => props.visibilityId !== prevProps.visibilityId || props.language !== prevProps.language && props.language !== prevSelectedLanguage || props.surveyId !== prevProps.surveyId
  });
  const {
    survey,
    theme = themeDataFromSDKEntry
  } = data ?? {};
  const hexCode = (survey === null || survey === void 0 ? void 0 : survey.surveyProperty.hexCode) ?? '';
  const transformedTheme = {
    ...theme,
    autoClose: theme.autoClose ?? autoClose,
    autoCloseCountdown: theme.autoCloseCountdown ?? autoCloseCountdown,
    appearance: appearance ?? theme.appearance,
    // use input appearance first, then use appearance from visibility
    hexCode
  };

  /** @type {SurveyContextValue} */
  const contextValue = React.useMemo(() => ({
    onClose,
    survey: theme.themeOption === THEME_OPTION.CLASSIC || theme.themeOption === THEME_OPTION.BIJLIRIDE ? survey : singleQuestionPerPageTransformer(survey),
    changeLanguage: setSelectedLanguageWithBackup
  }), [onClose, theme.themeOption, survey, setSelectedLanguageWithBackup]);

  // initial loading data view
  if (!data) {
    // loading
    let content = /*#__PURE__*/React.createElement(View, {
      style: GlobalStyle.fullCenter
    }, /*#__PURE__*/React.createElement(ActivityIndicator, {
      size: "large"
    }));
    if (error) {
      let placeholderProps = {
        imageType: PlaceholderImageTypes.ProgramUnavailable,
        message: 'Sorry for the inconvenience.\nPlease come back and check later on.'
      };
      if (isRequestTimeoutError(error) || isNoInternetError(error)) {
        placeholderProps = {
          imageType: PlaceholderImageTypes.NoInternet,
          message: 'Please check if you are connected to the internet'
        };
      }
      content = /*#__PURE__*/React.createElement(PlaceholderScreen, placeholderProps);
    }
    return /*#__PURE__*/React.createElement(ErrorHintScreen, {
      onClose: onClose,
      hideCloseButton: !error
    }, content);
  }
  return /*#__PURE__*/React.createElement(SurveyContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(ThemeProvider, transformedTheme, /*#__PURE__*/React.createElement(View, {
    style: GlobalStyle.flex1
  }, children, /*#__PURE__*/React.createElement(ActivityIndicatorMask, {
    loading: isPending
  }))));
};

/**
 * @typedef {object} SurveyContextValue
 * @property {Survey} survey
 * @property {(language: string) => void} changeLanguage
 * @property {() => void} onClose
 */
/** @typedef {import('@dropthought/react-native-ui').Survey} Survey */
/** @typedef {import('../../../data').Visibility} Visibility */
/** @typedef {import('../../../data').ThemeData} ThemeData */
/** @typedef {import('../../SDKEntry').SDKEntryProps} SDKEntryProps */
//# sourceMappingURL=SurveyContext.js.map