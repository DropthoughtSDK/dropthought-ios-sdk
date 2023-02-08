import React from 'react';
import { useBackHandler } from '@react-native-community/hooks';
import { EndScreenLayout } from '@dropthought/react-native-ui';
import { useSurvey, useSurveyContext } from '../contexts/survey';
import {
  useOnSubmitSuccessCallback,
  useOnSubmitCallback,
} from '../contexts/custom-props';

const useBackForDismiss = () => {
  const { onClose } = useSurveyContext();
  const backHandler = React.useCallback(() => {
    onClose();
    return true;
  }, [onClose]);

  useBackHandler(backHandler);
};

/**
 * @type {React.FunctionComponent<ScreenProps>}
 * @param {ScreenProps} props
 */
const EndScreen = ({ error, surveyFeedback, onClose }) => {
  const survey = useSurvey();
  const onSubmitSuccessCallback = useOnSubmitSuccessCallback();
  const onSubmitCallback = useOnSubmitCallback();

  React.useEffect(() => {
    // passing data to native, if error is undefined, null, 0, it means success
    if (onSubmitCallback) {
      onSubmitCallback(surveyFeedback, error);
      // deprecate later
      if (!error && onSubmitSuccessCallback) {
        onSubmitSuccessCallback(surveyFeedback);
      }
    }
    // if (surveyFeedback)
    //     SurveyNativeBridge.onFeedbackResult(surveyFeedback, error || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBackForDismiss();
  return <EndScreenLayout survey={survey} onClose={onClose} />;
};

export default EndScreen;

/**
 * @typedef {import('../../data').SurveyFeedback} SurveyFeedback
 */

/**
 * @typedef {Object} ScreenProps
 * @property {Error=} error
 * @property {SurveyFeedback=} surveyFeedback
 * @property {() => void} onClose
 */
